import { getCollection, type CollectionEntry } from 'astro:content';

export type Codigo = CollectionEntry<'codigos'>;

// Set CODIGOS_PREVIEW=1 when building locally to see drafts (entries with no code or link).
const showDrafts = import.meta.env.CODIGOS_PREVIEW === '1';

export const isDraft = (c: Codigo) => !c.data.code && !c.data.link;

export async function getCodigos() {
  const all = await getCollection('codigos');
  return all
    .filter((c) => showDrafts || !isDraft(c))
    .sort((a, b) => a.data.name.localeCompare(b.data.name, 'es'));
}

export const codigoPath = (c: Codigo) => `/codigos/${c.id}/`;

export function fechaLarga(date: Date) {
  return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

export function mesAno(date: Date) {
  return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', timeZone: 'UTC' });
}
