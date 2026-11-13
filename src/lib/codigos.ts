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

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** The list line: the blurb with **bold** turned into <strong>, or the headline if there is no blurb. */
export function blurbHtml(c: Codigo) {
  const text = c.data.blurb || `${c.data.headline}.`;
  return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

/** The most recent check across all codes, for the list footer. */
export function ultimaRevision(codigos: Codigo[]) {
  return new Date(Math.max(...codigos.map((c) => c.data.verified.getTime())));
}
