# Project Name: Clay Studio 

## Student Information
Student Name: Asukia Ebuta

Module Name: WEDE5020

Lecturer: Mr Lwazi

## Project Overview
Clay studios attract and connect people who are interested in learning about exploring clay and pottery and create their own cute and aesthetics and allow artists to sell and promote their work. A platform where people can scroll through beautiful, cute clay and pottery design and inspiration.
Encourage more people enjoy, learn handmade activities, decorate home, make cups, bowls and cute necklace.

---

## Website Goals and Objectives
The main goals of the website are:

• Create online platform for clay and pottery lovers to upload photos of their work

• Allows handmade artists to promote and sell their work

• Users can upload their aesthetic and cute ideas

• Encourage other people more into handmade clay activity and take classes

**Key Performance Indicators (KPIs):**
- Number of enquiries submitted per month (product, custom order, or class bookings).
- Growth in overall site traffic over the first 3 months live.
- Engagement with the Shop page categories (Cute Clay, Cups, Necklaces, Vases).
- Number of accounts created and seller submissions received.

---

## Key Features and Functionality

- **Homepage:** hero pictures, an "Explore More Clay" section linking to each Shop category, and Login / Sign Up / Continue as Guest.
- **Shop:** product categories as tabs (Cute Clay, Cups, Necklaces, Vases, Bag Charms, More Clay) plus a "Just Added" tab for seller items. It has live search, sort by price or name, an auto-scrolling picture strip and a lightbox.
- **About:** the studio story with two photos (lightbox) and a newsletter sign-up form (visual only, it does not send anything yet).
- **Enquiry:** a validated form with a preferred-date picker. A thank-you with cost and availability information appears without reloading the page.
- **Contact:** a validated form (South African phone number, type of message), an interactive map with both studios, an FAQ accordion and LocalBusiness structured data.
- **Sell:** upload a photo (with a live preview), add a title, category and price. The piece appears in the Shop under "Just Added" and can be removed again.
- Consistent navigation with a Shop dropdown, the brand name links back to the home page, and the layout is responsive.

### JavaScript Enhancements (Part 3)

| Feature | Page | How it works |
|---|---|---|
| Shop tabs | Shop | JavaScript shows one category at a time and reads the category from the web address. |
| Lightbox gallery | Home, Shop, About | Click a picture to see it at full height in an overlay. Esc, the X or a click outside closes it. |
| FAQ accordion | Contact | Click a question to expand or collapse its answer. |
| Interactive map | Contact | Leaflet map with a marker and popup for each studio and a "Get directions" link. |
| Live search and sort | Shop | Typing filters products as you type; the dropdown sorts by price or name. |
| Auto-scrolling strip | Shop | CSS animation that loops and pauses on hover. |
| Form validation | Enquiry, Contact | JavaScript checks name, email, South African phone number, dates and message length, and shows red error messages. |
| AJAX form submission | Enquiry, Contact | `fetch()` sends the data to FormSubmit, which emails claystudio@gmail.com. The page does not reload. If sending fails, the visitor's email program opens as a backup. |
| Login / Sign Up | Home | Accounts are kept in the browser's localStorage with a salted SHA-256 hash of the password. |
| Sell to Shop | Sell, Shop | The photo is resized with a canvas, saved in localStorage and turned into a product card with DOM methods. |
| Photo preview | Sell | The chosen photo is shown in the upload box before posting. |

> **Note:** the login, accounts and seller items live in the visitor's own browser. They are a front-end demonstration, and a real shop would need a server and database.



---

## SEO Implementation

- A unique title and meta description on every page, using the keywords below.
- One H1 per page, with H2 and H3 headings below it in order.
- Descriptive alt text and descriptive file names on images; lazy loading on pictures below the first screen.
- Clean page addresses (about.html, products.html and so on) and internal links in the menu, the Explore section and the Sell-to-Shop flow.
- Mobile-friendly: viewport tag and a responsive layout, checked at phone width with no sideways scrolling.
- `robots.txt` and `sitemap.xml`, updated with the live address.
- LocalBusiness structured data (JSON-LD) for both studios on the Contact page.
- Off-page SEO plan (below).

---

## Technical Requirements

- **Languages:** HTML5, CSS3 and JavaScript (no framework).
- **Libraries and services:** Leaflet (interactive map), OpenStreetMap and CARTO (map tiles), FormSubmit (delivers form messages by email), Google Fonts (Caveat and Jost) and Unsplash (stock photos).
- **Data storage:** the browser's localStorage for accounts and seller items. There is no server or database.
- **Hosting:** Netlify, free plan, with HTTPS included. Live site: [add your link here].

---

## Keyword Research

**Primary keywords:** handmade pottery Johannesburg, ceramic mugs, pottery classes Johannesburg, clay bag charms, handmade clay necklaces, custom pottery commission.

**Method:** I typed each phrase into Google and noted the autocomplete suggestions, then kept the phrases that match what the studio really sells.

| Page | Keywords used | Where |
|---|---|---|
| Home | handmade pottery, ceramics, Johannesburg | title, meta description, main heading |
| Shop | mugs, cups, vases, necklaces, bag charms | title, meta description, category headings |
| About | pottery studio, since 2015 | title, meta description, story text |
| Enquiry | pottery classes, custom commission | title, meta description |
| Contact | pottery studio Johannesburg, opening hours | title, meta description, LocalBusiness data |

