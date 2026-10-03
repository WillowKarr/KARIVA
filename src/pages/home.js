/* Главная страница: собирает блоки из данных в src/data/. */
import { site } from '../data/site.js';
import { esc, txt, doodles, handButton, willowSrc, WILLOW_AR } from '../components/utils.js';
import { navLinks, renderFooter, fillText } from '../components/layout.js';
import { initCollage } from '../components/collage.js';
import { initTimeline } from '../components/timeline.js';
import { renderTicker, renderPrograms } from '../components/skills.js';
import { initDecor, initReveal, initCursor, initTransitions, initMoods, finishPreloader } from '../components/effects.js';

const $ = (s) => document.querySelector(s);

/* ---- шапка ---- */
$('[data-nav]').innerHTML = navLinks();
const tick = site.ticker.map(t => `<span>${esc(t)}</span><i>${doodles.sparkle}</i>`).join('');
$('[data-ticker]').innerHTML = tick.repeat(8);

const [first, ...rest] = site.heroTitle;
$('[data-hero-title]').innerHTML = `<span>${esc(first)}</span><span class="hero__star" aria-hidden="true">${doodles.star}</span><span>${esc(rest.join(' '))}</span>`;
$('[data-hero-cta]').innerHTML =
  handButton({ ...site.buttons.art, variant: 'art', seed: 5, attrs: 'data-transition="art" data-mood="art"' }) +
  handButton({ ...site.buttons.design, variant: 'design', seed: 9, attrs: 'data-transition="design" data-mood="design"' });
fillText();

const collage = initCollage($('[data-collage]'));

/* ---- обо мне ---- */
const ab = site.about;
$('[data-about-title]').textContent = ab.title;
const photo = $('[data-about-photo]'); photo.src = ab.photo; photo.alt = ab.photoAlt;
$('[data-about-text]').innerHTML = ab.paragraphs.map(p => `<p>${esc(p)}</p>`).join('');
$('[data-about-facts]').innerHTML = ab.facts.length
  ? `<h3 class="t-hand">${esc(ab.factsTitle)}</h3><ul>${ab.facts.map(f => `<li>${esc(f)}</li>`).join('')}</ul>`
  : (site.showPlaceholders ? `<h3 class="t-hand">${esc(ab.factsTitle)}</h3><p>${txt('', 'about.facts — дополнительные факты (site.js)')}</p>` : '');
$('[data-career-title]').textContent = site.careerTitle;
initTimeline($('[data-timeline]'));

/* ---- навыки и программы ---- */
$('[data-skills-title]').textContent = site.skillsTitle;
renderTicker($('[data-skills-ticker]'));
$('[data-programs-title]').textContent = site.programsTitle;
renderPrograms($('[data-programs]'));

/* ---- два альбомных листа ART / DESIGN ---- */
const mini = {
  art: [
    ['piece-29', 6, 14, 30, -3], ['piece-19', 40, 8, 52, 2], ['piece-21', 64, 30, 14, -2],
    ['piece-43', 30, 42, 22, 3], ['piece-32', 50, 58, 22, -2], ['piece-44', -4, 58, 34, 2], ['piece-30', 70, 74, 34, 2],
  ],
  design: [
    ['piece-41', 4, 8, 34, 2], ['piece-47', 42, 6, 48, -2], ['piece-14', 70, 30, 22, 3],
    ['piece-37', 24, 50, 34, -1], ['piece-05', 60, 64, 22, 2], ['piece-16', -2, 44, 18, -3],
  ],
};
function albumMedia(key, a) {
  if (a.image) return `<img class="album__img" src="${esc(a.image)}" alt="" loading="lazy">`;
  const pieces = mini[key].map(([src, x, y, w, r]) =>
    `<img class="album__piece" src="/src/assets/collage/${src}.webp" alt="" loading="lazy" style="left:${x}%;top:${y}%;width:${w}%;--r:${r}deg">`).join('');
  const extra = key === 'art'
    ? `<span class="album__willow willow-mask" style="--src:url('${willowSrc('branch-02')}');aspect-ratio:${WILLOW_AR['branch-02']}"></span>`
    : `<span class="album__grid"></span>`;
  return `<div class="album__collage" aria-hidden="true">${pieces}${extra}</div>`;
}
$('[data-albums]').innerHTML = ['art', 'design'].map((key, i) => {
  const a = site.albums[key];
  return `<a class="album album--${key} reveal" style="--rr:${i ? .8 : -.8}deg" href="${esc(a.href)}" data-transition="${key}" data-mood="${key}">
    <span class="tape tape--l" aria-hidden="true"></span><span class="tape tape--r" aria-hidden="true"></span>
    <div class="album__media">${albumMedia(key, a)}</div>
    <div class="album__label">
      <span class="album__title">${esc(a.title)}</span>
      <span class="album__caption">${txt(a.caption, `albums.${key}.caption — подпись (site.js)`)}</span>
      <img class="album__go" src="/src/assets/symbols/next.webp" alt="" width="56" height="36">
    </div>
    <span class="album__page" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
  </a>`;
}).join('');

/* ---- контакты ---- */
const c = site.contact;
$('[data-contact]').innerHTML = `
  <h2 class="section-title contact__title reveal" id="contact-title">${esc(c.title)}</h2>
  <div class="contact__body reveal" style="--rd:120ms">
    <a class="contact__email" href="mailto:${esc(c.email)}">${esc(c.email)}</a>
    <a class="contact__phone" href="${esc(c.phoneHref)}">${esc(c.phone)}</a>
    <ul class="contact__socials">${c.socials.map((s, i) => `<li style="--r:${[-2, 1.5, -1][i % 3]}deg"><a href="${esc(s.href)}" target="_blank" rel="noopener">${esc(s.label)}</a></li>`).join('')}</ul>
    <div class="contact__btn">${handButton({ label: c.button, href: `mailto:${c.email}`, variant: 'design', small: true, seed: 17 })}</div>
  </div>`;

renderFooter($('[data-footer]'));

/* ---- движение ---- */
initDecor();
initReveal();
initCursor();
initTransitions();
initMoods([...document.querySelectorAll('[data-mood]')]);
finishPreloader().then(() => collage.land());
