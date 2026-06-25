# Massa Baali — Academic Portfolio

A modern, research-focused academic website for Massa Baali, PhD researcher at Carnegie Mellon University (Language Technologies Institute), advised by Bhiksha Raj.

**Live site:** https://massabaali7.github.io/

## Highlights

- **Static, dependency-free** — plain HTML, CSS, and vanilla JS. No build step, no framework. Loads fast and is trivial to host.
- **Dark / light mode** with persisted preference.
- **Signature visual identity** — an animated spectrogram hero and per-project waveform visuals, drawn from the speech/audio research domain.
- **Publications** — client-side search, topic filtering, sorting, and one-click BibTeX export.
- **Markdown blog** — posts authored in Markdown (`blog/posts/*.md`), rendered client-side with reading-time estimates and a reading-progress bar.
- **Filterable news timeline**, **embedded CV viewer**, and a **contact** hub.
- **SEO** — per-page titles/descriptions, Open Graph tags, JSON-LD `Person` schema, `sitemap.xml`, and `robots.txt`.
- **Accessible** — semantic landmarks, skip link, visible focus states, keyboard-operable menu/modal, and `prefers-reduced-motion` support.

## Structure

```
.
├── index.html              # Home
├── about.html              # Bio, education, experience, skills
├── research.html           # Filterable project cards
├── publications.html       # Search / filter / sort / BibTeX
├── teaching.html           # Courses, mentorship, service
├── blog.html               # Blog index (search)
├── post.html               # Single-post renderer (?slug=…)
├── news.html               # Filterable timeline
├── cv.html                 # Embedded + downloadable CV
├── contact.html            # Contact + links
├── 404.html
├── assets/
│   ├── css/main.css        # Design system (tokens, components)
│   ├── js/site.js          # Theme, nav, reveal, helpers
│   ├── js/publications-data.js
│   ├── js/blog-data.js
│   ├── js/news-data.js
│   └── img/headshot*.jpg
├── blog/posts/*.md         # Blog content (also embedded in blog-data.js)
├── cv/Massa_Baali_CV.pdf
├── sitemap.xml · robots.txt · .nojekyll
└── .github/workflows/deploy.yml
```

## Editing content

- **Publications:** edit `assets/js/publications-data.js`. Each entry drives the publications page, the home "featured" list, and BibTeX export.
- **News:** edit `assets/js/news-data.js`.
- **Blog:** add a Markdown file under `blog/posts/`, then add an entry to `assets/js/blog-data.js`. Paste the post text into the `body` field so it renders without a server (the `file` path is a fallback).
- **CV:** replace `cv/Massa_Baali_CV.pdf`.
- **Headshot:** replace `assets/img/headshot.jpg` (and the `@2x` version).

### Adding a paper figure

Each publication entry supports an optional figure that renders inside the card. The fields are already filled in for the main papers, pointing at `assets/img/papers/<id>.png` — you just need to drop the image in.

1. Open the paper's HTML on arXiv (e.g. `https://arxiv.org/html/2506.09375`), right-click **Figure 1** → *Save image as*, or screenshot and crop it from the PDF.
2. Save it as `assets/img/papers/<id>.png` — e.g. `colmbo.png`, `caarma.png`, `sveritas.png`, `delulu.png`, `pdaf.png` (the `id` is the `id:` field in `publications-data.js`).
3. That's it — the figure appears automatically with its caption. If the file is missing, the card simply hides the figure (no broken image), so it's safe to add them one at a time.

To change a caption or alt text, edit the `figureCaption` / `figureAlt` fields on that entry.

### Adding a photo to a news entry

Any entry in `assets/js/news-data.js` can include a photo:

```javascript
{ date: "Summer 2025", type: "talk",
  photo: "assets/img/jsalt_talk_full.jpg",
  photoAlt: "Short description of the photo",
  photoCaption: "Optional caption shown under the image",   // optional
  html: "Your news text, with <b>bold</b> and <a href='...'>links</a>." }
```

## Deployment (GitHub Pages)

This repo ships with a GitHub Actions workflow that publishes the site automatically.

1. Create a repo named **`massabaali7.github.io`** (a user site, served at the domain root). If you use a different repo name, the site will live at `https://<user>.github.io/<repo>/` and you should make internal links relative (they already are) — but the absolute URLs in `sitemap.xml`, the canonical tags, and JSON-LD should be updated to match.
2. Push this directory's contents to the `main` branch.
3. In the repo: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. The `Deploy to GitHub Pages` workflow runs on every push to `main`; the live URL appears in the workflow summary.

> `.nojekyll` is included so GitHub Pages serves the `assets/` directory as-is rather than running Jekyll.

## License

Content © Massa Baali. Code is free to reuse with attribution.
