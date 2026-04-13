# Hook Themes & Product Categories

Each theme maps to Open Food Facts categories, a video setting (background), and pregnancy-focused hook templates.

---

## Available Themes

### `snacks`
- **Categories**: snacks, sweet-snacks, salty-snacks, chips, crackers, cookies, granola-bars
- **Setting**: `pantry`
- **Negative hooks**: "snacks I thought were healthy for my baby but actually aren't", "my pregnancy snack stash had a problem", "stop snacking on these if you're pregnant"
- **Positive hooks**: "pregnancy-safe snacks that actually taste good", "my go-to pregnancy snacks that passed the scan test"

### `drinks`
- **Categories**: beverages, energy-drinks, sodas, iced-teas, juices, smoothies
- **Setting**: `fridge`
- **Negative hooks**: "drinks I stopped having once I scanned them during pregnancy", "your favorite drink might not be safe for baby"
- **Positive hooks**: "pregnancy-safe drinks that keep me hydrated", "drinks my midwife actually approved"

### `breakfast`
- **Categories**: breakfasts, cereals, yogurts, spreads, jams
- **Setting**: `kitchen`
- **Negative hooks**: "breakfast foods that aren't as safe during pregnancy as you think", "I scanned my entire breakfast routine and one item shocked me"
- **Positive hooks**: "my pregnancy-safe breakfast routine", "breakfast foods that are actually great for growing a baby"

### `dairy`
- **Categories**: dairies, cheeses, yogurts, ice-creams, milks
- **Setting**: `fridge`
- **Negative hooks**: "not all dairy is safe during pregnancy", "cheeses you should NEVER eat while pregnant"
- **Positive hooks**: "dairy products that are totally safe during pregnancy", "pregnant and craving ice cream? these ones are safe"

### `sauces`
- **Categories**: sauces, condiments, dressings, mayonnaises, mustards, ketchup
- **Setting**: `kitchen`
- **Negative hooks**: "condiments in your fridge that might not be safe during pregnancy", "that sauce you put on everything? scan it before your next meal"
- **Positive hooks**: "sauces that are safe to use during pregnancy", "pregnancy-safe condiments for when everything tastes bland"

### `baby_food`
- **Categories**: baby-foods, meal-replacements, dietary-supplements, prenatal-vitamins
- **Setting**: `pantry`
- **Negative hooks**: "even 'healthy' supplements can have ingredients to watch out for", "not everything marketed for pregnancy is actually safe"
- **Positive hooks**: "supplements that are actually safe during pregnancy", "my prenatal routine that my OB approved"

### `skincare`
- **Categories**: face-creams, body-lotions, shampoos, cosmetics, sunscreens
- **Setting**: `bathroom`
- **Negative hooks**: "skincare products you should STOP using while pregnant", "ingredients hiding in your moisturizer that aren't pregnancy safe"
- **Positive hooks**: "my pregnancy-safe skincare routine", "safe alternatives for your skincare routine during pregnancy"

---

## Video Settings (Backgrounds)

The setting determines the background in the product flip video:

| Setting | Description |
|---------|-------------|
| `grocery` | Grocery store aisle, shelves and floor visible |
| `kitchen` | Home kitchen, countertop and cabinets |
| `pantry` | Open pantry, food shelves |
| `fridge` | Open refrigerator, fridge shelves |
| `bathroom` | Bathroom counter and mirror |
| `drugstore` | Drugstore/pharmacy aisle |
| `table` | Dining table, home dining area |

---

## Hook Validation

The system validates that the hook tone matches the product safety results:
- **Negative hooks** (contain "aren't", "stop", "avoid", "shocked", etc.) → require at least one product with `caution`, `avoid`, or `insufficient_data`
- **Positive hooks** (contain "safe", "fine", "approved", etc.) → require all products to be `safe`
- **Neutral hooks** → accept any safety results

If validation fails, the CLI shows the mismatch and suggests picking different products or changing the hook.

---

## Adding New Themes

Add to `HOOK_THEMES` in `src/lib/product-search.ts`:

```typescript
new_theme: {
  label: 'Display Name',
  categories: ['off-category-1', 'off-category-2'],  // Open Food Facts category slugs
  setting: 'kitchen',  // must exist in FLIP_SETTINGS
  hooks: {
    negative: ['hook text with\nline breaks'],
    positive: ['positive hook text'],
  },
},
```

Find OFF category slugs at: `https://world.openfoodfacts.org/categories`
