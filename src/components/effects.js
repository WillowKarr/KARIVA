/* Общий язык движения сайта: декор, появление, курсор, переходы, атмосферы. */
import { decor } from '../data/decor.js';
import { doodles, measurePaths, reduceMotion, isTouch, isMobile, seeded, willowSrc, WILLOW_AR } from './utils.js';

/* ---------- 1. Декоративные знаки из data/decor.js ---------- */
export function initDecor(root = document) {
  root.querySelectorAll('[data-decor]').forEach(host => {
    const list = decor[host.dataset.decor];
    if (!list || host.querySelector(':scope > .decor-layer')) return;
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    const layer = document.createElement('div');
    layer.className = 'decor-layer'; layer.setAttribute('aria-hidden', 'true');
    list.forEach(d => {
      if (d.mobile === false && isMobile()) return;
      const n = document.createElement('span');
      n.className = `dc dc--${d.color || 'ink'}`;
      n.style.cssText = `left:${d.x}%;top:${d.y}%;width:${d.size}px;--rot:${d.rot || 0}deg;--op:${d.opacity ?? 1};--delay:${d.delay || 0}ms`;
      if (d.anim && d.anim !== 'none') n.dataset.anim = d.anim;
      const [kind, arg] = d.type.split(':');
      if (kind === 'element') n.innerHTML = `<img src="/src/assets/elements/${arg}.webp" alt="" loading="lazy">`;
      else if (kind === 'piece') n.innerHTML = `<img src="/src/assets/collage/${arg}.webp" alt="" loading="lazy">`;
      else if (kind === 'page') { n.classList.add('dc-page'); n.style.width = 'auto'; n.textContent = arg; }
      else n.innerHTML = doodles[kind] || '';
      layer.appendChild(n);
    });
    host.appendChild(layer);
    measurePaths(layer);
    observeIn(layer.querySelectorAll('.dc'), 0.1);
  });
}

/* ---------- 2. Появление при прокрутке ---------- */
export function observeIn(nodes, threshold = 0.15, cls = 'is-in') {
  if (!nodes.length) return;
  if (reduceMotion() || !('IntersectionObserver' in window)) { nodes.forEach(n => n.classList.add(cls)); return; }
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add(cls); io.unobserve(e.target); }
  }), { threshold, rootMargin: '0px 0px -6% 0px' });
  nodes.forEach(n => io.observe(n));
}
export const initReveal = (root = document) => observeIn(root.querySelectorAll('.reveal'));

/* ---------- 3. Курсор: обычный курсор + маленькая звёздочка рядом ---------- */
export function initCursor() {
  if (isTouch() || reduceMotion()) return;
  const m = document.createElement('div');
  m.className = 'cursor-mate'; m.setAttribute('aria-hidden', 'true');
  m.innerHTML = doodles.sparkle;
  document.body.appendChild(m);
  let x = -100, y = -100, tx = x, ty = y, raf = 0;
  const loop = () => {
    x += (tx - x) * 0.2; y += (ty - y) * 0.2;
    m.style.transform = `translate3d(${x + 14}px, ${y + 16}px, 0)`;
    raf = (Math.abs(tx - x) + Math.abs(ty - y) > 0.3) ? requestAnimationFrame(loop) : 0;
  };
  addEventListener('pointermove', e => {
    tx = e.clientX; ty = e.clientY; m.classList.add('is-live');
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });
  document.addEventListener('pointerleave', () => m.classList.remove('is-live'));
  document.addEventListener('pointerover', e => {
    m.classList.toggle('is-hot', !!e.target.closest('a, button, [role="button"], input, label'));
    document.body.classList.toggle('on-dark-cursor', !!e.target.closest('.on-dark, .is-dark'));
  });
}

