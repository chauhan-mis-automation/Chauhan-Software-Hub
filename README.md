# Chauhan Software Hub

A catalogue website for showing your software to clients. It works like an e-commerce site, but with no cart and no online payment: clients can only send an Enquiry or a Demo Request, and those reach you on WhatsApp.

## Run locally
```
npm install
npm run dev
```

## Deploy (Vercel)
Push the project to GitHub and import it in Vercel. Nothing else needs setting up: `vercel.json` already makes links like `/software/school-erp` open correctly.

## Where to change things
| What | File |
|---|---|
| Phone, WhatsApp number, email, address | `src/data/site.js` → `COMPANY` |
| Products: name, text, features, modules, badges | `src/data/products.js` → `PRODUCTS` |
| Categories | `src/data/products.js` → `CATEGORIES` |
| Pricing plans text | `src/data/site.js` → `PRICING_MODELS` |
| Client reviews | `src/data/site.js` → `REVIEWS` (the section stays hidden while this is empty) |

### Add screenshots to a product
1. Put the image in `src/assets/products/`.
2. Import it at the top of `src/data/products.js`.
3. Add it to that product's `images: [...]` list. The first image becomes the cover.

### Add a video
Set the product's `video` field to one of these:
- a YouTube link, e.g. `"https://youtu.be/abcdEFGhijk"`, or
- an mp4 file placed in `public/videos/`, e.g. `"/videos/whatsapp-demo.mp4"`.

The video then appears as the first item in that product's gallery.

### Home page rows
Each product has `featured`, `bestSeller` and `newArrival` (true/false). These decide which rows the product appears in: Featured Products, Best Selling and New Arrivals.

## How enquiries work
When a client submits any form (Enquiry, Request a Demo, or the form on a product page), two things happen:
1. **The details are saved to the Google Sheet** as a new row with Date & Time, Type, Name, Mobile, Business, Software, Users, Demo Time, Requirements, Page and Status (set to "New").
2. **WhatsApp opens** with the same details filled in. The client taps Send.

The row is saved even if the client never taps Send in WhatsApp.

### Connect the Google Sheet (one time, ~5 minutes)
1. Open the sheet → **Extensions → Apps Script**.
2. Delete everything in `Code.gs`, paste the contents of `google-apps-script/Code.gs`, and click **Save**.
3. Click **Deploy → New deployment**. Click the ⚙ next to "Select type" and choose **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy → Authorize access**. Choose your Google account → **Advanced → Go to (project name) → Allow**.
5. Copy the **Web app URL** (it ends with `/exec`) and paste it into `src/data/site.js`:
   ```js
   export const SHEET_URL = "https://script.google.com/macros/s/XXXX/exec";
   ```
6. Submit a test enquiry on the site. A new row should appear in the sheet.

The script adds its column headings itself. If your sheet already has headings, it fills the columns whose names match and adds the missing ones at the end. To use another tab, set `SHEET_NAME` at the top of the script.

If you edit the script later: **Deploy → Manage deployments → ✏ Edit → Version: New version → Deploy**. The URL stays the same.
