# fransevillano.com

Personal site and blog, built with [Astro](https://astro.build) and hosted on GitHub Pages.

## Writing a post

Add a Markdown file to `src/content/posts/`:

```md
---
title: "Post title"
date: 2026-11-01T09:00:00
slug: "post-title"
---

Post body in Markdown.
```

The post is published at `/YYYY/MM/DD/slug/`, the same URL shape the old WordPress site used.

## Running locally

```bash
npm install
npm run dev
```

## Publishing

Pushing to `main` builds and deploys the site through `.github/workflows/deploy.yml`.

## Drafts

Unpublished WordPress drafts are in `drafts/`, which is git-ignored so they never reach the public repo. To publish one, move it into `src/content/posts/`.
