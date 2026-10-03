/* Страница DESIGN: шапка, фильтры, сетка кейсов, окно кейса. Кейсы — src/data/designProjects.js */
import { site } from '../data/site.js';
import { designProjects } from '../data/designProjects.js';
import { renderSitebar, renderFooter } from '../components/layout.js';
import { initGallery } from '../components/gallery.js';
import { pageHead } from '../components/pagehead.js';
import { initDecor, initReveal, initCursor, initTransitions } from '../components/effects.js';

renderSitebar(document.querySelector('[data-sitebar]'), 'design');
document.querySelector('[data-phead]').innerHTML = pageHead('design', site.designPage);
initGallery({ kind: 'design', items: designProjects, grid: document.querySelector('[data-grid]'), filters: document.querySelector('[data-filters]') });
renderFooter(document.querySelector('[data-footer]'));
initDecor(); initReveal(); initCursor(); initTransitions();
