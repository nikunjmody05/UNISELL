# Unisell

A clean, Apple-inspired e-commerce storefront built with plain HTML, CSS and JavaScript. No framework, no build step.

**Live demo:** https://nikunjmody05.github.io/UNISELL/

## Features
- 15-product catalog across Electronics, Fashion and Accessories, with all product art drawn in code (SVG)
- Live search, category filters and sorting
- Wishlist and a cart with quantities, both saved in `localStorage`
- Free-delivery progress bar in the cart
- Checkout simulation with UPI and card validation, plus an order confirmation
- Light and dark mode that follows your last choice
- Responsive layout, keyboard focus styles and reduced-motion support

## Analytics (GA4 events)
`add_to_cart`, `add_to_wishlist`, `begin_checkout`, `add_payment_info`, `purchase`, `generate_lead` (contact form).
Microsoft Clarity, Smartlook and Contentsquare are also loaded from `analytics.js`.

## Structure
```
index.html  products.html  cart.html  about.html  contact.html
style.css   app.js         analytics.js
```

## Run locally
Open `index.html` in a browser, or run `npx serve`.

## Author
Nikunj Mody · https://github.com/nikunjmody05
