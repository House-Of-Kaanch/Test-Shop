# House of Kaanch — edited storefront

This is an edit of your supplied index.html, styles.css and script.js. It retains the original page structure: scrolling announcements, sticky navigation, collage hero, stylist teaser, pattern ribbon, product grid, gifting, brand story, prints, five-question quiz, newsletter and cart drawer.

## Open the site

Extract the entire ZIP into one folder, then double-click index.html. Keep styles.css, script.js and assets/ beside it. No build step or installation required. Optional local server: run `python3 -m http.server 8000` in the extracted folder and visit http://localhost:8000.

The actual supplied KAANCH logo is included in assets/kaanch-logo.png. Google Fonts loads Cormorant Garamond and DM Sans if you are online; serif and system fonts are the offline fallbacks. These are visual approximations, not an assertion of the original logo's font.

## What changed

- Replaced Ulta Pulta branding with House of Kaanch, including metadata, gift cards, copy and cart messages.
- Used your exact six colour values: spell book #B57C3F, sage #A09F57, berry jam #992826, honey jar #FEA13F, frilly apron #F1C3C0, black cat #27303A, with warm ivory backgrounds.
- Kept the original collage concept and integrated the supplied logo in a mirror-shaped frame.
- Restyled existing cards, gift section, quiz and print cabinet with softer borders and editorial typography.
- Kept eight editable sample products and eight CSS patterns, now renamed for the brand.
- Connected print tiles to matching products and the mix builder to real top/bottom choices in the demo catalogue.
- Fixed menu state, drawer keyboard focus, cart persistence validation and misleading newsletter success text.
- Replaced dead footer links with editable information dialogs.

## Edit content

| Change | File / location |
| --- | --- |
| Products, names, rupee prices, descriptions | PRODUCTS near the top of script.js |
| Product photographs | Add `image: "assets/my-photo.jpg"` to a product and put that file in assets/ |
| Pattern names | PRINTS in script.js |
| Pattern colours and shapes | .p-* styles in styles.css |
| Brand colours | :root at the top of styles.css and the clearly labelled House of Kaanch brand layer |
| Hero, story, button wording, footer | index.html |
| Quiz questions and result copy | QUIZ and RESULT_COPY in script.js |
| Shipping, returns, privacy and contact text | INFO near the bottom of script.js |
| Gift recipients and denominations | #giftFor and #giftAmt in index.html |

Example product (append to PRODUCTS; IDs must be unique):

```js
{ id: "your-top", name: "Your Product Name", desc: "Your description", price: 2200,
  type: "top", top: "stripe", bottom: "stripe", image: "assets/your-photo.jpg" }
```

Prices are whole rupees. Categories are `set`, `lehenga`, `top`, `bottom`. `top` and `bottom` refer to pattern IDs in PRINTS. Without an image, the card displays an explicitly labelled pattern preview. Products are examples, not actual stock. This version preserves the supplied direct-add demo; it does not implement clothing-size variants or inventory.

## What works and what is a preview

Works locally: category and print filters, add to bag, quantity changes, removal by reducing quantity to zero, subtotal, browser-local cart persistence, gift denomination/recipient selections, mix builder, quiz, navigation and information dialogs.

Checkout is a preview. No payments, orders or redeemable gift cards are issued. Newsletter signup does not save or transmit email addresses. Gift-card issuance, payment processing, stock/size management and email subscriptions need a commerce backend before launch. This is static HTML/CSS/JS, not an uploadable Shopify Liquid theme; do not upload this ZIP to Shopify's theme uploader.

Replace sample products and policy/contact placeholders before launch. Cart data is local to the browser. Clearing website data resets it. Do not put secret credentials in frontend files.

## GitHub

Upload index.html, styles.css, script.js and the assets/ directory together to your repository. There is no dependency installation or build command. For a non-transactional design demo, GitHub Pages can deploy from the main branch and /(root) folder under repository Settings → Pages. No Actions workflow is required or included. Use commerce-appropriate hosting/backend for a live shop; GitHub Pages is not intended to host your ecommerce business.

## Verification

JavaScript syntax, local file references, catalogue/print integrity, filtering, cart arithmetic, cart quantity removal and quiz result generation were checked. Browser visual rendering was unavailable in this environment, so review desktop and mobile appearance in your browser before launch. No live checkout was connected or tested.
