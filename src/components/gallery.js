/* Сетка работ + окно кейса (popup) + прямые ссылки вида /design/<slug>.
   Используется и на DESIGN, и на ART. */
import { site } from '../data/site.js';
import { toolTags } from '../data/skills.js';
import { esc, reduceMotion, isMobile } from './utils.js';

const ROT = [-2, 1.5, -1, 2.5, -1.5, 1, -2.5, 2];

/* ---------- бирки программ ---------- */
export function toolsHTML(tools = []) {
  return tools.map((t, i) => toolTags[t]
    ? `<img class="tag-img" src="/src/assets/tags/${toolTags[t]}.webp" alt="${esc(t)}" width="207" height="94" loading="lazy" style="--r:${ROT[i % 8]}deg">`
    : `<span class="tag-paper" style="--r:${ROT[i % 8]}deg">${esc(t)}</span>`).join('');
}

/* ---------- картинки кейса ---------- */
function designSlides(p) {
  const dir = `/src/assets/projects/${p.slug}`;
  const mobile = isMobile() && p.mobileSlides > 0;
  const n = mobile ? p.mobileSlides : p.slides;
  return Array.from({ length: n }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    if (mobile) return { src: `${dir}/mobile-${num}.webp` };
    const sizes = p.imageSizes || [1800];
    return {
      src: `${dir}/slide-${num}-${sizes[0]}.webp`,
      srcset: sizes.map(w => `${dir}/slide-${num}-${w}.webp ${w}w`).join(', '),
    };
  });
}
const artSlides = (p) => [p.image, ...(p.gallery || [])].filter(Boolean).map(src => ({ src }));

/* ---------- карточки ---------- */
function designCard(p, i) {
  const dir = `/src/assets/projects/${p.slug}`;
  return `<li class="gcell reveal" style="--rd:${(i % 3) * 80}ms" data-skills="${esc((p.skills || []).join('|'))}">
    <a class="card" href="/design/${esc(p.slug)}" data-slug="${esc(p.slug)}">
      <figure class="card__media">
        <img src="${dir}/${p.cover}-520.webp" srcset="${dir}/${p.cover}-520.webp 520w, ${dir}/${p.cover}-900.webp 900w"
             sizes="(max-width: 760px) 92vw, (max-width: 1100px) 46vw, 30vw" width="900" height="1250" loading="lazy" alt="${esc(p.title)}">
      </figure>
      <div class="card__body">
        <h2 class="card__title">${esc(p.title)}</h2>
        <p class="card__short">${esc(p.short)}</p>
        <p class="card__tools t-caption">${esc((p.tools || []).join(' / '))}</p>
      </div>
      <span class="card__open" aria-hidden="true"><img src="/src/assets/symbols/next.webp" alt="" width="56" height="36"></span>
    </a>
  </li>`;
}

function artCard(p, i) {
  const num = String(i + 1).padStart(2, '0');
  if (!p.image) {
    return `<li class="gcell gcell--${p.format || 'square'} reveal" style="--rd:${(i % 3) * 80}ms">
      <div class="card card--empty" aria-label="Пустая ячейка ${num}">
        <span class="empty__num">${num}</span>
        ${site.showPlaceholders ? `<span class="ph">✎ добавьте работу в src/data/artProjects.js</span>` : ''}
        <span class="empty__corner empty__corner--tl"></span><span class="empty__corner empty__corner--br"></span>
      </div>
    </li>`;
  }
  return `<li class="gcell gcell--${p.format || 'square'} reveal" style="--rd:${(i % 3) * 80}ms">
    <a class="card card--art" href="/art/${esc(p.slug)}" data-slug="${esc(p.slug)}">
      <figure class="card__media"><img src="${esc(p.image)}" loading="lazy" alt="${esc(p.imageAlt || p.title)}"></figure>
      <div class="card__body">
        <h2 class="card__title">${esc(p.title)}</h2>
        <p class="card__short t-caption">${esc([p.category, p.year].filter(Boolean).join(' / '))}</p>
      </div>
    </a>
  </li>`;
}