## Off-Page SEO Plan

**Backlinks**
- Create a Google Business Profile for each studio and link it to the website.
- List the studio in the Ceramic Arts Daily community and on local craft-market and art-fair pages, with a link back to the site.
- Ask the local cafes that order custom tableware to link to the Shop page from their own websites.

**Social media**
- Post new pieces and class dates on Instagram and Pinterest, with the website link in the bio.
- Use a Facebook page for class bookings and community events.

**Local SEO**
- Keep the studio name, address and phone number identical everywhere they appear.
- Use the LocalBusiness structured data on the Contact page for both studios (Rosebank and Alberton).
- Use "Johannesburg" in page titles, headings and descriptions.

## Security Measures

- The live site is served over HTTPS (provided automatically by the host).
- Every form is validated in JavaScript before anything is sent.
- Text typed by visitors is shown with `textContent`, never inserted as HTML, so it cannot run as code.
- Passwords are stored as a salted SHA-256 hash (Web Crypto API), never as plain text.
- External links use `rel="noopener noreferrer"`.
- **Limits:** the login system is a front-end demonstration. Accounts are saved in the visitor's own browser, so a real shop would need a server and database.

| Milestone | Status |
|---|---|
| Part 1: pages, navigation, GitHub setup | Complete |
| Part 2: Sell page, navigation and design updates | Complete |
| Part 3: JavaScript interactivity (tabs, lightbox, accordion, search and sort, map) | Complete |
| Part 3: forms with validation and AJAX submission | Complete |
| Part 3: SEO (meta tags, structured data, robots.txt, sitemap.xml, keywords) | Complete |
| Part 3: security improvements (hashed passwords, safe text output) | Complete |
| Part 3: deployment to Netlify | [Complete / In progress] |

---

## Sitemap

```
Home (index.html)
├── Shop (products.html)
│   ├── Cute Clay (#cute-clay)
│   ├── Cups (#cups)
│   ├── Necklaces (#necklaces)
│   ├── Vases (#vases)
│   └── Just Added (dynamic, from Sell submissions)
├── About (about.html)
├── Sell (sell.html)
├── Enquiry (enquiry.html)
└── Contact (contact.html)
```

---

## File and Folder Structure

```
clay-studio/
├── index.html
├── about.html
├── products.html
├── contact.html
├── enquiry.html
├── sell.html
├── robots.txt
├── sitemap.xml
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
```

---

## Changelog

### Part 3

**Part 2 feedback**


**Interactive features**
- Added Shop category tabs, a live search filter and a sort by price or name.
- Added a lightbox gallery for product, hero and About images. Pictures now open at full height and uncropped, and small pictures load a bigger version.
- Added an FAQ accordion to the Contact page.
- Added an interactive Leaflet map with both studios, popups and a directions link.
- Added an auto-scrolling picture strip to the Shop page.
- Added a live photo preview to the Sell page.

**Dynamic content**
- Sell page items are saved and shown in the Shop under "Just Added", and a Remove button deletes them again.
- Added Login / Sign Up using browser storage.

**Forms**
- Enquiry and Contact forms are validated in JavaScript with red error messages shown above the form.
- Added South African phone number validation, a preferred-date field with date validation, and a "type of message" field.
- Forms are sent by AJAX (`fetch`) with a form `action`, and the visitor sees a personal thank-you message. The visitor's email program opens as a backup if sending fails.
- Enquiry replies include cost and availability information.

**SEO and speed**
- Added a title and meta description to every page; fixed the Contact page heading order.
- Added `robots.txt`, `sitemap.xml` and LocalBusiness structured data.
- Added lazy loading and renamed images with descriptive file names.
- Added keyword research and an off-page SEO plan to the README.

**Security**
- Passwords are now stored as salted SHA-256 hashes instead of plain text.
- Visitor text is shown with `textContent` and external links use `rel="noopener noreferrer"`.

**Other fixes**
- The brand name now links to the home page on every page.
- Fixed the form boxes starting their text too far from the left edge.

---

## References

Schwatz,B.,2016. Top Pottery Blogs of 2015. Pottery Making Info. Available at: https://potterymakinginfo.com/news/top-pottery-blogs-of-2015/ [Accessed 13 August 2026]

Schwatz,B.,2018. 033 Pottery Goals- MudTalk Podcast. Expert Clay. Available at: https://expertclay.com/podcast/pottery-goals/ [Accessed 13 August 2026]

North Carolina Clay Club,2015. North Carolina Clay Club. Blog. Available at: https://ncclayclub.blogspot.com/ [Accessed 13 August 2026]

Canva,2026. Color Palette Generator. Available at: https://www.canva.com/colors/color-palette-generator/ [Accessed 13 August 2026]

Female Alchemy, 2026. Female Alchemy: Ceramic pieces, merch, & stickers. Available at: https://www.femalealchemy.com/ [Accessed 12 August 2026]

Google Fonts. Available at: https://fonts.google.com

Unsplash. Available at: https://unsplash.com

 Agafonkin, V.,2023. Leaflet: an open-source JavaScript library for interactive maps. Available at: https://leafletjs.com (Accessed: 28 october 2026).
 
 Mozilla Developer Network (n.d.) *SubtleCrypto*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto (Accessed:  28 october 2026).
