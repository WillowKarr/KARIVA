/* ==========================================================================
   РАБОТЫ РАЗДЕЛА ART
   --------------------------------------------------------------------------
   Здесь 6 пустых ячеек. Пока у работы нет картинки (image: ''), на странице
   показывается пустая рамка с номером — так видно, что место ждёт работу.

   КАК ЗАПОЛНИТЬ ЯЧЕЙКУ:
   1. Сохраните картинку в WebP (примерно 1600 px по длинной стороне)
      и положите в папку src/assets/art/
   2. Впишите путь в image, например: image: '/src/assets/art/doll-01.webp'
   3. Заполните остальные поля.

   КАК ДОБАВИТЬ СЕДЬМУЮ РАБОТУ:
   Скопируйте любой блок от { до }, (вместе с запятой) и вставьте в конец
   списка. Обязательно поменяйте slug — он должен быть уникальным.

   Поля:
   slug        — адрес работы: /art/<slug>. Латиница, цифры, дефис.
   title       — название
   image       — главная картинка (она же обложка в сетке)
   gallery     — дополнительные картинки для карусели: ['/src/assets/art/…', …]
   imageAlt    — описание картинки для незрячих и поисковиков
   category    — категория (например, живопись, куклы, графика)
   year        — год
   description — текст о работе
   tools       — материалы / программы: ['Procreate', 'акварель']
   format      — 'portrait' (вертикальная), 'landscape' (горизонтальная)
                 или 'square' — форма ячейки в сетке
   ========================================================================== */

export const artProjects = [
  {
    slug: 'art-01',
    title: '',
    image: '',            // ← путь к картинке
    gallery: [],
    imageAlt: '',
    category: '',
    year: '',
    description: '',      // ← текст о работе
    tools: [],
    format: 'portrait',
  },
  {
    slug: 'art-02',
    title: '',
    image: '',
    gallery: [],
    imageAlt: '',
    category: '',
    year: '',
    description: '',
    tools: [],
    format: 'landscape',
  },
  {
    slug: 'art-03',
    title: '',
    image: '',
    gallery: [],
    imageAlt: '',
    category: '',
    year: '',
    description: '',
    tools: [],
    format: 'square',
  },
  {
    slug: 'art-04',
    title: '',
    image: '',
    gallery: [],
    imageAlt: '',
    category: '',
    year: '',
    description: '',
    tools: [],
    format: 'square',
  },
  {
    slug: 'art-05',
    title: '',
    image: '',
    gallery: [],
    imageAlt: '',
    category: '',
    year: '',
    description: '',
    tools: [],
    format: 'landscape',
  },
  {
    slug: 'art-06',
    title: '',
    image: '',
    gallery: [],
    imageAlt: '',
    category: '',
    year: '',
    description: '',
    tools: [],
    format: 'portrait',
  },
];
