// script.js
(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ===== Smooth scroll (respect reduced motion) =====
  const scrollToHash = (hash) => {
    const el = document.querySelector(hash);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 86;
    window.scrollTo({ top: y, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    scrollToHash(href);
    history.pushState(null, '', href);
  });

  // ===== Mobile menu =====
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  const overlay = document.getElementById('navOverlay');

  const closeNav = () => {
    if (!burger || !nav || !overlay) return;
    burger.classList.remove('is-open');
    nav.classList.remove('is-open');
    overlay.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const openNav = () => {
    if (!burger || !nav || !overlay) return;
    burger.classList.add('is-open');
    nav.classList.add('is-open');
    overlay.hidden = false;
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  if (burger && nav && overlay) {
    burger.addEventListener('click', () => {
      const isOpen = burger.classList.contains('is-open');
      isOpen ? closeNav() : openNav();
    });
    overlay.addEventListener('click', closeNav);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 820) closeNav();
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
  }

  // ===== Reveal on scroll =====
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  if (!prefersReduced && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in-view');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  // ===== Lightweight parallax for hero bg =====
  const heroBg = document.querySelector('.hero__bg');
  let raf = 0;
  const onScroll = () => {
    if (prefersReduced || !heroBg) return;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const y = window.scrollY || 0;
      const offset = Math.min(24, y * 0.04);
      heroBg.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ===== Custom cursor (square rounded) =====
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  const isCoarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  if (!prefersReduced && cursor && follower && !isCoarse) {
    let fx = 0, fy = 0, x = 0, y = 0;
    const speed = 0.18;

    const move = (e) => {
      x = e.clientX; y = e.clientY;
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
    };

    const tick = () => {
      fx += (x - fx) * speed;
      fy += (y - fy) * speed;
      follower.style.left = `${fx}px`;
      follower.style.top = `${fy}px`;
      requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', move, { passive: true });
    requestAnimationFrame(tick);

    const hoverables = 'a, button, .gallery-item, .social, .btn, .burger';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverables)) document.body.classList.add('cursor-hover');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverables)) document.body.classList.remove('cursor-hover');
    });
  }

  // ===== Portfolio modal gallery =====
  const modal = document.getElementById('portfolioModal');
  const track = modal?.querySelector('.slider__track');
  const titleEl = modal?.querySelector('.modal__title');
  const descEl = modal?.querySelector('.modal__desc');
  const tagsEl = modal?.querySelector('.modal__tags');
  const prevBtn = modal?.querySelector('.nav-btn--prev');
  const nextBtn = modal?.querySelector('.nav-btn--next');

  const projects = {
    logopotam: {
      title: 'Оформление соц. сетей Логопотам',
      description:
        'Разработка визуальной айдентики для социальных сетей проекта «Логопотам» — сервиса онлайн-коррекции речи у детей. Созданы самостоятельные дизайн-коды под ключевые направления бренда с учетом целевой аудитории каждого. В зоне ответственности: верстка контента, оформление сторис и рекламных креативов, цветокоррекция и ретушь, отрисовка векторных иконок и иллюстраций, применение AI-инструментов для вариативности визуалов. Работа велась для VK и Telegram в тесной связке с SMM-командой. Итог — более 300 креативов по всем направлениям.',
      tags: ['Figma', 'Photoshop', 'Illustrator', 'AI'],
      imagesDesktop: ['element1.webp','element2.webp','element3.webp','element5.webp','element6.webp','element7.webp','element8.webp','element9.webp'],
      imagesMobile: ['elementmobile1.webp','elementmobile2.webp','elementmobile3.webp','elementmobile5.webp','elementmobile6.webp','elementmobile7.webp','elementmobile8.webp','elementmobile9.webp','elementmobile10.webp','elementmobile11.webp','elementmobile12.webp','elementmobile13.webp','elementmobile14.webp','elementmobile15.webp','elementmobile16.webp','elementmobile17.webp','elementmobile18.webp','elementmobile19.webp','elementmobile20.webp','elementmobile21.webp','elementmobile22.webp','elementmobile23.webp']
    },
    mebelsoft: {
      title: 'Фирменный стиль для мебельной фирмы МЕБЕЛЬ-SOFT',
      description:
        'Разработка логотипа мебельного магазина: красное кресло в обрамлении желтого окна стало смысловым и визуальным ядром айдентики. Знак транслирует ценности бренда — современная элегантность, уют и индивидуальность. Контрастная пара «красный–желтый» формирует теплые ассоциации и динамику, силуэт кресла отсылает к классическим формам ар-нуво, подчеркивая связь с историей дизайна. Также на основе логотипа были созданы атрибуты фирменного стиля.',
      tags: ['Illustrator', 'Photoshop'],
      imagesDesktop: ['element12.webp','element13.webp','element14.webp','element15.webp'],
      imagesMobile: ['elementmobile24.webp','elementmobile25.webp','elementmobile26.webp','elementmobile27.webp','elementmobile28.webp','elementmobile29.webp','elementmobile30.webp']
    },
    cofee: {
      title: 'Дизайн для кофейного стаканчика',
      description:
        'Векторные иллюстрации для брендированных стаканчиков антикафе «Совиный дом». Первая иллюстрация — «весенний лес» с нейтральной, мягкой палитрой; силуэты сов, «выглядывающих» из листвы, создают фирменную атмосферу пространства. Позднее разработан летний вариант с абстрактными динамичными элементами, передающими ощущение зноя.',
      tags: ['Illustrator', 'Photoshop'],
      imagesDesktop: ['element16.webp','element18.webp','element19.webp'],
      imagesMobile: ['elementmobile31.webp','elementmobile32.webp','elementmobile33.webp','elementmobile34.webp','elementmobile35.webp','elementmobile36.webp','elementmobile37.webp']
    },
    nashakuxnya: {
      title: 'Фирменный стиль для бренда "НАША КУХНЯ"',
      description:
        'Комплексная айдентика для придорожного кафе-магазина с акцентом на семейную, «домашнюю» атмосферу. Разработаны логотип в виде персонажа, наслаждающегося шаурмой, теплая палитра и графические элементы с фуд-мотивами. Выполнены макеты для фасада и рекламных носителей. Результат — цельный визуальный образ, поддерживающий рост посещаемости и лояльности.',
      tags: ['Photoshop', 'Illustrator', 'Krita'],
      imagesDesktop: ['element20.webp','element21.webp','element22.webp','element23.webp'],
      imagesMobile: ['elementmobile59.webp','elementmobile60.webp','elementmobile61.webp','elementmobile62.webp','elementmobile63.webp','elementmobile64.webp','elementmobile65.webp']
    },
    stickers: {
      title: 'Стикеры для Тбанк"',
      description:
        'Стикерпак для корпоративного мероприятия KidsDay. Цели: укрепить взаимопонимание между родителями и детьми и повысить лояльность сотрудников и их семей. В результате создана серия забавных персонажей-детей, унаследовавших характерные черты работающих родителей.',
      tags: ['Illustrator'],
      imagesDesktop: ['element24.webp','element25.webp'],
      imagesMobile: ['elementmobile54.webp','elementmobile55.webp','elementmobile56.webp','elementmobile57.webp','elementmobile58.webp']
    },
    marketplace: {
      title: 'Создание карточек товара на WB и OZON',
      description:
        'Создание продающих карточек товаров для Wildberries и Ozon для магазинов из разных ниш. Процесс включает анализ целевой аудитории и требований площадок, разработку инфографики с УТП и характеристиками в минималистичном стиле, оптимизацию описаний с ключевыми словами, A/B-тестирование и итерационные доработки. Выполнены профессиональная предметная съемка на нейтральном фоне, многоракурсные кадры и ретушь.',
      tags: ['Illustrator', 'Photoshop', 'Figma', 'Stable Diffusion'],
      imagesDesktop: ['element26.webp','element27.webp','element28.webp','element29.webp','element30.webp'],
      imagesMobile: ['elementmobile38.webp','elementmobile39.webp','elementmobile40.webp','elementmobile41.webp','elementmobile42.webp','elementmobile43.webp','elementmobile44.webp','elementmobile45.webp','elementmobile46.webp','elementmobile47.webp','elementmobile48.webp','elementmobile49.webp','elementmobile50.webp','elementmobile51.webp','elementmobile52.webp']
    }
  };

  let current = 0;
  let slidesCount = 0;

  const getImagesForViewport = (project) => {
    const isMobile = window.innerWidth <= 720;
    if (isMobile && project.imagesMobile?.length) return project.imagesMobile;
    if (project.imagesDesktop?.length) return project.imagesDesktop;
    return project.images || [];
  };

  const setTransform = () => {
    if (!track) return;
    track.style.transform = `translateX(${-current * 100}%)`;
  };

  const go = (dir) => {
    if (!slidesCount) return;
    current = (current + dir + slidesCount) % slidesCount;
    setTransform();
  };

  const buildSlides = (images, altBase) => {
    if (!track) return;
    track.innerHTML = '';
    images.forEach((src, idx) => {
      const slide = document.createElement('div');
      slide.className = 'slide';
      const img = document.createElement('img');
      img.src = src;
      img.alt = `${altBase} — ${idx + 1}`;
      img.loading = 'eager';
      slide.appendChild(img);
      track.appendChild(slide);
    });
    slidesCount = images.length;
    current = 0;
    setTransform();
  };

  const openModal = (projectId) => {
    if (!modal || !track || !titleEl || !descEl || !tagsEl) return;
    const project = projects[projectId];
    if (!project) return;

    titleEl.textContent = project.title;
    descEl.textContent = project.description;

    tagsEl.innerHTML = '';
    project.tags.forEach((t) => {
      const el = document.createElement('span');
      el.className = 'tag';
      el.textContent = t;
      tagsEl.appendChild(el);
    });

    const images = getImagesForViewport(project);
    buildSlides(images, project.title);

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    // focus close button for a11y
    modal.querySelector('[data-close]')?.focus({ preventScroll: true });
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  // Open from grid
  document.querySelectorAll('.gallery-item[data-project]').forEach((btn) => {
    btn.addEventListener('click', () => openModal(btn.dataset.project));
  });

  // Close
  modal?.addEventListener('click', (e) => {
    const target = e.target;
    if (target?.matches?.('[data-close]')) closeModal();
  });

  // Buttons
  prevBtn?.addEventListener('click', () => go(-1));
  nextBtn?.addEventListener('click', () => go(1));

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (!modal?.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  });

  // Swipe (mobile)
  if (modal && track) {
    let startX = 0;
    let dx = 0;
    let active = false;

    const onStart = (e) => {
      if (!modal.classList.contains('is-open')) return;
      active = true;
      dx = 0;
      startX = (e.touches ? e.touches[0].clientX : e.clientX);
    };

    const onMove = (e) => {
      if (!active) return;
      const x = (e.touches ? e.touches[0].clientX : e.clientX);
      dx = x - startX;
    };

    const onEnd = () => {
      if (!active) return;
      active = false;
      const threshold = 42;
      if (dx > threshold) go(-1);
      else if (dx < -threshold) go(1);
    };

    modal.addEventListener('touchstart', onStart, { passive: true });
    modal.addEventListener('touchmove', onMove, { passive: true });
    modal.addEventListener('touchend', onEnd, { passive: true });
  }

  // If viewport changes while modal open — rebuild slides for proper set
  window.addEventListener('resize', () => {
    if (!modal?.classList.contains('is-open')) return;
    const id = Object.keys(projects).find((k) => titleEl?.textContent === projects[k].title);
    if (!id) return;
    const images = getImagesForViewport(projects[id]);
    buildSlides(images, projects[id].title);
  });
})();