/* ---------- фильтры по навыкам (только DESIGN) ---------- */
function initFilters(host, grid, items) {
  const used = [...new Set(items.flatMap(p => p.skills || []))];
  if (!used.length) { host.remove(); return; }
  const all = site.designPage.filterAll;
  host.innerHTML = `<p class="filters__label t-caption" id="filters-label">Фильтр</p>
    <ul class="filters__list" role="group" aria-labelledby="filters-label">${[all, ...used].map((s, i) =>
      `<li><button type="button" class="filter" aria-pressed="${i === 0}" data-skill="${i === 0 ? '' : esc(s)}">${esc(s)}<svg viewBox="0 0 120 44" preserveAspectRatio="none" aria-hidden="true"><path d="M20 30 C4 18 30 4 64 5 C100 6 118 18 108 32 C96 44 40 44 16 34 C6 28 12 16 34 10"/></svg></button></li>`).join('')}
    </ul><p class="visually-hidden" aria-live="polite" data-filter-status></p>`;
  const status = host.querySelector('[data-filter-status]');
  host.addEventListener('click', e => {
    const b = e.target.closest('.filter'); if (!b) return;
    host.querySelectorAll('.filter').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    const skill = b.dataset.skill;
    let count = 0;
    grid.querySelectorAll('.gcell').forEach(li => {
      const show = !skill || li.dataset.skills.split('|').includes(skill);
      li.hidden = !show; if (show) { count++; li.classList.add('is-in'); }
    });
    status.textContent = `Показано работ: ${count}`;
  });
}

/* ---------- окно кейса ---------- */
function buildModal() {
  const m = document.createElement('div');
  m.className = 'case'; m.hidden = true;
  m.innerHTML = `
    <div class="case__backdrop" data-close></div>
    <article class="case__sheet" role="dialog" aria-modal="true" aria-labelledby="case-title" tabindex="-1">
      <button class="case__close" type="button" data-close aria-label="Закрыть"><img src="/src/assets/symbols/close.webp" alt="" width="67" height="75"></button>
      <div class="case__media">
        <div class="carousel" aria-roledescription="карусель">
          <div class="carousel__track"></div>
          <button class="carousel__btn carousel__btn--prev" type="button" aria-label="Предыдущее изображение"><img src="/src/assets/symbols/prev.webp" alt="" width="56" height="36"></button>
          <button class="carousel__btn carousel__btn--next" type="button" aria-label="Следующее изображение"><img src="/src/assets/symbols/next.webp" alt="" width="56" height="36"></button>
          <p class="carousel__count t-caption" aria-live="polite"></p>
        </div>
      </div>
      <div class="case__info">
        <p class="case__meta t-caption"></p>
        <h2 class="case__title" id="case-title"></h2>
        <div class="case__tags tags"></div>
        <div class="case__text"></div>
        <a class="case__cta" href="/#contact"></a>
      </div>
    </article>`;
  document.body.appendChild(m);
  return m;
}

