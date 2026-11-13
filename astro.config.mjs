import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// lastmod for the /codigos/ pages: the date each code was last checked by hand
const codigosDir = new URL('./src/content/codigos/', import.meta.url);
const verified = {};
for (const file of readdirSync(codigosDir).filter((f) => f.endsWith('.md'))) {
  const text = readFileSync(new URL(file, codigosDir), 'utf8');
  const date = text.match(/^verified:\s*(\S+)/m)?.[1];
  if (date) verified[`/codigos/${file.replace(/\.md$/, '')}/`] = date;
}
const latest = Object.values(verified).sort().at(-1);

export default defineConfig({
  site: 'https://fransevillano.com',
  // WordPress URLs end in a slash (/2018/02/04/post-name/), so keep them identical
  trailingSlash: 'always',
  integrations: [
    sitemap({
      serialize(item) {
        const path = new URL(item.url).pathname;
        const date = path === '/codigos/' ? latest : verified[path];
        if (date) item.lastmod = new Date(date).toISOString();
        return item;
      },
    }),
  ],
});
