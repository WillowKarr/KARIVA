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

    const hoverables = 'a, button, .social, .btn, .burger, [data-open], .navBtn, .iconBtn, .pbtn';
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

  // (8) ссылка "смотреть больше кейсов" — показываем только в marketplace
  const moreLink = modal?.querySelector('.caseMoreLink');
  const MORE_CASES_URL = 'https://disk.yandex.ru/d/xut7nHaZSw502g';

  const projects = {
 adoreswim: {
      title: 'Карточки товаров для купальников ADORESWIM',
      description:
        'Разработала единое визуальное оформление и обновила 160+ карточек товаров. Редизайн главной обложки и усиление визуальных акцентов дали рост CTR на +12%, а улучшение качества контента и подачи продукта — увеличение конверсии в заказ на +6%. За счёт внедрения шаблонов, стандартизации и распределения задач сократила время подготовки карточек примерно на 25%. Выполнила полную ретушь и перекрас изделий для 70+ изображений, а также смонтировала 10+ коротких видео для главной карточки товара и социальных сетей, усилив визуальную подачу продукта.',
      tags: ['Photoshop', 'Illustrator', 'Figma', 'Stable Diffusion', 'Midjourney', 'DALLE'],
      imagesDesktop: ['media/element1.webp','media/element2.webp','media/element3.webp'],
      imagesMobile: ['media/elementmobile1.webp','media/elementmobile2.webp', 'media/elementmobile3.webp','media/elementmobile4.webp','media/elementmobile5.webp','media/elementmobile6.webp', 'media/elementmobile7.webp','media/elementmobile8.webp','media/elementmobile9.webp']
    },

    meidianas: {
      title: 'Ведение магазина MEIDIANAS',
      description:
        'Дизайн для ≈480 карточек товаров . Провела полный редизайн магазина: внедрила единый визуальный стиль бренда, оформила магазин, разработала rich-контент. Внедрила стандарты оформления карточек и оформила брендбук, который стал основой единой системы дизайна для WB и Ozon. Также занималась разработкой рекламных баннеров. Обновление визуальной системы и структуры контента позволило вывести магазин на 9 место в категории «Обувь» на Ozon, обеспечить рост продаж на +175% за месяц и увеличить выручку на 169% за счёт усиления контента и презентации товаров.',
      tags: ['Photoshop', 'Adobe Illustrator', 'Figma', 'Stable Diffusion', 'Midjourney', 'Photoroom', 'Homiwork'],
      imagesDesktop: ['media/element4.webp','media/element5.webp','media/element6.webp','media/element7.webp'],
      imagesMobile: ['media/elementmobile10.webp','media/elementmobile11.webp','media/elementmobile12.webp', 'media/elementmobile13.webp','media/elementmobile14.webp','media/elementmobile15.webp','media/elementmobile16.webp','media/elementmobile17.webp','media/elementmobile18.webp','media/elementmobile19.webp','media/elementmobile20.webp','media/elementmobile21.webp']
    },
    
    marketplace: {
      title: 'Создание карточек товара на WB и OZON',
      description:
        'Создание продающих карточек товаров: анализ аудитории и требований площадок, инфографика с УТП, ретушь, итерационные доработки. Как результат в Meidiannas оформила ≈480 карточек и внедрила единую визуальную систему — рост продаж +175% за месяц, выручка +169% после обновления контента и 9 место в категории обувь OZON. В ADORE SWIM обновила 160+ карточек, повысив CTR обложки на +12% и конверсию в заказ на +6%, ускорив подготовку контента на ~25% благодаря шаблонам.',
      tags: ['Illustrator', 'Photoshop', 'Figma', 'Stable Diffusion', 'Photoroom', 'Midjourney'],
      imagesDesktop: ['media/element8.webp','media/element9.webp','media/element10.webp'],
      imagesMobile: ['media/elementmobile22.webp','media/elementmobile23.webp','media/elementmobile24.webp', 'media/elementmobile25.webp','media/elementmobile26.webp','media/elementmobile27.webp','media/elementmobile28.webp','media/elementmobile29.webp','media/elementmobile30.webp']
    },

     nashakuxnya: {
      title: 'Фирменный стиль для бренда "НАША КУХНЯ"',
      description:
        'Комплексная айдентика для придорожного кафе-магазина. Разработаны логотип, палитра, графические элементы и макеты носителей.',
      tags: ['Photoshop', 'Illustrator', 'Krita'],
      imagesDesktop: ['element20.webp','element21.webp','element22.webp','element23.webp'],
      imagesMobile: ['elementmobile59.webp','elementmobile60.webp','elementmobile61.webp','elementmobile62.webp']
    },

      mebelsoft: {
      title: 'Фирменный стиль для мебельной фирмы МЕБЕЛЬ-SOFT',
      description:
        'Разработка логотипа мебельного магазина: красное кресло в обрамлении желтого окна стало смысловым и визуальным ядром айдентики. Также на основе логотипа были созданы атрибуты фирменного стиля.',
      tags: ['Illustrator', 'Photoshop'],
      imagesDesktop: ['element12.webp','element13.webp','element14.webp','element15.webp'],
      imagesMobile: ['elementmobile24.webp','elementmobile25.webp','elementmobile26.webp','elementmobile27.webp','elementmobile28.webp']
    },

         santerra: {
      title: 'Фирменный стиль для академии тенниса «САНТЕРРА»"',
      description:
        'Комплексная айдентика для придорожного кафе-магазина. Разработаны логотип, палитра, графические элементы и макеты носителей.',
      tags: ['Photoshop', 'Illustrator', 'Krita'],
      imagesDesktop: ['element20.webp','element21.webp','element22.webp','element23.webp'],
      imagesMobile: ['elementmobile59.webp','elementmobile60.webp','elementmobile61.webp','elementmobile62.webp']
    },
      stickers: {
      title: 'Стикеры для Тбанк',
      description:
        'Стикерпак для корпоративного мероприятия KidsDay — дня, когда родители берут на работу детей. Серия персонажей, подготовка к печати.',
      tags: ['Illustrator'],
      imagesDesktop: ['element24.webp','element25.webp'],
      imagesMobile: ['elementmobile54.webp','elementmobile55.webp','elementmobile56.webp','elementmobile57.webp']
    },

      cofee: {
      title: 'Дизайн для кофейного стаканчика',
      description:
        'Векторные иллюстрации для брендированных стаканчиков антикафе «Совиный дом». Разработаны варианты под сезоны, графика готовилась под печать.',
      tags: ['Illustrator', 'Photoshop'],
      imagesDesktop: ['element16.webp','element18.webp','element19.webp'],
      imagesMobile: ['elementmobile31.webp','elementmobile32.webp','elementmobile33.webp','elementmobile34.webp']
    },

    logopotam: {
      title: 'Оформление соц. сетей Логопотам',
      description:
        'Разработка визуальной айдентики для социальных сетей проекта «Логопотам» — сервиса онлайн-коррекции речи у детей. Созданы самостоятельные дизайн-коды под ключевые направления бренда с учетом целевой аудитории каждого. В зоне ответственности: верстка контента, оформление сторис и рекламных креативов, цветокоррекция и ретушь, отрисовка векторных иконок и иллюстраций, применение AI-инструментов. Работа велась для VK и Telegram. Итог — более 300 креативов.',
      tags: ['Figma', 'Photoshop', 'Illustrator', 'AI'],
      imagesDesktop: ['element1.webp','element2.webp','element3.webp','element5.webp','element6.webp','element7.webp','element8.webp','element9.webp'],
      imagesMobile: ['elementmobile1.webp','elementmobile2.webp','elementmobile3.webp','elementmobile5.webp','elementmobile6.webp','elementmobile7.webp','elementmobile8.webp','elementmobile9.webp','elementmobile10.webp']
    },
};

  let current = 0;
  let slidesCount = 0;
  let currentProjectId = null;

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
      img.loading = idx === 0 ? 'eager' : 'lazy';
      slide.appendChild(img);
      track.appendChild(slide);
    });
    slidesCount = images.length;
    current = 0;
    setTransform();
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

    const projectsWithLink = ['adoreswim','marketplace', 'meidianas']
    const projectsLinks = [
        { id: 'adoreswim', link: 'https://disk.yandex.ru/d/xut7nHaZSw502g/ADORE%20SWIM%20%D0%BA%D1%83%D0%BF%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA%D0%B8' },
      { id: 'marketplace', link: 'https://disk.yandex.ru/d/xut7nHaZSw502g' },
      { id: 'meidianas', link: 'https://disk.yandex.ru/d/xut7nHaZSw502g/MEIDIANNAS%20%D0%BE%D0%B1%D1%83%D0%B2%D1%8C' },
    ]

    // (8) показываем/прячем "смотреть больше кейсов"
    console.log('test', moreLink, projectId, projectsWithLink.includes(projectId))
    if (moreLink) {
      const shouldShow = projectsWithLink.includes(projectId);
      moreLink.hidden = !shouldShow;
      if (shouldShow) {
        moreLink.style.display = 'inline-block'
        moreLink.href = projectsLinks.find((project) => project.id === projectId).link;
        moreLink.target = '_blank';
        moreLink.rel = 'noopener';
      } else {
        moreLink.removeAttribute('href');
        moreLink.style.display = 'none';
      }
    }

    buildSlides(getImages(project), project.title);

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    // всегда стартуем сверху, без режима "читать"
    dialog.scrollTop = 0;

    requestAnimationFrame(() => {
      const content = modal.querySelector('#caseContent');
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

    // (8) сбросить ссылку
    if (moreLink) {
      moreLink.hidden = true;
      moreLink.removeAttribute('href');
    }
  };

  // open handlers
  document.querySelectorAll('[data-open]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const card = e.currentTarget.closest('.caseCard');
      const pid = card?.dataset.project;
      if (pid) openModal(pid);
    });
  });

  // close handlers
  modal?.addEventListener('click', (e) => {
    const target = e.target;
    if (target?.matches?.('[data-close]')) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (!modal?.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  });

  // arrows (desktop + mobile per CSS)
  prevBtn?.addEventListener('click', () => go(-1));
  nextBtn?.addEventListener('click', () => go(1));

  // (9) swipe for mobile (и на тач-десктопах)
  if (modal && track) {
    let startX = 0;
    let dx = 0;
    let active = false;

    const onStart = (e) => {
      if (!modal.classList.contains('is-open')) return;
      // игнорируем свайп по кнопкам/ссылкам
      if (e.target.closest('button, a')) return;

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

  // rebuild on resize to swap mobile/desktop image sets (while modal open)
  window.addEventListener('resize', () => {
    if (!modal?.classList.contains('is-open')) return;
    if (!currentProjectId) return;
    const project = projects[currentProjectId];
    buildSlides(getImages(project), project.title);
  });

  // ===== Optional: subtle “tilt” on PROCESS cards (desktop) =====
  const stepBodies = Array.from(document.querySelectorAll('.step__body'));
  if (!prefersReduced && !isCoarse && stepBodies.length) {
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    stepBodies.forEach((card) => {
      let r = 0;
      const onMove = (e) => {
        if (r) return;
        r = requestAnimationFrame(() => {
          r = 0;
          const rect = card.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = (e.clientX - cx) / rect.width;
          const dy = (e.clientY - cy) / rect.height;
          const rx = clamp((-dy) * 6, -6, 6);
          const ry = clamp((dx) * 8, -8, 8);
          card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
        });
      };

      const onLeave = () => {
        card.style.transform = '';
      };

      card.addEventListener('mousemove', onMove, { passive: true });
      card.addEventListener('mouseleave', onLeave, { passive: true });
    });
  }
})();




