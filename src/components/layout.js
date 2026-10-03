/* Общие части страниц: навигация, верхняя панель внутренних страниц, подвал. */
import { site } from '../data/site.js';
import { esc, txt, willowSrc } from './utils.js';

const UNDERLINE = '<svg viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true"><path d="M2 5 C30 2 60 7 98 3"/></svg>';

export function navLinks(current = '') {
  return `<ul class="navlinks">${site.nav.map(n => {
    const isCur = current && n.href.startsWith('/' + current);
    return `<li><a href="${esc(n.href)}"${isCur ? ' aria-current="page"' : ''}>${esc(n.label)}${UNDERLINE}</a></li>`;
  }).join('')}</ul>`;
}

/** Верхняя панель страниц DESIGN и ART: «на главную», навигация, логотип */
export function renderSitebar(el, current) {
  el.innerHTML = `
    <a class="sitebar__back" href="/"><img src="/src/assets/symbols/prev.webp" alt="" width="56" height="36">${esc(site.backHome)}</a>
    <nav aria-label="Основная навигация">${navLinks(current)}</nav>
    <a class="sitebar__logo" href="/" aria-label="KARMASH — на главную"><img src="/src/assets/logo/logo-black.svg" alt="KARMASH" width="93" height="21"></a>`;
}

/** Подвал — один на весь сайт */
export function renderFooter(el) {
  const c = site.contact;
  el.classList.add('footer', 'on-dark');
  el.innerHTML = `
    <div class="wrap">
      <div class="footer__grid" data-decor="footer">
        <div class="footer__brand">
          <a href="/" aria-label="KARMASH — на главную"><img class="footer__logo" src="/src/assets/logo/logo-white.svg" alt="KARMASH" width="93" height="21"></a>
          <p class="footer__big"><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></p>
        </div>
        <nav class="footer__col" aria-label="Навигация в подвале">
          <h2>${esc(site.footer.navTitle)}</h2>
          <ul>${site.nav.map(n => `<li><a href="${esc(n.href)}">${esc(n.label)}</a></li>`).join('')}</ul>
        </nav>
        <div class="footer__col">
          <h2>${esc(site.footer.contactTitle)}</h2>
          <ul>
            <li><a href="${esc(c.phoneHref)}">${esc(c.phone)}</a></li>
            ${c.socials.map(s => `<li><a href="${esc(s.href)}" target="_blank" rel="noopener">${esc(s.label)}</a></li>`).join('')}
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <span class="footer__line" aria-hidden="true"></span>
        <span>© ${new Date().getFullYear()} KARMASH</span>
        <a href="#top">${esc(site.footer.toTop)} ↑</a>
      </div>
    </div>
    <span class="footer__willow willow-mask" style="--src:url('${willowSrc('branch-03')}')" aria-hidden="true"></span>`;
  const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect(); } }, { threshold: 0.2 });
  io.observe(el);
}

/** Подставляет тексты из site.js в элементы с data-text="ключ" */
export function fillText(root = document) {
  root.querySelectorAll('[data-text]').forEach(node => {
    const key = node.dataset.text.split('.');
    let v = site; key.forEach(k => { v = v?.[k]; });
    node.innerHTML = txt(v, node.dataset.hint || 'впишите текст в src/data/site.js');
  });
}
