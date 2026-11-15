// Check the generated site itself, including chapter headings and glossary anchors.
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';

const dist = path.resolve('dist');
const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');
const site = 'https://notionnel.invalid';
const files = (await readdir(dist, { recursive: true })).filter((name) => name.endsWith('.html'));
const pages = new Map();
for (const file of files) {
  const $ = load(await readFile(path.join(dist, file), 'utf8'));
  const ids = $('[id]')
    .map((_, el) => $(el).attr('id'))
    .get();
  if (new Set(ids).size !== ids.length) throw Error('Ancre dupliquée dans ' + file);
  pages.set(file, { $, ids: new Set(ids) });
}
const errors = [];
for (const [file, { $ }] of pages) {
  const from = site + base + '/' + file.replace(/index\.html$/, '');
  for (const el of $('a[href],link[href],script[src],img[src]').toArray()) {
    const ref = $(el).attr('href') ?? $(el).attr('src');
    const url = new URL(ref, from);
    if (url.origin !== site) continue;
    if (!url.pathname.startsWith(base + '/')) {
      errors.push(file + ': chemin hors du site ' + ref);
      continue;
    }
    let local = decodeURIComponent(url.pathname.slice(base.length + 1));
    if (!local || local.endsWith('/')) local += 'index.html';
    if (pages.has(local)) {
      if (url.hash && !pages.get(local).ids.has(decodeURIComponent(url.hash.slice(1))))
        errors.push(file + ': ancre absente ' + ref);
    } else if (
      !(await stat(path.join(dist, local))
        .then((s) => s.isFile())
        .catch(() => false))
    )
      errors.push(file + ': fichier absent ' + ref);
  }
}
if (errors.length) throw Error(errors.join('\n'));
console.log(files.length + ' pages vérifiées : liens, ressources et ancres internes valides.');
