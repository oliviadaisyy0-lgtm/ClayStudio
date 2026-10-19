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

- **Homepage** — hero introduction, featured pottery images, categorized "Explore More Clay" section, and a login/sign up area.
- **Shop** — product listings grouped into tabbed categories (Cute Clay, Cups, Necklaces, Vases, plus a dynamic "Just Added" tab for seller submissions), a live search filter, and an auto-scrolling image carousel.
- **About** — the studio's founding story and photos of the making process, viewable in a lightbox.
- **Enquiry** — a form for product, custom commission, or class enquiries, with a simulated cost/availability response.
- **Contact** — two studio locations, opening hours, a general message form, and an FAQ accordion.
- **Sell** — a page allowing other clay artists to submit a piece (photo, title, price, category); submissions are saved and immediately appear in the Shop's "Just Added" tab.
- Fully responsive layout (mobile and desktop).
- Consistent navigation with a working "Shop" dropdown.

### JavaScript Enhancements (Part 3)
- **Shop category tabs** — JavaScript shows/hides product sections instead of all being visible at once.
- **Lightbox gallery** — clicking any product, hero, or About page image opens it enlarged in an overlay (closable via click-outside, close button, or Escape key).
- **FAQ accordion** — expandable/collapsible questions on the Contact page.
- **Live search filter** — typing in the Shop search bar filters visible products in real time.
- **Form validation** — both the Enquiry and Contact forms are validated with JavaScript (name length, email format, message length) and show inline success/error messages without a page reload.
- **Distinct form behaviour** — the Enquiry form returns a simulated cost/availability response based on the enquiry type selected; the Contact form compiles the message and opens the visitor's email client via `mailto:`.
- **Auto-scrolling image carousel** — a continuously looping strip of pottery images on the Shop page (pure CSS animation, pauses on hover).
- **Login / Sign Up** — client-side account creation and login using the browser's `localStorage`. Once logged in, the homepage shows a personalised welcome message instead of the login buttons.
- **Dynamic content from the Sell page** — when a seller submits a piece on `sell.html`, the photo, title, price, and category are saved to `localStorage` and dynamically rendered as a new product card in the Shop under a "Just Added" tab — demonstrating DOM manipulation and dynamically loaded content.

> **Note on Login/Sign Up security:** this is a client-side demonstration only, built to satisfy the JavaScript/DOM requirements of this assignment. Account details are stored in plain text in the browser's `localStorage` and are **not secure** — anyone using the same browser/device could view them in DevTools. A production login system would require a server, a database, and encrypted password storage (e.g. hashing with bcrypt), which is beyond the scope of a static HTML/CSS/JS site.

---

## SEO Implementation

- Unique, descriptive `<title>` and `<meta name="description">` tags on every page.
- Descriptive `alt` text on all images.
- Logical heading hierarchy (H1 per page, H2 for section headings).
- Clean, descriptive URLs (e.g. `products.html`, `about.html`).
- Internal linking throughout (nav, Shop dropdown, Explore section, Sell-to-Shop flow).
- Mobile-responsive layout.
- `robots.txt` — instructs search engine crawlers to index the full site.
- `sitemap.xml` — lists all pages for search engines (update the placeholder domain once deployed).

*(Off-page SEO — backlinks, social media promotion, local SEO — is outside the scope of what can be implemented directly in the site's code, and would be carried out post-launch as part of ongoing marketing.)*

---

## Technical Requirements

- **Languages:** HTML5, CSS3, vanilla JavaScript (no external frameworks/libraries used).
- **Structure:** all pages share one external stylesheet (`css/style.css`) and one external script (`js/main.js`).
- **Data persistence:** browser `localStorage` is used for login accounts and seller-submitted listings (client-side only, no backend database).
- **Hosting:** deployed via [Netlify / GitHub Pages — update with whichever you use].

---

## Timeline and Milestones

| Milestone | Status |
|---|---|
| Proposal submission & approval | Complete |
| Content research & sourcing | Complete |
| Sitemap & file/folder structure | Complete |
| Part 1: HTML pages built (Home, Shop, About, Enquiry, Contact) | Complete |
| Part 1: GitHub repository setup & initial commits | Complete |
| Part 2: Additional Sell page & navigation updates | Complete |
| Part 3: JavaScript interactivity (tabs, lightbox, accordion, search, validation) | Complete |
| Part 3: Login/Sign Up & dynamic Sell-to-Shop listings | Complete |
| Part 3: SEO implementation (meta tags, robots.txt, sitemap.xml) | Complete |
| Part 3: Deployment to live hosting | In progress |

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

### Part 1
- Initial project structure created.
- Built 5 core pages: Home, Shop, About, Enquiry, Contact.
- Created shared stylesheet with site-wide colour variables.
- Added working navigation with a Shop dropdown linking to product categories.

### Part 2
- Added a new Sell page allowing clay artists to submit items with a photo, title, and price.
- Updated navigation: replaced account/cart icons with a search link and a "Sell" link.
- Enlarged and restyled homepage and shop product images.
- Added hover/press animation effects to product images (CSS only).
- Updated About page to include two images and a newsletter signup section.
- Fixed folder structure issues (CSS/HTML path corrections).

### Part 3
- Implemented JavaScript-driven Shop category tabs (replacing static always-visible sections).
- Added a lightbox gallery for product, hero, and About page images.
- Added an FAQ accordion to the Contact page.
- Added a live search filter on the Shop page.
- Implemented JavaScript form validation and distinct response behaviour for the Enquiry form (simulated cost/availability reply) and Contact form (compiles and opens a `mailto:` email).
- Added a client-side Login/Sign Up system using `localStorage` (with a documented security limitation — see note above).
- Added a continuously auto-scrolling image carousel to the Shop page (pure CSS).
- Connected the Sell page to the Shop page: submitted items (photo, title, price, category) are saved and dynamically rendered as new product cards under a "Just Added" tab.
- Added SEO meta titles and descriptions to every page.
- Added `robots.txt` and `sitemap.xml`.
- Re-added a category dropdown to the Sell form (required so new submissions can be sorted into the correct Shop tab).

---

## References

Schwatz,B.,2016. Top Pottery Blogs of 2015. Pottery Making Info. Available at: https://potterymakinginfo.com/news/top-pottery-blogs-of-2015/ [Accessed 13 August 2026]

Schwatz,B.,2018. 033 Pottery Goals- MudTalk Podcast. Expert Clay. Available at: https://expertclay.com/podcast/pottery-goals/ [Accessed 13 August 2026]

North Carolina Clay Club,2015. North Carolina Clay Club. Blog. Available at: https://ncclayclub.blogspot.com/ [Accessed 13 August 2026]

Canva,2026. Color Palette Generator. Available at: https://www.canva.com/colors/color-palette-generator/ [Accessed 13 August 2026]

Female Alchemy, 2026. Female Alchemy: Ceramic pieces, merch, & stickers. Available at: https://www.femalealchemy.com/ [Accessed 12 August 2026]

Google Fonts. Available at: https://fonts.google.com

Unsplash. Available at: https://unsplash.com
