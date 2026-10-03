/* Полноэкранный коллаж: кусочки из data/collage.js + лёгкое «расползание» от мыши. */
import { collage } from '../data/collage.js';
import { site } from '../data/site.js';
import { doodles, txt, isMobile, isTouch, reduceMotion, willowSrc, WILLOW_AR } from './utils.js';

const RATIO = {}; // соотношения сторон кусочков — чтобы место резервировалось до загрузки

function pieceHTML(p, i, mobile) {
  const pos = mobile ? p.m : p;
  if (mobile && p.m === false) return '';
  const style = `left:${pos.x}%;top:${pos.y}%;width:${pos.w}%;--r:${p.r || 0}deg;--f:${p.f ?? .6};--s:${p.s ?? .1};--i:${i};z-index:${p.z || 1}`;
  const type = p.type || 'piece';
  if (type === 'piece') {
    const eager = p.src === 'portrait';
    return `<img class="cp cp--piece" src="/src/assets/collage/${p.src}.webp" alt="${p.alt || ''}" ${p.alt ? '' : 'aria-hidden="true"'} decoding="async" ${eager ? 'fetchpriority="high"' : ''} style="${style}">`;
  }
  if (type === 'element') return `<img class="cp cp--el" src="/src/assets/elements/${p.src}.webp" alt="" aria-hidden="true" decoding="async" style="${style}">`;
  if (type === 'willow') return `<span class="cp cp--willow willow-mask" aria-hidden="true" style="${style};aspect-ratio:${WILLOW_AR[p.src]};--c:${p.color || '#fff'};--src:url('${willowSrc(p.src)}')"></span>`;
  if (type === 'doodle') return `<span class="cp cp--doodle" aria-hidden="true" style="${style};color:${p.color || 'currentColor'}">${doodles[p.src] || ''}</span>`;
  if (type === 'note') return `<div class="cp cp--note" style="${style};background-image:url('/src/assets/collage/${p.src}.webp')"><p class="note__text">${txt(site.introText, 'introText — авторская фраза (site.js)')}</p></div>`;
  return '';
}

export function initCollage(frame) {
  let mobile = null;
  const render = () => {
    const m = isMobile();
    if (m === mobile) return;
    mobile = m;
    frame.innerHTML = collage.map((p, i) => pieceHTML(p, i, m)).join('');
  };
  render();
  matchMedia('(max-width: 760px)').addEventListener('change', render);

  // появление: кусочки «ложатся» на стол по очереди
  const land = () => requestAnimationFrame(() => frame.classList.add('is-landed'));

  if (reduceMotion()) { frame.classList.add('is-landed', 'is-static'); return { land: () => {} }; }

  // движение: мышь → слои смещаются с разной силой; прокрутка → слои разъезжаются
  const AMP = 11;             // максимальный сдвиг в px для слоя с f = 1
  let tx = 0, ty = 0, x = 0, y = 0, sy = 0, visible = true, raf = 0;
  const tick = () => {
    x += (tx - x) * 0.06; y += (ty - y) * 0.06;
    const nsy = Math.min(scrollY, innerHeight * 1.2);
    frame.style.setProperty('--mx', x.toFixed(2));
    frame.style.setProperty('--my', y.toFixed(2));
    frame.style.setProperty('--sy', nsy.toFixed(1));
    const moving = Math.abs(tx - x) + Math.abs(ty - y) > 0.02 || nsy !== sy;
    sy = nsy;
    raf = moving && visible ? requestAnimationFrame(tick) : 0;
  };
  const wake = () => { if (!raf && visible) raf = requestAnimationFrame(tick); };
  if (!isTouch()) {
    addEventListener('pointermove', e => {
      tx = (e.clientX / innerWidth - 0.5) * 2 * AMP;
      ty = (e.clientY / innerHeight - 0.5) * 2 * AMP;
      wake();
    }, { passive: true });
  }
  addEventListener('scroll', wake, { passive: true });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; wake(); }).observe(frame);
  return { land };
}