export function initGallery({ kind, items, grid, filters }) {
  const base = `/${kind}/`;
  grid.innerHTML = items.map(kind === 'design' ? designCard : artCard).join('');
  if (filters) initFilters(filters, grid, items);

  const modal = buildModal();
  const sheet = modal.querySelector('.case__sheet');
  const track = modal.querySelector('.carousel__track');
  const count = modal.querySelector('.carousel__count');
  const pageTitle = document.title;
  let slides = [], idx = 0, current = null, lastFocus = null;

  function show(i) {
    if (!slides.length) return;
    idx = (i + slides.length) % slides.length;          // по кругу: после последней — снова первая
    [...track.children].forEach((img, k) => {
      const near = k === idx || k === (idx + 1) % slides.length || k === (idx - 1 + slides.length) % slides.length;
      if (near && !img.getAttribute('src')) {           // грузим только текущую и соседние
        if (img.dataset.srcset) img.srcset = img.dataset.srcset;
        img.src = img.dataset.src;
      }
      img.classList.toggle('is-active', k === idx);
      img.setAttribute('aria-hidden', String(k !== idx));
    });
    count.textContent = `${idx + 1} / ${slides.length}`;
  }

  function fill(p) {
    slides = kind === 'design' ? designSlides(p) : artSlides(p);
    track.innerHTML = slides.map((s, k) => `<img data-src="${esc(s.src)}" ${s.srcset ? `data-srcset="${esc(s.srcset)}" sizes="(max-width: 760px) 100vw, 62vw"` : ''} alt="${esc(p.title)} — изображение ${k + 1} из ${slides.length}" decoding="async">`).join('');
    modal.querySelectorAll('.carousel__btn').forEach(b => { b.hidden = slides.length < 2; });
    modal.querySelector('.case__meta').textContent = [p.category, p.year].filter(Boolean).join(' / ');
    modal.querySelector('.case__title').textContent = p.title;
    modal.querySelector('.case__tags').innerHTML = toolsHTML(p.tools);
    const blocks = [['', p.description], ['Задача', p.task], ['Что сделано', p.work], ['Результат', p.result]]
      .filter(([, v]) => v && v.trim())
      .map(([h, v]) => `${h ? `<h3 class="case__h t-hand">${esc(h)}</h3>` : ''}<p>${esc(v)}</p>`).join('');
    modal.querySelector('.case__text').innerHTML = blocks;
    modal.querySelector('.case__cta').innerHTML = `<span>${esc(site.caseCta)}</span><svg viewBox="0 0 120 40" aria-hidden="true"><path d="M3 30 C28 22 54 28 78 18 C92 12 104 14 114 10"/><path d="M101 3 L115 10 L104 21"/></svg>`;
    idx = 0; show(0);
  }

  function open(slug, push = true) {
    const p = items.find(x => x.slug === slug && (kind === 'design' || x.image));
    if (!p) { history.replaceState(null, '', base); return; }
    current = slug; lastFocus = document.activeElement;
    fill(p);
    modal.hidden = false;
    document.documentElement.classList.add('is-locked');
    requestAnimationFrame(() => modal.classList.add('is-open'));
    document.title = `${p.title} — KARMASH`;
    if (push) history.pushState({ slug }, '', base + slug);
    setTimeout(() => sheet.focus({ preventScroll: true }), 30);
  }

  function close(push = true) {
    if (!current) return;
    current = null;
    modal.classList.remove('is-open');
    document.documentElement.classList.remove('is-locked');
    document.title = pageTitle;
    if (push) history.pushState(null, '', base);
    setTimeout(() => { if (!current) modal.hidden = true; }, reduceMotion() ? 0 : 350);
    lastFocus?.focus?.({ preventScroll: true });
  }

  // клики по карточкам: обычная ссылка, но открываем окном
  grid.addEventListener('click', e => {
    const a = e.target.closest('a[data-slug]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault(); open(a.dataset.slug);
  });
  modal.addEventListener('click', e => { if (e.target.closest('[data-close]')) close(); });
  modal.querySelector('.carousel__btn--prev').addEventListener('click', () => show(idx - 1));
  modal.querySelector('.carousel__btn--next').addEventListener('click', () => show(idx + 1));
  modal.querySelector('.case__cta').addEventListener('click', () => { document.documentElement.classList.remove('is-locked'); });

  // клавиатура: Esc — закрыть, стрелки — листать, Tab не выходит из окна
  document.addEventListener('keydown', e => {
    if (!current) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'ArrowRight') show(idx + 1);
    else if (e.key === 'Tab') {
      const f = [...sheet.querySelectorAll('button:not([hidden]), a[href]')];
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === sheet)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // свайп на телефоне
  let sx = null;
  track.addEventListener('pointerdown', e => { sx = e.clientX; });
  track.addEventListener('pointerup', e => {
    if (sx === null) return; const dx = e.clientX - sx; sx = null;
    if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1));
  });

  // адрес страницы ↔ открытый кейс
  const slugFromURL = () => {
    const m = location.pathname.match(new RegExp(`^/${kind}/([^/]+)/?$`));
    return m ? decodeURIComponent(m[1]) : new URLSearchParams(location.search).get('case');
  };
  addEventListener('popstate', () => { const s = slugFromURL(); if (s) open(s, false); else close(false); });
  const initial = slugFromURL();
  if (initial) {
    if (location.search) history.replaceState(null, '', base + initial);
    open(initial, false);
  }
}
