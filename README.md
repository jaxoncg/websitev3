# Jaxon G Photography website

A static website (plain HTML, CSS, JavaScript). No build step, no server, no database. It runs on free GitHub Pages at **jaxongphotography.com**.

Almost everything you will want to change lives in **one file: `js/config.js`**. Each section there is numbered and commented.

## What's in the folder

```
index.html  portfolio.html  pricing.html  contact.html  404.html
css/    base.css  components.css  pages.css  portfolio.css  pricing.css  contact.css
js/     config.js (EDIT THIS)  layout.js  main.js  portfolio.js  pricing.js  form.js
assets/ images/  icons/  logo/  fonts/
favicon.svg  favicon.ico  robots.txt  sitemap.xml  CNAME  .nojekyll
```

To preview on your computer, open `index.html` in a browser. (Or run `python3 -m http.server` in this folder and visit http://localhost:8000.) The 404 page only works once deployed.

## Before you publish: the to-do list

1. **Fonts.** Download `anton.woff2` and `inter.woff2` (Anton and Inter are free; a convenient source is fontsource.org) and put them in `assets/fonts/`. Until then the site shows fallback fonts.
2. **Real email** in `js/config.js` (`business.email`).
3. **Form service** (see section 6) so inquiries reach you.
4. **Photos** (section 1) and a **photo of you** for the intro (portfolio id `p7`).
5. **Logo**: a starter logo is included; keep it or swap it (section 2).
6. **Bio text**: edit the paragraph in `index.html` (search for `REPLACE this bio`).
7. **Social share image**: `assets/images/og-cover.jpg` is currently the logo on black. Replace it with a 1200 x 630 photo if you like.
8. **Prices** you haven't confirmed (section 3) and your **service area** (section 5).

While these are unfinished, you will see yellow "setup note" and "Suggested pricing" labels. They disappear automatically as you fill things in.

## 1. Replace the placeholder photographs

1. Export your photos as JPG (about 2000 px on the long edge, quality 80 or lower to keep them fast). Optional: also save a WebP copy.
2. Put the files in `assets/images/`.
3. In `js/config.js`, find `portfolio:` and edit each entry:
   ```js
   { id: 'p1', src: 'assets/images/game-winner.jpg', webp: 'assets/images/game-winner.webp',
     w: 2000, h: 1333, shape: 'wide', category: 'Sports', alt: 'Quarterback releasing a pass under stadium lights' }
   ```
   - `w` and `h` are the real pixel size (prevents layout jumps).
   - `shape` is `wide`, `tall` or `square` and sets how the photo is cropped in the grid. The full photo always shows in the lightbox.
   - `alt` describes the photo for screen readers and search engines. Write it for someone who can't see it.
   - `webp` is optional.
4. To add a photo, copy an entry and give it a new `id` (for example `p11`). The first photo in the list is shown large.
5. The photos used on the homepage are set by id: the hero uses `p1`, the featured pair `p3` and `p2`, the intro `p7`, selected work `p5 p10 p8 p4`, and each service uses the `image` id in the `services` list.

## 2. Replace the logo

A starter logo is already included in `assets/logo/` (`logo-dark.svg` for black backgrounds, `logo-light.svg` for white, `logo-mark.svg` and `logo-mark-512.png` for the JG monogram/profile picture). To use your own instead, put the file in `assets/logo/` and set `logo.src` (and `width`, `height`) in `js/config.js`:
```js
logo: { src: 'assets/logo/jaxon-g-logo.svg', width: 160, height: 48 },
```
The site header expects a logo that looks good on black. It works best as an SVG or a transparent PNG that looks good on black. To update the favicon, replace `favicon.svg`, `favicon.ico` and `assets/icons/apple-touch-icon.png` (180 x 180).

## 3. Update pricing

Edit `pricing:` in `js/config.js`. Each package has a name, price, duration, description and an `inc` list of what's included. Set `from: true` to show "from $X".

- `confirmed: true` shows the price as final.
- `confirmed: false` adds a **Suggested pricing** tag. Your four portrait prices are confirmed; every other price is a suggestion for you to change. Set `confirmed: true` once you're happy with a price.

## 4. Change contact information

`js/config.js`, section 1: `business.email` and optional `business.phone`. These appear in the footer and on the contact page.

## 5. Social links and service area

- `socials`: paste full profile URLs (for example `https://www.instagram.com/yourname`). Empty entries are hidden. You can rename or add platforms.
- `business.serviceArea`: for example `Lexington, KY and nearby`. It appears in the footer, on the contact page, and in the structured data search engines read. For better local search, also mention your area in the `<title>` and `description` tags of each page.

## 6. Set up the inquiry form

The site has no server, so the form needs an outside service. Recommended: **Formspree** (free tier, but it has a monthly submission limit, so check formspree.io/plans).

1. Create an account at formspree.io and make a new form. Use your real email as the destination.
2. Copy the form ID (the code after `/f/` in the form's endpoint URL).
3. Put it in `js/config.js`: `form: { formspreeId: 'abcd1234' }`.
4. Submit a test inquiry from the live site. Confirm it arrives in your inbox. (Formspree may ask you to confirm your email first.)

How it behaves: the visitor sees "Inquiry received" **only after Formspree confirms delivery**. If it fails, they see an error and your email address.

If `formspreeId` is empty, the form opens the visitor's own email app with the message filled in and says nothing is sent until they press Send. That's the built-in fallback.

## 7. Change the domain

If the domain ever changes from jaxongphotography.com, update it in these places:
1. `CNAME` (one line, the bare domain).
2. `business.domain` in `js/config.js`.
3. `canonical`, `og:url` and `og:image` tags near the top of each `.html` file.
4. `sitemap.xml` and the `Sitemap:` line in `robots.txt`.

(Search for `jaxongphotography.com` in your editor to find them all.)

## 8. Deploy to GitHub Pages

1. Create a free GitHub account and a new **public** repository (for example `jaxongphotography`).
2. Upload everything in this folder to the repository root, so `index.html` and `CNAME` are at the top level. (On github.com: Add file, Upload files, drag the contents in, Commit. Include the hidden `.nojekyll` file if your tool allows; it's helpful but not required.)
3. Go to **Settings, Pages**. Under "Build and deployment", set Source to **Deploy from a branch**, branch **main**, folder **/ (root)**, then Save.
4. Wait a minute or two. GitHub shows your temporary address (`username.github.io/repository`). Note that the 404 page and some links are designed for the custom domain, so check the final site there.

### Connect the custom domain

1. In **Settings, Pages, Custom domain**, enter `jaxongphotography.com` and Save. (The `CNAME` file in this project already contains it.)
2. At your domain registrar's DNS settings, add these records for the bare domain (`@`), per GitHub's documentation:
   - **A records:** `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **AAAA records (optional, IPv6):** `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - **CNAME record** for `www` pointing to `YOUR-USERNAME.github.io`
3. DNS changes can take up to 24 hours. GitHub's docs on managing a custom domain are the source of truth if anything has changed: docs.github.com, search "Managing a custom domain for your GitHub Pages site". Avoid wildcard DNS records.

### Turn on HTTPS

Once DNS has been recognised, go to **Settings, Pages** and tick **Enforce HTTPS**. The certificate can take up to an hour or so to appear; if the box is greyed out, wait and refresh.

## Verify the live site (checklist)

- [ ] https://jaxongphotography.com loads with a padlock, and www redirects to it.
- [ ] Every page opens from the menu: Home, Portfolio, Pricing, Contact.
- [ ] Visiting a made-up address (like /nope) shows the "Out of frame." 404 page.
- [ ] Photos and your logo show (no grey "Replace me" frames left).
- [ ] Fonts look right (bold condensed headlines).
- [ ] Lightbox opens, arrow keys and Esc work, swipe works on your phone.
- [ ] Test inquiry arrives in your inbox; success message only appears after sending.
- [ ] Email, phone and social links go to the right places.
- [ ] No yellow "Setup note" or "Suggested pricing" labels remain unless intended.
- [ ] Check on a phone and a laptop. Try the sound toggle (off by default).
- [ ] View https://jaxongphotography.com/sitemap.xml and /robots.txt.
- [ ] Submit the sitemap in Google Search Console (optional but recommended).
- [ ] Share the link in a message to confirm the preview image (`og-cover.jpg`) appears.

## Good to know

- **Accessibility:** keyboard-navigable, visible focus rings, skip link, labeled form fields with error messages, reduced-motion respected. Keep writing meaningful `alt` text.
- **Sound:** off by default, toggle in the header, tiny synthesized clicks (no audio files). Never autoplays.
- **Performance:** no frameworks or libraries; images lazy-load; keep photos under about 400 KB each where you can.
- **Limits of a static site:** the form depends on the outside service; nothing is stored on the website itself.
