(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ===== Smooth scroll for anchors =====
  const scrollToEl = (el, offset = 92) => {
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
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
    scrollToEl(target, 92);
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

  // ===== Highlight marker animation (about) =====
  const hlEls = Array.from(document.querySelectorAll('[data-highlight]'));
  if (!prefersReduced && hlEls.length) {
    const hio = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('is-on');
            hio.unobserve(en.target);
          }
        });
      },
      { threshold: 0.65, rootMargin: '0px 0px -12% 0px' }
    );

    hlEls.forEach((el) => hio.observe(el));
  } else {
    hlEls.forEach((el) => el.classList.add('is-on'));
  }

  // ===== Lightweight hero parallax =====
  const heroBg = document.querySelector('.hero__bg');
  let raf = 0;

  const onScrollParallax = () => {
    if (prefersReduced || !heroBg) return;
    if (raf) return;

    raf = requestAnimationFrame(() => {
      raf = 0;
      const y = window.scrollY || 0;
      const offset = Math.min(26, y * 0.04);
      heroBg.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
  };

  window.addEventListener('scroll', onScrollParallax, { passive: true });
  onScrollParallax();

  // ===== Custom cursor (desktop only) =====
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  const isCoarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  if (!prefersReduced && cursor && follower && !isCoarse) {
    let fx = 0,
      fy = 0,
      x = 0,
      y = 0;
    const speed = 0.18;

    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
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

    const hoverables =
      'a, button, .social, .btn, .burger, [data-open], .readBtn, .navBtn, .iconBtn';

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverables)) document.body.classList.add('cursor-hover');
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverables)) document.body.classList.remove('cursor-hover');
    });
  }

  // ===== Portfolio modal gallery =====
  const modal = document.getElementById('portfolioModal');
  const dialog = modal?.querySelector('.modal__dialog');
  const track = modal?.querySelector('.slider__track');
  const titleEl = modal?.querySelector('.modal__title');
  const descEl = modal?.querySelector('.modal__desc');
  const tagsEl = modal?.querySelector('.modal__tags');
  const prevBtn = modal?.querySelector('.navBtn--prev');
  const nextBtn = modal?.querySelector('.navBtn--next');
  const readBtn = modal?.querySelector('[data-read]');
  const readBtnLabel = modal?.querySelector('.readBtn__label');
  const readBtnIcon = modal?.querySelector('.readBtn__icon');
  const content = modal?.querySelector('#caseContent');

  const projects = {
    logopotam: {
      title: 'Оформление соц. сетей Логопотам',
      description:
        'Разработка визуальной айдентики для социальных сетей проекта «Логопотам» — сервиса онлайн-коррекции речи у детей. Созданы самостоятельные дизайн-коды под ключевые направления бренда с учетом целевой аудитории каждого. В зоне ответственности: верстка контента, оформление сторис и рекламных креативов, цветокоррекция и ретушь, отрисовка векторных иконок и иллюстраций, применение AI-инструментов. Работа велась для VK и Telegram. Итог — более 300 креативов.',
      tags: ['Figma', 'Photoshop', 'Illustrator', 'AI'],
      imagesDesktop: [
        'element1.webp',
        'element2.webp',
        'element3.webp',
        'element5.webp',
        'element6.webp',
        'element7.webp',
        'element8.webp',
        'element9.webp',
      ],
      imagesMobile: [
        'elementmobile1.webp',
        'elementmobile2.webp',
        'elementmobile3.webp',
        'elementmobile5.webp',
        'elementmobile6.webp',
        'elementmobile7.webp',
        'elementmobile8.webp',
        'elementmobile9.webp',
        'elementmobile10.webp',
      ],
    },

    mebelsoft: {
      title: 'Фирменный стиль для мебельной фирмы МЕБЕЛЬ-SOFT',
      description:
        'Разработка логотипа мебельного магазина: красное кресло в обрамлении желтого окна стало смысловым и визуальным ядром айдентики. Также на основе логотипа были созданы атрибуты фирменного стиля.',
      tags: ['Illustrator', 'Photoshop'],
      imagesDesktop: ['element12.webp', 'element13.webp', 'element14.webp', 'element15.webp'],
      imagesMobile: [
        'elementmobile24.webp',
        'elementmobile25.webp',
        'elementmobile26.webp',
        'elementmobile27.webp',
        'elementmobile28.webp',
      ],
    },

    cofee: {
      title: 'Дизайн для кофейного стаканчика',
      description:
        'Векторные иллюстрации для брендированных стаканчиков антикафе «Совиный дом». Разработаны варианты под сезоны, графика готовилась под печать.',
      tags: ['Illustrator', 'Photoshop'],
      imagesDesktop: ['element16.webp', 'element18.webp', 'element19.webp'],
      imagesMobile: ['elementmobile31.webp', 'elementmobile32.webp', 'elementmobile33.webp', 'elementmobile34.webp'],
    },

    nashakuxnya: {
      title: 'Фирменный стиль для бренда "НАША КУХНЯ"',
      description:
        'Комплексная айдентика для придорожного кафе-магазина. Разработаны логотип, палитра, графические элементы и макеты носителей.',
      tags: ['Photoshop', 'Illustrator', 'Krita'],
      imagesDesktop: ['element20.webp', 'element21.webp', 'element22.webp', 'element23.webp'],
      imagesMobile: [
        'elementmobile59.webp',
        'elementmobile60.webp',
        'elementmobile61.webp',
        'elementmobile62.webp',
      ],
    },

    stickers: {
      title: 'Стикеры для Тбанк',
      description:
        'Стикерпак для корпоративного мероприятия KidsDay — дня, когда родители берут на работу детей. Серия персонажей, подготовка к печати.',
      tags: ['Illustrator'],
      imagesDesktop: ['element24.webp', 'element25.webp'],
      imagesMobile: ['elementmobile54.webp', 'elementmobile55.webp', 'elementmobile56.webp', 'elementmobile57.webp'],
    },

    marketplace: {
      title: 'Создание карточек товара на WB и OZON',
      description:
        'Создание продающих карточек товаров: анализ аудитории и требований площадок, инфографика с УТП, ретушь, итерационные доработки. Как результат в Meidiannas оформила ≈480 карточек и внедрила единую визуальную систему — рост продаж +175% за месяц, выручка +169% после обновления контента и 9 место в категории обувь OZON. В ADORE SWIM обновила 160+ карточек, повысив CTR обложки на +12% и конверсию в заказ на +6%, ускорив подготовку контента на ~25% благодаря шаблонам.',
      tags: ['Illustrator', 'Photoshop', 'Figma', 'Stable Diffusion', 'Photoroom', 'Midjourney'],
      imagesDesktop: ['element26.webp', 'element27.webp', 'element28.webp', 'element29.webp', 'element30.webp'],
      imagesMobile: ['elementmobile38.webp', 'elementmobile39.webp', 'elementmobile40.webp', 'elementmobile41.webp'],
    },
  };

  let current = 0;
  let slidesCount = 0;
  let currentProjectId = null;

  // state should not "blink"
  let isReading = false;

  const getImages = (project) => {
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

  const setNavHidden = (hidden) => {
    if (!modal) return;
    modal.classList.toggle('nav-hidden', hidden);
  };

  const setReadBtnState = (reading) => {
    isReading = reading;

    if (readBtn) readBtn.setAttribute('aria-expanded', reading ? 'true' : 'false');

    if (readBtnLabel) readBtnLabel.textContent = reading ? 'Посмотреть визуал' : 'Читать про кейс';

    if (readBtnIcon) {
      readBtnIcon.classList.toggle('fa-arrow-down', !reading);
      readBtnIcon.classList.toggle('fa-arrow-up', reading);
    }
  };

  const scrollDialogToEl = (el) => {
    if (!dialog || !el) return;
    const top = el.getBoundingClientRect().top - dialog.getBoundingClientRect().top + dialog.scrollTop;
    dialog.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  const openModal = (projectId) => {
    if (!modal || !dialog || !track || !titleEl || !descEl || !tagsEl) return;

    const project = projects[projectId];
    if (!project) return;

    currentProjectId = projectId;

    titleEl.textContent = project.title;
    descEl.textContent = project.description;

    tagsEl.innerHTML = '';
    project.tags.forEach((t) => {
      const el = document.createElement('span');
      el.className = 'tag';
      el.textContent = t;
      tagsEl.appendChild(el);
    });

    buildSlides(getImages(project), project.title);

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    dialog.scrollTop = 0;
    setReadBtnState(false);
    setNavHidden(false);

    requestAnimationFrame(() => {
      content?.focus?.({ preventScroll: true });
    });
  };

  const closeModal = () => {
    if (!modal) return;

    modal.classList.remove('is-open');
    modal.classList.remove('nav-hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    currentProjectId = null;
    slidesCount = 0;
    current = 0;
    isReading = false;
  };

  document.querySelectorAll('[data-open]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const card = e.currentTarget.closest('.caseCard');
      const pid = card?.dataset.project;
      if (pid) openModal(pid);
    });
  });

  modal?.addEventListener('click', (e) => {
    const target = e.target;
    if (target?.matches?.('[data-close]')) closeModal();
  });

  prevBtn?.addEventListener('click', () => go(-1));
  nextBtn?.addEventListener('click', () => go(1));

  // read toggle: stable state
  readBtn?.addEventListener('click', () => {
    if (!dialog || !content) return;

    if (!isReading) {
      setReadBtnState(true);
      setNavHidden(true);
      scrollDialogToEl(content);
    } else {
      setReadBtnState(false);
      setNavHidden(false);
      dialog.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    }
  });

  // manual scroll: arrows hide/show, state does not blink
  let scrollRaf = 0;
  dialog?.addEventListener(
    'scroll',
    () => {
      if (!dialog || !content) return;
      if (scrollRaf) return;

      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;

        const y = dialog.scrollTop;

        // arrows fade
        if (y > 60) setNavHidden(true);
        if (y < 20) setNavHidden(false);

        // sync only near edges (avoid blinking on auto scroll)
        if (y < 30 && isReading) setReadBtnState(false);

        const contentTop =
          content.getBoundingClientRect().top - dialog.getBoundingClientRect().top + dialog.scrollTop;

        if (y + 140 >= contentTop && !isReading) setReadBtnState(true);
      });
    },
    { passive: true }
  );

  document.addEventListener('keydown', (e) => {
    if (!modal?.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  });

  // swipe
  if (modal && track) {
    let startX = 0;
    let dx = 0;
    let active = false;

    const onStart = (e) => {
      if (!modal.classList.contains('is-open')) return;
      active = true;
      dx = 0;
      startX = e.touches ? e.touches[0].clientX : e.clientX;
    };

    const onMove = (e) => {
      if (!active) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
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

  window.addEventListener('resize', () => {
    if (!modal?.classList.contains('is-open')) return;
    if (!currentProjectId) return;
    const project = projects[currentProjectId];
    buildSlides(getImages(project), project.title);
  });
})();
