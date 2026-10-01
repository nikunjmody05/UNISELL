# Unisell

A clean, Apple-inspired e-commerce storefront built with plain HTML, CSS and JavaScript. No framework and no build step. It includes a full shopping flow (browse, save, cart, checkout) and is instrumented with Google Analytics 4 and Microsoft Clarity to study real shopping behaviour.

**Live demo:** https://nikunjmody05.github.io/UNISELL/

![Unisell home page](screenshots/home.png)

## Features

**Shopping**
- 15 products across Electronics, Fashion and Accessories
- Live search, category filters and sorting (featured, top rated, price low to high, price high to low)
- Wishlist with a "Saved" filter
- Cart with quantity controls, saved between visits
- Free-delivery progress bar (free over ₹5,000, otherwise ₹99)

**Checkout (demo)**
- UPI and debit/credit card payment options
- Validation for UPI ID or mobile number, card number, expiry (MM/YY), CVV and cardholder name
- Card number and expiry format automatically as you type
- Order confirmation with a transaction ID
- No real payment is taken

**Design and experience**
- Light and dark mode that remembers your choice and loads without a flash
- Product visuals drawn as inline SVG, so there are no image files to load
- Responsive layout from phone to desktop
- Visible keyboard focus, labelled controls and reduced-motion support

## Screenshots

| Home | Shop |
| --- | --- |
| ![Home](screenshots/home.png) | ![Shop](screenshots/shop.png) |

| Cart | Dark mode |
| --- | --- |
| ![Cart](screenshots/cart.png) | ![Dark mode](screenshots/dark.png) |

## Analytics

Events are sent to Google Analytics 4 with the `gtag` function.

| Event | When it fires |
| --- | --- |
| `add_to_cart` | A product is added to the cart |
| `add_to_wishlist` | A product is saved with the heart button |
| `begin_checkout` | The shopper opens checkout |
| `add_payment_info` | The shopper clicks Pay with valid details |
| `purchase` | The simulated payment completes |
| `generate_lead` | The contact form is submitted |

Microsoft Clarity, Smartlook and Contentsquare are also loaded for heatmaps and session recordings. All tracking code lives in `analytics.js`, so it is the same on every page.

## Tech stack

- HTML5, CSS3 (custom properties for theming) and vanilla JavaScript (ES6)
- `localStorage` for the cart, wishlist and theme
- Google Analytics 4, Microsoft Clarity, Smartlook and Contentsquare
- GitHub Pages for hosting

## Project structure

```
UNISELL/
├── index.html       Home page
├── products.html    Shop with search, filters and sorting
├── cart.html        Cart, checkout and order confirmation
├── about.html       About page
├── contact.html     Contact form
├── style.css        Design tokens, layout and dark theme
├── app.js           Catalog, cart, wishlist, checkout and events
├── analytics.js     Tracking scripts
└── screenshots/     Images used in this README
```

## How it works

- **Catalog:** All products are defined once in an array in `app.js`. The shop, home page and cart are all generated from it, so adding a product is a single line.
- **Product art:** Each product has a hue and a glyph name. `app.js` draws the matching SVG on a tinted tile.
- **State:** The cart is stored under the `cart` key, the wishlist under `wish` and the theme under `theme` in `localStorage`.
- **Theme:** `analytics.js` sets the dark class before the page paints, which prevents a white flash.

## Run locally

```bash
git clone https://github.com/nikunjmody05/UNISELL.git
cd UNISELL
npx serve
```

You can also open `index.html` directly in a browser.

## Roadmap

- Product detail page
- Coupon codes
- Real product photography
- Order history

## Author

**Nikunj Mody**
GitHub: https://github.com/nikunjmody05

## License

Developed for educational and portfolio purposes.