/* ---------- 4. Переходы между страницами ART / DESIGN ---------- */
function transitionEl(kind) {
  let pt = document.querySelector('.pt');
  if (!pt) { pt = document.createElement('div'); pt.className = 'pt'; pt.setAttribute('aria-hidden', 'true'); document.body.appendChild(pt); }
  pt.className = `pt pt--${kind}`;
  const rnd = seeded(7);
  const digits = Array.from({ length: 6 }, () => Array.from({ length: 14 }, () => Math.floor(rnd() * 10)).join('')).join('\n');
  pt.innerHTML = `<div class="pt__sheet"></div><div class="pt__sheet"></div><div class="pt__sheet"></div>
    <div class="pt__mark">${kind === 'art'
      ? `<span class="willow-mask" style="--src:url('${willowSrc('branch-01')}')"></span>`
      : `<span class="pt__digits">${digits}</span>`}</div>`;
  return pt;
}

export function initTransitions() {
  // исходящий переход: ссылки с data-transition="art" | "design"
  document.addEventListener('click', e => {
    const a = e.target.closest('a[data-transition]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    const kind = a.dataset.transition;
    a.classList.add('is-pressed');
    if (reduceMotion()) { location.href = a.href; return; }
    const pt = transitionEl(kind);
    requestAnimationFrame(() => requestAnimationFrame(() => pt.classList.add('is-on')));
    try { sessionStorage.setItem('kx-arrive', kind); } catch (err) { /* noop */ }
    setTimeout(() => { location.href = a.href; }, 520);
  });
  // входящий: лист «уезжает» вверх, открывая страницу
  let kind = null;
  try { kind = sessionStorage.getItem('kx-arrive'); sessionStorage.removeItem('kx-arrive'); } catch (err) { /* noop */ }
  if (kind && !reduceMotion()) {
    const pt = transitionEl(kind);
    pt.classList.add('is-on');
    pt.querySelectorAll('.pt__sheet').forEach(s => { s.style.transition = 'none'; });
    requestAnimationFrame(() => requestAnimationFrame(() => {
      pt.querySelectorAll('.pt__sheet').forEach(s => { s.style.transition = ''; });
      pt.classList.add('is-out');
      setTimeout(() => pt.remove(), 800);
    }));
  }
  // кнопка «назад» браузера возвращает страницу из кэша — убираем занавес
  addEventListener('pageshow', ev => { if (ev.persisted) document.querySelectorAll('.pt').forEach(p => p.remove()); document.querySelectorAll('.is-pressed').forEach(b => b.classList.remove('is-pressed')); });
}

/* ---------- 5. Атмосферы: ивовые лозы (ART) и цифры (DESIGN) ---------- */
let moodBuilt = false;
function buildMoods() {
  if (moodBuilt) return; moodBuilt = true;
  // лозы: где, какая ветка, откуда растёт
  const vines = [
    { b: 'branch-01', left: '-2%', top: '-4%', w: 'clamp(140px,16vw,260px)', rot: 6, origin: '50% 0' },
    { b: 'branch-07', left: '18%', top: '-6%', w: 'clamp(70px,7vw,120px)', rot: -8, origin: '50% 0', op: .7 },
    { b: 'branch-03', right: '6%', top: '-5%', w: 'clamp(90px,9vw,150px)', rot: 10, flip: -1, origin: '50% 0' },
    { b: 'branch-06', right: '-1%', top: '30%', w: 'clamp(80px,8vw,140px)', rot: -14, origin: '100% 0', op: .75 },
    { b: 'branch-02', left: '-3%', bottom: '4%', w: 'clamp(180px,20vw,320px)', rot: -4, origin: '0 100%', bottom0: true },
    { b: 'branch-05', right: '10%', bottom: '-2%', w: 'clamp(160px,18vw,300px)', rot: 6, flip: -1, origin: '100% 100%', bottom0: true, op: .8 },
    { b: 'branch-09', left: '46%', top: '-8%', w: 'clamp(50px,5vw,90px)', rot: 3, origin: '50% 0', op: .55 },
  ];
  const art = document.createElement('div');
  art.className = 'mood mood--art'; art.setAttribute('aria-hidden', 'true');
  art.innerHTML = vines.map((v, i) => {
    const pos = ['left', 'right', 'top', 'bottom'].filter(k => v[k]).map(k => `${k}:${v[k]}`).join(';');
    return `<span class="vine${v.bottom0 ? ' from-bottom' : ''}" style="${pos};--w:${v.w};--ar:${WILLOW_AR[v.b]};--rot:${v.rot}deg;--flip:${v.flip || 1};--origin:${v.origin};--d:${i * 90}ms;--op:${v.op || .9}"><i class="willow-mask" style="--src:url('${willowSrc(v.b)}');animation-delay:-${i * 1.3}s"></i></span>`;
  }).join('');
  // цифры: несколько вертикальных потоков + отдельные числа в промежутках
  const rnd = seeded(42);
  const cols = Array.from({ length: 9 }, (_, i) => {
    const s = Array.from({ length: 90 }, () => Math.floor(rnd() * 10)).join('');
    const x = [3, 9, 21, 34, 50, 63, 77, 88, 96][i];
    const op = [.28, .14, .22, .1, .12, .2, .1, .26, .16][i];
    return `<span class="digits__col" style="left:${x}%;--op:${op};--dur:${18 + rnd() * 16}s;animation-delay:-${rnd() * 20}s">${s}</span>`;
  }).join('');
  const bits = Array.from({ length: 16 }, (_, i) => {
    const n = Array.from({ length: 2 + Math.floor(rnd() * 5) }, () => Math.floor(rnd() * 10)).join('');
    return `<span class="digits__bit" style="left:${(rnd() * 94 + 2).toFixed(1)}%;top:${(rnd() * 92 + 3).toFixed(1)}%;--op:${(.25 + rnd() * .45).toFixed(2)};--d:${i * 60}ms">${n}</span>`;
  }).join('');
  const dig = document.createElement('div');
  dig.className = 'mood digits'; dig.setAttribute('aria-hidden', 'true');
  dig.innerHTML = `<span class="digits__grid"></span>${cols}${bits}`;
  document.body.append(art, dig);
}

/** targets: элементы с data-mood="art" | "design" */
export function initMoods(targets) {
  if (reduceMotion()) return;
  const set = (mood) => {
    buildMoods();
    document.body.classList.toggle('mood-art', mood === 'art');
    document.body.classList.toggle('mood-design', mood === 'design');
  };
  if (!isTouch()) {
    targets.forEach(t => {
      t.addEventListener('pointerenter', () => set(t.dataset.mood));
      t.addEventListener('pointerleave', () => set(null));
      t.addEventListener('focusin', () => set(t.dataset.mood));
      t.addEventListener('focusout', () => set(null));
    });
  } else {
    // на телефоне атмосфера включается, когда лист в центре экрана
    const io = new IntersectionObserver(entries => {
      const vis = entries.filter(e => e.isIntersecting);
      if (vis.length) set(vis[0].target.dataset.mood);
      else if (!targets.some(t => { const r = t.getBoundingClientRect(); return r.top < innerHeight * .6 && r.bottom > innerHeight * .4; })) set(null);
    }, { rootMargin: '-40% 0px -40% 0px' });
    targets.forEach(t => io.observe(t));
  }
}

/* ---------- 6. Прелоадер (только главная, только первый заход) ---------- */
export function finishPreloader() {
  const p = document.querySelector('.preloader');
  if (!p) return Promise.resolve();
  return new Promise(resolve => {
    const done = () => {
      p.classList.add('is-done');
      try { sessionStorage.setItem('kx-seen', '1'); } catch (e) { /* noop */ }
      setTimeout(() => { p.remove(); }, 500);
      resolve();
    };
    if (document.documentElement.classList.contains('no-preload')) { p.remove(); resolve(); return; }
    // ждём реальную загрузку: шрифты + картинки первого экрана. Максимум 3 секунды.
    const timeout = new Promise(r => setTimeout(r, 3000));
    const ready = new Promise(r => { if (document.readyState === 'complete') r(); else addEventListener('load', r, { once: true }); });
    Promise.race([Promise.all([ready, document.fonts?.ready]), timeout]).then(done);
  });
}
