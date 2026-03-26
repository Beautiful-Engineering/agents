# Search Ads URL Encoding

What you set in your UTM tags is exactly the URL that ads use.

Meaning if you have a space or something in your UTMs, it could break the URL.

To prevent that, you'll want to “URL encode” it so it doesn’t break. Essentially, you replace all spaces and special characters (!$%&@, etc.) with something a browser can understand.

For example, this URL would break because of the spaces and exclamation point:

> https://www.fictitiousdogfood.com/?utm_source=google&utm_campaign=pet products&utm_medium=search&utm_content=healthiest dog food!&utm_term=best healthy dog foods

But this one wouldn’t:

> [https://www.fictitiousdogfood.com/?utm_source=google&utm_campaign=pet%20products](https://www.fictitiousdogfood.com/?utm_source=google&utm_campaign=pet%20products&utm_medium=search&utm_content=healthiest%20dog%20food%21&utm_term=best%20healthy%20dog%20foods)[
&utm_medium=search&utm_content=healthiest%20dog%20food%
21&utm_term=best%20healthy%20dog%20foods](https://www.fictitiousdogfood.com/?utm_source=google&utm_campaign=pet%20products&utm_medium=search&utm_content=healthiest%20dog%20food%21&utm_term=best%20healthy%20dog%20foods)

Note the %20 (spaces) and %21 (exclamation mark).

So, for example, the **utm_campaign** of pet products would turn into **pet%20products**.

How do you encode URLs quickly?

Use [this URL encoding tool](https://www.urlencoder.org/). Put the name of your campaign (or ad group, or whatever you’re trying to encode) in.

Copy-paste the result when you’re making a URL.