const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const BASE = '/Users/felipeabello/Code/demand-curve';
const IMAGES_DIR = path.join(BASE, 'images');
const CONCURRENCY = 15;

fs.mkdirSync(IMAGES_DIR, { recursive: true });

// Step 1: Find all image URLs in all .md files
function findAllImages() {
  const urlToFiles = {}; // url -> [{ file, line }]
  const allUrls = new Set();

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory() && entry.name !== 'images' && entry.name !== '.claude' && entry.name !== 'node_modules') {
        walk(full);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const content = fs.readFileSync(full, 'utf8');
        const regex = /!\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
          const url = match[2];
          allUrls.add(url);
          if (!urlToFiles[url]) urlToFiles[url] = [];
          urlToFiles[url].push(full);
        }
      }
    }
  }

  walk(BASE);
  return { urls: [...allUrls], urlToFiles };
}

// Step 2: Generate a local filename from URL
function urlToFilename(url) {
  try {
    const u = new URL(url);
    const parts = u.pathname.split('/');
    let name = decodeURIComponent(parts[parts.length - 1]) || 'image';
    // Sanitize filename
    name = name.replace(/[^a-zA-Z0-9._-]/g, '_');
    // Ensure uniqueness by prefixing with a hash of the full URL
    const hash = require('crypto').createHash('md5').update(url).digest('hex').slice(0, 8);
    return `${hash}_${name}`;
  } catch {
    const hash = require('crypto').createHash('md5').update(url).digest('hex').slice(0, 8);
    return `${hash}_image`;
  }
}

// Step 3: Download a file
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    proto.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow redirect
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => { stream.close(); resolve(); });
      stream.on('error', reject);
    }).on('error', reject);
  });
}

// Step 4: Process with concurrency
async function processInBatches(items, fn, concurrency) {
  const results = [];
  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    const batchResults = await Promise.allSettled(batch.map(fn));
    results.push(...batchResults);
    if (i % 100 === 0 && i > 0) {
      process.stdout.write(`  ${i}/${items.length} downloaded...\n`);
    }
  }
  return results;
}

async function main() {
  console.log('Step 1: Finding all image URLs...');
  const { urls, urlToFiles } = findAllImages();
  console.log(`Found ${urls.length} unique image URLs`);

  // Build URL -> local filename mapping
  const urlMap = {};
  for (const url of urls) {
    urlMap[url] = urlToFilename(url);
  }

  console.log(`Step 2: Downloading ${urls.length} images...`);
  let downloaded = 0;
  let failed = 0;
  const failures = [];

  const results = await processInBatches(urls, async (url) => {
    const filename = urlMap[url];
    const dest = path.join(IMAGES_DIR, filename);

    if (fs.existsSync(dest)) {
      downloaded++;
      return;
    }

    try {
      await downloadFile(url, dest);
      downloaded++;
    } catch (e) {
      failed++;
      failures.push({ url, error: e.message });
    }
  }, CONCURRENCY);

  console.log(`Downloaded: ${downloaded}, Failed: ${failed}`);
  if (failures.length > 0) {
    console.log('Failures:', failures.slice(0, 10));
  }

  console.log('Step 3: Updating markdown files...');
  let filesUpdated = 0;
  let refsUpdated = 0;

  function updateFiles(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory() && entry.name !== 'images' && entry.name !== '.claude' && entry.name !== 'node_modules') {
        updateFiles(full);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        let content = fs.readFileSync(full, 'utf8');
        let changed = false;

        for (const [url, filename] of Object.entries(urlMap)) {
          const localPath = path.relative(path.dirname(full), path.join(IMAGES_DIR, filename));
          if (content.includes(url)) {
            content = content.split(url).join(localPath);
            changed = true;
            refsUpdated++;
          }
        }

        if (changed) {
          fs.writeFileSync(full, content, 'utf8');
          filesUpdated++;
        }
      }
    }
  }

  updateFiles(BASE);
  console.log(`Updated ${refsUpdated} references across ${filesUpdated} files`);
  console.log('Done!');
}

main().catch(console.error);
