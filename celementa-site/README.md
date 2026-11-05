# Celementa website — static version for GitHub Pages

A plain HTML/CSS/JS rebuild of celementa.com (previously on Framer). No build step, no frameworks — upload the files and it runs.

```
celementa-site/
├── index.html                 Home
├── works/index.html           Projects list
├── works/<project>/index.html 6 case-study pages
├── contact/index.html         Contact form + FAQ
├── 404.html
├── assets/css/style.css       All styles (brand colors at the top)
├── assets/js/main.js          Menu, animations, contact form
├── sitemap.xml, robots.txt
└── tools/localize-images.sh   Copies images off Framer (see step 0)
```

---

## Step 0 — Move the images off Framer (do this before cancelling Framer)

Right now the pages load images (logos, project screenshots, avatars) from Framer's image server. They will keep working while your Framer project exists, but if you delete it they could disappear. On your Mac:

1. Unzip `celementa-site.zip`.
2. Open **Terminal**, type `cd ` (with a space), drag the `celementa-site` folder into the window, press Enter.
3. Run: `bash tools/localize-images.sh`

All images are downloaded into `assets/img/` and every page is updated to use them. Then continue with step 1.

---

## Step 1 — Create the repository (free GitHub account)

1. Sign in at github.com (or create a free account).
2. Top right **+** → **New repository**.
3. Name it e.g. `celementa-website`, set it to **Public** (GitHub Pages is free for public repos), click **Create repository**.

## Step 2 — Upload the files

1. On the new repo page click **uploading an existing file**.
2. Open the `celementa-site` folder, select **everything inside it** (not the folder itself) and drag it into the browser. Folders are kept.
3. Click **Commit changes**.

> Check that `index.html` sits at the top level of the repo, next to the `assets`, `works` and `contact` folders.

## Step 3 — Turn on GitHub Pages

1. Repo → **Settings** → **Pages** (left menu).
2. **Source:** *Deploy from a branch* → Branch **main**, folder **/ (root)** → **Save**.
3. After 1–2 minutes the site is live at `https://<your-username>.github.io/celementa-website/`. Click through it to check.

## Step 4 — Activate the contact form (one-time)

The form is sent by **FormSubmit.co** (free, no account) to **sergei@celementa.com** with the subject **RE [Form Celementa website]**.

1. On the live site, open **Contact** and submit a test message.
2. FormSubmit emails **sergei@celementa.com** a confirmation ("Action required: activate form"). Click **Activate Form**. Check spam if you don't see it.
3. Submit again — this time the message lands in the inbox, with name, email, phone, message and page URL in a table. "Reply" goes straight to the sender.

Optional (less spam): the activation email also gives you a random string that replaces the address. In `assets/js/main.js` change
`const FORM_EMAIL = "sergei@celementa.com";` to `const FORM_EMAIL = "your-random-string";`.
The subject line can be changed on the line below it.

## Step 5 — Point celementa.com to GitHub

1. In **Framer**, remove/disconnect the custom domain celementa.com (so it no longer claims it).
2. GitHub repo → **Settings → Pages → Custom domain** → enter `celementa.com` → **Save** (this adds a `CNAME` file to the repo automatically).
3. At your domain registrar (where celementa.com's DNS is managed), set:

| Type  | Name / Host | Value |
|-------|-------------|-------|
| A     | @           | 185.199.108.153 |
| A     | @           | 185.199.109.153 |
| A     | @           | 185.199.110.153 |
| A     | @           | 185.199.111.153 |
| CNAME | www         | `<your-username>.github.io` |

   Delete any old A/CNAME records that pointed to Framer. **Don't touch MX / TXT records** — those run your email.
4. Wait for DNS (minutes to a few hours). Back in **Settings → Pages**, tick **Enforce HTTPS** once it becomes available.

URLs stay the same as on Framer (`/works`, `/contact`, `/works/zentro` …), so your existing SEO and links keep working. Afterwards, resubmit `https://celementa.com/sitemap.xml` in Google Search Console.

---

## Editing later

- **Text:** open the `.html` file on GitHub → pencil icon → edit → **Commit changes**. Live in ~1 minute.
- **Colors:** top of `assets/css/style.css` (`--blue`, `--orange`, `--cream` …).
- **Stats numbers:** in `index.html`, search for `data-count` (e.g. `data-count="135"`); change both the attribute and the text next to it.
- **Social links:** in the footer of each page they still point to the generic Behance / Instagram / X homepages (same as the Framer site) — replace with your real profile URLs.
