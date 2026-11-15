import { getCollection } from 'astro:content';
export const pathTo = (path = '') =>
  import.meta.env.BASE_URL.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
export const modulePath = (slug: string) => pathTo('modules/' + slug + '/');
export async function catalog() {
  const modules = (await getCollection('modules')).sort((a, b) => a.data.id - b.data.id);
  if (
    new Set(modules.map((m) => m.data.id)).size !== modules.length ||
    new Set(modules.map((m) => m.data.slug)).size !== modules.length
  )
    throw Error('Chaque module doit avoir un numéro et une adresse uniques.');
  return modules;
}
export const labels: Record<number, { short: string; name: string; desc: string; category: string }> = {
  1: {
    short: 'Les sous-jacents',
    name: 'Les fondamentaux',
    desc: 'Actions, obligations, devises… Que possède-t-on vraiment quand on achète un actif ?',
    category: 'Les bases',
  },
  2: {
    short: 'Les produits dérivés',
    name: 'Les produits dérivés',
    desc: 'Comprendre comment un contrat peut protéger un prix ou permettre de prendre un risque.',
    category: 'Les bases',
  },
  3: {
    short: 'Les contrats à terme',
    name: 'Les contrats à terme',
    desc: 'Du champ de blé au fournil, fixer aujourd’hui le prix d’un échange futur.',
    category: 'Les contrats',
  },
  4: {
    short: 'Les options',
    name: 'Les options',
    desc: 'Acheter un droit, payer une prime et découvrir comment lire une courbe de résultat.',
    category: 'Les contrats',
  },
  5: {
    short: 'Les swaps',
    name: 'Les swaps',
    desc: 'Échanger des paiements pour passer d’un taux variable à un taux fixe ou changer de devise.',
    category: 'Les contrats',
  },
  6: {
    short: 'La gestion des risques',
    name: 'La gestion des risques',
    desc: 'Explorer la volatilité et les sensibilités d’une option, sans commencer par une équation.',
    category: 'Les risques',
  },
};
export const pad = (n: number) => String(n).padStart(2, '0');
