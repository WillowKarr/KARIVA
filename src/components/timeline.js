/* Карьерный путь в виде ветки ивы.
   Ветка дорисовывается при прокрутке, на каждой «почке» распускаются листья
   и приклеивается бумажная заметка. Данные — src/data/career.js. */
import { career } from '../data/career.js';
import { esc, seeded, reduceMotion, isMobile } from './utils.js';

const LEAF = 'M0 0 C6 -3 14 -3 22 0 C14 3 6 3 0 0Z'; // лист ивы, рисуется от точки крепления

export function initTimeline(root) {
  root.innerHTML = `
    <svg class="branch__svg" aria-hidden="true"><path class="branch__stem"/><g class="branch__leaves"></g></svg>
    <ol class="branch__list">${career.map((c, i) => `
      <li class="branch__item${i % 2 ? ' is-low' : ''}" style="--i:${i};--rr:${[-1.2, 1, -.6, 1.4, -1, .8][i % 6]}deg">
        <span class="branch__bud" aria-hidden="true" style="grid-column:${i + 1}"></span>
        <article class="branch__note" style="grid-column:${i + 1}">
          <span class="tape" aria-hidden="true"></span>
          <p class="branch__period t-hand">${esc(c.period)}</p>
          <h3 class="branch__place">${esc(c.place)}</h3>
          ${c.role ? `<p class="branch__role t-caption">${esc(c.role)}</p>` : ''}
          <p class="branch__text">${esc(c.text)}</p>
        </article>
      </li>`).join('')}
    </ol>`;

  const svg = root.querySelector('.branch__svg');
  const stem = root.querySelector('.branch__stem');
  const leavesG = root.querySelector('.branch__leaves');
  const items = [...root.querySelectorAll('.branch__item')];
  let len = 0, nodes = [], maxP = 0;

  function layout() {
    const vertical = isMobile();
    root.classList.toggle('is-vertical', vertical);
    const box = root.getBoundingClientRect();
    const W = box.width, H = box.height;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('width', W); svg.setAttribute('height', H);
    // точки почек = центры «бутонов» у каждой заметки
    nodes = items.map(li => {
      const b = li.querySelector('.branch__bud').getBoundingClientRect();
      return [b.left - box.left + b.width / 2, b.top - box.top + b.height / 2];
    });
    const rnd = seeded(11);
    let d;
    if (!vertical) {
      const y0 = nodes[0][1];
      d = `M -20 ${y0 + 10}`;
      let px = -20, py = y0 + 10;
      [...nodes, [W + 30, y0 - 8]].forEach(([nx, ny]) => {
        const c1x = px + (nx - px) * .4, c2x = px + (nx - px) * .7;
        d += ` C ${c1x} ${py + (rnd() - .5) * 40}, ${c2x} ${ny + (rnd() - .5) * 40}, ${nx} ${ny}`;
        px = nx; py = ny;
      });
    } else {
      const x0 = nodes[0][0];
      d = `M ${x0} -10`;
      let px = x0, py = -10;
      [...nodes, [x0 + 6, H + 20]].forEach(([nx, ny]) => {
        d += ` C ${px + (rnd() - .5) * 26} ${py + (ny - py) * .45}, ${nx + (rnd() - .5) * 26} ${py + (ny - py) * .7}, ${nx} ${ny}`;
        px = nx; py = ny;
      });
    }
    stem.setAttribute('d', d);
    len = stem.getTotalLength();
    stem.style.strokeDasharray = len;
    // листья у каждой почки: по 3-4 штуки, детерминированно
    const lr = seeded(5);
    leavesG.innerHTML = nodes.map(([x, y], i) => {
      const n = 3 + (i % 2);
      return `<g class="branch__cluster" data-i="${i}">${Array.from({ length: n }, (_, k) => {
        const a = (vertical ? -60 : -150) + k * (vertical ? 50 : 70) + (lr() - .5) * 30;
        const s = .9 + lr() * .8;
        return `<path d="${LEAF}" transform="translate(${x} ${y}) rotate(${a.toFixed(1)}) scale(${s.toFixed(2)})"/>`;
      }).join('')}</g>`;
    }).join('');
    // доля длины стебля до каждой почки — чтобы «зажигать» заметки по мере роста
    const fr = nodes.map(([x, y]) => {
      let best = 0, bd = 1e9;
      for (let t = 0; t <= 1; t += 0.01) {
        const p = stem.getPointAtLength(t * len); const dd = (p.x - x) ** 2 + (p.y - y) ** 2;
        if (dd < bd) { bd = dd; best = t; }
      }
      return best;
    });
    items.forEach((li, i) => { li.dataset.at = fr[i]; });
    update();
  }

  function update() {
    const r = root.getBoundingClientRect();
    // прогресс: начинаем, когда верх блока на 85% экрана; заканчиваем, когда низ на 60%
    let p = (innerHeight * .85 - r.top) / (r.height + innerHeight * .25);
    p = Math.max(0, Math.min(1, p));
    if (reduceMotion()) p = 1;
    maxP = Math.max(maxP, p); p = maxP;          // ветка только растёт, не «сворачивается» обратно
    stem.style.strokeDashoffset = (len * (1 - p)).toFixed(1);
    items.forEach((li, i) => {
      const on = p >= Number(li.dataset.at) - 0.02;
      li.classList.toggle('is-on', on);
      leavesG.children[i]?.classList.toggle('is-on', on);
    });
  }

  let raf = 0;
  addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); }); }, { passive: true });
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(layout, 150); });
  document.fonts?.ready.then(layout);
  layout();
}
