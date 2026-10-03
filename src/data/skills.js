/* ==========================================================================
   НАВЫКИ И ПРОГРАММЫ
   ========================================================================== */

// Навыки — бегущая лента на главной. Эти же слова используются
// как фильтры на странице DESIGN (см. поле skills в designProjects.js).
export const skills = [
  'Дизайн полиграфии',
  'POSM материалы',
  'Оформление соц. сетей',
  'Карточки товаров для WB и OZON',
  'Фирменный стиль',
  'Визуальная коммуникация',
  'Маркетинговые материалы',
];

// Программы и уровень владения от 0 до 10.
// tag — бумажная бирка из src/assets/tags/ (имя файла без .webp).
// Если бирки для программы нет — оставьте tag: '' и нарисуется бумажка с названием.
export const programs = [
  { name: 'Photoshop',     level: 10, tag: 'photoshop' },
  { name: 'Illustrator',   level: 8,  tag: 'illustrator' },
  { name: 'Figma',         level: 10, tag: 'figma' },
  { name: 'InDesign',      level: 7,  tag: 'indesign' },
  { name: 'Procreate',     level: 8,  tag: 'procreate' },
  { name: 'Premiere Pro',  level: 6,  tag: 'premiere-pro' },
  { name: 'After Effects', level: 7,  tag: 'after-effects' },
  { name: 'CapCut',        level: 9,  tag: 'capcut' },
  { name: 'ChatGPT',       level: 10, tag: 'chatgpt' },
  { name: 'Higgsfield',    level: 8,  tag: 'higgsfield' },
];

// Бирки для программ, которые встречаются в кейсах.
// Ключ — название из поля tools кейса, значение — файл бирки.
export const toolTags = {
  'Photoshop': 'photoshop',
  'Illustrator': 'illustrator',
  'Figma': 'figma',
  'InDesign': 'indesign',
  'Procreate': 'procreate',
  'Premiere Pro': 'premiere-pro',
  'After Effects': 'after-effects',
  'CapCut': 'capcut',
  'ChatGPT': 'chatgpt',
  'Higgsfield': 'higgsfield',
};
