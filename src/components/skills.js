/* Лента навыков + программы с уровнем в виде штрихов-зарубок (как считают на полях). */
import { skills, programs } from '../data/skills.js';
import { esc, doodles, seeded } from './utils.js';

export function renderTicker(el) {
  const row = skills.map(s => `<span class="ticker__item">${esc(s)}</span><span class="ticker__star" aria-hidden="true">${doodles.sparkle}</span>`).join('');
  // содержимое дублируется, чтобы лента шла бесконечно; копия скрыта от экранных дикторов
  el.innerHTML = `
    <ul class="visually-hidden">${skills.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
    <div class="ticker__band ticker__band--back" aria-hidden="true"><div class="ticker__track">${row}${row}</div></div>
    <div class="ticker__band" aria-hidden="true"><div class="ticker__track">${row}${row}${row}</div></div>`;
}

/** 10 штрихов: две «пачки» по пять (четыре палочки + перечёркивающая) */
function tally(level, seed) {
  const rnd = seeded(seed);
  const j = () => ((rnd() - .5) * 2.4).toFixed(1);
  let out = '', k = 0;
  for (let g = 0; g < 2; g++) {
    const ox = g * 60;
    for (let s = 0; s < 4; s++) {
      const x = ox + 6 + s * 10;
      out += `<path class="${k < level ? 'on' : 'off'}" style="--k:${k}" d="M${x + +j()} ${4 + +j()} L${x + +j()} ${38 + +j()}"/>`; k++;
    }
    out += `<path class="${k < level ? 'on' : 'off'}" style="--k:${k}" d="M${ox + 1} ${33 + +j()} C${ox + 18} ${24} ${ox + 30} ${18} ${ox + 48} ${7 + +j()}"/>`; k++;
  }
  return `<svg class="tally" viewBox="0 0 112 42" aria-hidden="true">${out}</svg>`;
}

export function renderPrograms(el) {
  el.innerHTML = programs.map((p, i) => {
    const r = [-2, 1.5, -1, 2, -2.5, 1, -1.5, 2.5, -.5, 1.8][i % 10];
    const tag = p.tag
      ? `<img class="prog__tag" src="/src/assets/tags/${esc(p.tag)}.webp" alt="" width="207" height="94" loading="lazy" style="--r:${r}deg">`
      : `<span class="prog__tag tag-paper" style="--r:${r}deg">${esc(p.name)}</span>`;
    return `<li class="prog reveal" style="--rd:${i * 50}ms" role="img" aria-label="${esc(p.name)}: ${p.level} из 10">
      <div class="prog__head">${tag}</div>
      <div class="prog__level">${tally(p.level, i + 3)}<span class="prog__num"><b>${p.level}</b>/10</span></div>
      <span class="prog__name t-caption">${esc(p.name)}</span>
    </li>`;
  }).join('');
}
