// Enrich author-written Markdown during generation; no client-side parser.
export function learningMarkdown({ base = '/' } = {}) {
  const prefix = base.replace(/\/$/, '');
  return (tree) => {
    const visit = (node) => {
      if (node.type === 'link' && node.url.startsWith('glossaire:')) {
        const id = node.url.slice('glossaire:'.length);
        if (!/^[a-z0-9-]+$/.test(id)) throw Error('Identifiant de glossaire invalide : ' + id);
        node.url = prefix + '/glossaire/#' + id;
        node.data = { ...node.data, hProperties: { 'data-term': id } };
      }
      if (node.type === 'blockquote') {
        const first = node.children?.[0]?.children?.[0];
        if (first?.type === 'strong') {
          const label = first.children?.[0]?.value || '';
          const type = label.startsWith('Analogie')
            ? 'analogy'
            : label.startsWith('À retenir')
              ? 'takeaway'
              : null;
          if (type) node.data = { ...node.data, hProperties: { className: ['callout', type] } };
        }
      }
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}
