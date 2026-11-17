# Onestop Puzzle Hub

Responsive e-commerce site (HTML, CSS, JavaScript) with product listing, search and filters, cart, checkout, Razorpay payment, Google Sheets order logging, additional fees (gift wrap, warranty, card fee) and a signup form.

## Run locally
Seedha `index.html` double-click karein, ya:
```
npx serve .
```

## Setup
1. `config.js` mein Razorpay test key daliye.
2. Google Sheet banaiye, `apps-script.gs` code Apps Script mein paste karke Web App deploy kijiye, URL `SHEET_URL` mein daliye.

## Push to GitHub
```
git init
git add .
git commit -m "Onestop Puzzle Hub"
git branch -M main
git remote add origin https://github.com/<username>/puzzle-hub.git
git push -u origin main
```

## Live link
- Vercel/Netlify: GitHub repo import karein (build command khali, output directory `.`), ya
- GitHub Pages: Settings > Pages > Branch `main` > root.

## Design and technical notes
Products ek JS collection (CMS-style) se dynamically render hote hain. Payment Razorpay Checkout se hota hai, aur order details Google Apps Script webhook ke through Google Sheet mein save hoti hain. Layout CSS Grid/Flexbox se responsive hai. Challenge: browser se Sheets webhook ke liye `no-cors` mode use karna pada.
