/* Мелкие помощники: безопасный текст, пометки-плейсхолдеры, «рукотворные» SVG. */
import { site } from '../data/site.js';

export const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isTouch = () => matchMedia('(hover: none), (pointer: coarse)').matches;
export const isMobile = () => matchMedia('(max-width: 760px)').matches;

export const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Текст или карандашная пометка «впишите…», если поле пустое */
export function txt(value, hint) {
  if (value && String(value).trim()) return esc(value);
  return site.showPlaceholders ? `<span class="ph">✎ ${esc(hint)}</span>` : '';
}

/** Детерминированный «случайный» генератор: одинаковый результат при каждой загрузке */
export function seeded(seed = 1) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Неровный прямоугольник со скруглением — контур «от руки» */
export function roughRect(w, h, r, seed, jit = 1.6) {
  const rnd = seeded(seed);
  const j = () => (rnd() - 0.5) * 2 * jit;
  const pts = [];
  const side = (x1, y1, x2, y2, n) => {
    for (let i = 0; i < n; i++) {
      const t = i / n;
      pts.push([x1 + (x2 - x1) * t + j(), y1 + (y2 - y1) * t + j()]);
    }
  };
  side(r, 0, w - r, 0, 5); pts.push([w - r * .3 + j(), r * .3 + j()]);
  side(w, r, w, h - r, 3); pts.push([w - r * .3 + j(), h - r * .3 + j()]);
  side(w - r, h, r, h, 5); pts.push([r * .3 + j(), h - r * .3 + j()]);
  side(0, h - r, 0, r, 3); pts.push([r * .3 + j(), r * .3 + j()]);
  // сглаживаем через середины отрезков
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let d = `M${mid(pts[pts.length - 1], pts[0]).map(n => n.toFixed(1)).join(' ')}`;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i], m = mid(p, pts[(i + 1) % pts.length]);
    d += ` Q${p[0].toFixed(1)} ${p[1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`;
  }
  return d + 'Z';
}

/** Кнопка с нарисованным контуром. Используется для ART / DESIGN и «Связаться». */
export function handButton({ label, href, variant = 'design', small = false, seed = 3, attrs = '' }) {
  const W = 200, H = 64;
  return `<a class="hbtn hbtn--${variant}${small ? ' hbtn--small' : ''}" href="${esc(href)}" ${attrs}>
    <svg viewBox="-4 -4 ${W + 8} ${H + 8}" preserveAspectRatio="none" aria-hidden="true">
      <path class="hb-fill" d="${roughRect(W, H, 12, seed, 1.4)}"/>
      <path class="hb-ring hb-ring--a" d="${roughRect(W, H, 12, seed + 11, 2.2)}"/>
      <path class="hb-ring hb-ring--b" d="${roughRect(W - 6, H - 6, 10, seed + 23, 2)}" transform="translate(3 3)"/>
    </svg>
    <span class="hbtn__label">${esc(label)}</span>
  </a>`;
}

/* ---------- библиотека рисованных знаков ---------- */
const S = 'fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"';
export const doodles = {
  star: `<svg viewBox="0 0 60 60" ${S} stroke-width="1.6"><path d="M30 2 L31 58"/><path d="M3 29 L57 31"/><path d="M12 11 L48 48"/><path d="M49 12 L11 49"/><path d="M30 20 C31 26 34 29 40 30 C34 31 31 34 30 40 C29 34 26 31 20 30 C26 29 29 26 30 20Z" fill="currentColor"/></svg>`,
  sparkle: `<svg viewBox="0 0 24 24"><path d="M12 0 C12.8 8 15.5 11 24 12 C15.5 13 12.8 16 12 24 C11.2 16 8.5 13 0 12 C8.5 11 11.2 8 12 0Z" fill="currentColor"/></svg>`,
  asterisk: `<svg viewBox="0 0 40 40" ${S} stroke-width="2.4"><path d="M20 3 L20.5 37"/><path d="M5 11 L35 29"/><path d="M35 10 L5 30"/></svg>`,
  arrow: `<svg viewBox="0 0 120 40" ${S} stroke-width="1.8"><path d="M3 30 C28 22 54 28 78 18 C92 12 104 14 114 10"/><path d="M101 3 L115 10 L104 21"/></svg>`,
  cross: `<svg viewBox="0 0 24 24" ${S} stroke-width="2"><path d="M4 3 L20 21"/><path d="M20 4 L4 20"/></svg>`,
  underline: `<svg viewBox="0 0 220 16" ${S} stroke-width="2.2"><path d="M3 11 C40 5 80 13 120 7 C150 3 180 10 217 6"/></svg>`,
  loop: `<svg viewBox="0 0 220 110" ${S} stroke-width="2"><path d="M40 58 C18 30 70 8 120 10 C180 12 214 40 196 70 C178 100 90 108 44 88 C12 74 20 40 60 26 C100 14 170 20 186 44"/></svg>`,
  tick: `<svg viewBox="0 0 30 30" ${S} stroke-width="2.4"><path d="M3 16 L11 25 L27 4"/></svg>`,
};

/** Длины путей для анимации «дорисовки» */
export function measurePaths(root) {
  root.querySelectorAll('path').forEach(p => {
    try { const l = Math.ceil(p.getTotalLength()) + 2; p.style.setProperty('--len', l); } catch (e) { /* noop */ }
  });
}

export const willowSrc = (name) => `/src/assets/willow/${name}.webp`;
export const WILLOW_AR = {
  'branch-01': '538 / 818', 'branch-02': '588 / 390', 'branch-03': '268 / 734', 'branch-04': '282 / 666',
  'branch-05': '540 / 340', 'branch-06': '260 / 612', 'branch-07': '222 / 636', 'branch-08': '204 / 606', 'branch-09': '192 / 582',
};
