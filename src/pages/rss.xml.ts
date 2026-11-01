import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postPath } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: 'Fran Sevillano',
    description: 'Writing about product management, health and habits.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: postPath(post),
    })),
  });
}
