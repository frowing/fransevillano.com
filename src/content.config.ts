import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    slug: z.string(),
    description: z.string().optional(),
  }),
});

// Referral codes for the Spanish /codigos/ section. One file per app.
// An entry with no code and no link is a draft and gets no page.
const codigos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/codigos' }),
  schema: z.object({
    name: z.string(),
    category: z.string(),
    code: z.string().default(''),
    link: z.string().default(''),
    // Shown in the page title and the list: what the visitor gets
    headline: z.string(),
    rewardUser: z.string(),
    rewardSharer: z.string(),
    conditions: z.array(z.string()),
    officialUrl: z.string(),
    verified: z.coerce.date(),
  }),
});

export const collections = { posts, codigos };
