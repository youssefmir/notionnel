const root = document.documentElement;
const toggle = document.getElementById('theme-switch');
function themeLabel() {
  toggle?.setAttribute(
    'aria-label',
    root.dataset.theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre',
  );
}
themeLabel();
toggle?.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try {
    localStorage.setItem('notionnel:theme', root.dataset.theme);
  } catch {
    /* Session-only in private storage. */
  }
  themeLabel();
});
const sidebar = document.querySelector('.sidebar');
const canvas = document.querySelector('.canvas');
const open = document.getElementById('mobile-open');
const close = document.getElementById('mobile-close');
const scrim = document.getElementById('scrim');
const mobile = matchMedia('(max-width: 860px)');
function menu(on, restore = true) {
  root.classList.toggle('menu-open', on);
  scrim.hidden = !on;
  open.setAttribute('aria-expanded', String(on));
  sidebar.inert = mobile.matches && !on;
  canvas.inert = on;
  if (on) close.focus();
  else if (restore && mobile.matches) open.focus();
}
menu(false, false);
open.addEventListener('click', () => menu(true));
close.addEventListener('click', () => menu(false));
scrim.addEventListener('click', () => menu(false));
mobile.addEventListener('change', () => menu(false, false));
document.addEventListener('keydown', (e) => {
  if (!root.classList.contains('menu-open')) return;
  if (e.key === 'Escape') menu(false);
  if (e.key !== 'Tab') return;
  const links = [...sidebar.querySelectorAll('a[href],button')].filter((el) => el.offsetWidth > 0);
  if (e.shiftKey && document.activeElement === links[0]) {
    e.preventDefault();
    links.at(-1).focus();
  } else if (!e.shiftKey && document.activeElement === links.at(-1)) {
    e.preventDefault();
    links[0].focus();
  }
});
