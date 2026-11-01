import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

const pad = (n: number) => String(n).padStart(2, '0');

// Same shape as the old WordPress permalinks: /YYYY/MM/DD/slug/
export function postPath(post: Post) {
  const d = post.data.date;
  return `/${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${post.data.slug}/`;
}

export async function getPosts() {
  const posts = await getCollection('posts');
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
