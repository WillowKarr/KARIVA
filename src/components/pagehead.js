/* Шапка страниц DESIGN и ART — отдельный «журнальный» коллаж-объект. */
import { esc, txt, seeded, willowSrc, WILLOW_AR } from './utils.js';

const HEAD = {
  design: [
    ['piece-41', 58, 2, 22, 2], ['piece-47', 70, 30, 30, -2], ['piece-37', 52, 52, 24, 1.5],
    ['piece-16', 88, -6, 10, -3], ['piece-05', 80, 62, 14, 2.5],
  ],
  art: [
    ['piece-29', 60, 4, 20, -2], ['piece-21', 76, 20, 9, 3], ['piece-19', 52, 58, 30, -1.5],
    ['piece-44', 84, 48, 18, 2], ['piece-43', 66, 34, 13, -3],
  ],
};

export function pageHead(kind, page) {
  const pieces = HEAD[kind].map(([s, x, y, w, r], i) =>
    `<img class="phead__piece" src="/src/assets/collage/${s}.webp" alt="" style="left:${x}%;top:${y}%;width:${w}%;--r:${r}deg;--i:${i}">`).join('');
  let extra = '';
  if (kind === 'art') {
    extra = ['branch-04', 'branch-08'].map((b, i) =>
      `<span class="phead__willow willow-mask" style="--src:url('${willowSrc(b)}');aspect-ratio:${WILLOW_AR[b]};${i ? 'right:2%;top:-8%;width:9%;transform:rotate(14deg) scaleX(-1)' : 'left:44%;top:-12%;width:10%;transform:rotate(-10deg)'}"></span>`).join('');
  } else {
    const rnd = seeded(9);
    extra = `<span class="phead__digits" aria-hidden="true">${Array.from({ length: 12 }, () =>
      Array.from({ length: 8 }, () => Math.floor(rnd() * 10)).join('')).join('<br>')}</span>`;
  }
  return `
    <div class="phead__collage" aria-hidden="true">${pieces}${extra}</div>
    <h1 class="phead__title" id="page-title">${esc(page.title)}</h1>
    <p class="phead__desc">${txt(page.description, `${kind}Page.description — описание раздела (site.js)`)}</p>`;
}
