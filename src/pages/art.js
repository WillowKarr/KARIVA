/* Страница ART: шапка и сетка работ. Работы — src/data/artProjects.js */
import { site } from '../data/site.js';
import { artProjects } from '../data/artProjects.js';
import { renderSitebar, renderFooter } from '../components/layout.js';
import { initGallery } from '../components/gallery.js';
import { pageHead } from '../components/pagehead.js';
import { initDecor, initReveal, initCursor, initTransitions } from '../components/effects.js';

renderSitebar(document.querySelector('[data-sitebar]'), 'art');
document.querySelector('[data-phead]').innerHTML = pageHead('art', site.artPage);
document.querySelector('[data-filters]').remove();
initGallery({ kind: 'art', items: artProjects, grid: document.querySelector('[data-grid]') });
renderFooter(document.querySelector('[data-footer]'));
initDecor(); initReveal(); initCursor(); initTransitions();
