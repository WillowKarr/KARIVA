document.addEventListener('DOMContentLoaded', () => {
  // ====== КЭШ DOM ======
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('header nav');
  const links = nav ? nav.querySelectorAll('a') : [];

  if (burger && nav) {
    // Подложка
    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'nav-overlay';
      document.body.appendChild(overlay);
    }

    // Открыть/закрыть
    const openMenu = () => {
      burger.classList.add('active');
      nav.classList.add('mobile-open');
      overlay.classList.add('visible');
      document.body.style.overflow = 'hidden';
      burger.setAttribute('aria-expanded', 'true');
    };
    const closeMenu = () => {
      burger.classList.remove('active');
      nav.classList.remove('mobile-open');
      overlay.classList.remove('visible');
      document.body.style.overflow = '';
      burger.setAttribute('aria-expanded', 'false');
    };

    burger.setAttribute('aria-label', 'Открыть меню');
    burger.setAttribute('aria-controls', 'site-nav');
    burger.setAttribute('aria-expanded', 'false');
    nav.setAttribute('id', 'site-nav');

    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.contains('mobile-open') ? closeMenu() : openMenu();
    });
    overlay.addEventListener('click', closeMenu);
    links.forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !burger.contains(e.target)) closeMenu();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 768) closeMenu(); });
  }

  // Плавный скролл
  document.querySelectorAll('header nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    });
  });

  // Элементы модалки портфолио
  const modal = document.getElementById('portfolioModal');
  const closeBtn = modal ? modal.querySelector('.close-modal') : null;
  const sliderContainer = modal ? modal.querySelector('.slider-container') : null;
  const prevBtn = modal ? modal.querySelector('.prev-slide') : null;
  const nextBtn = modal ? modal.querySelector('.next-slide') : null;
  const projectTitle = modal ? modal.querySelector('.project-title') : null;
  const projectDesc = modal ? modal.querySelector('.project-description p') : null;
  const projectTags = modal ? modal.querySelector('.project-tags') : null;
  const galleryItems = document.querySelectorAll('.gallery-item');

  // ====== ДАННЫЕ ПРОЕКТОВ (ВАШИ) ======
  const projects = {
    'logopotam': {
      title: 'Оформление соц. сетей Логопотам',
      description: 'Разработка визуальной айдентики для социальных сетей проекта «Логопотам» — сервиса онлайн-коррекции речи у детей. Созданы самостоятельные дизайн-коды под ключевые направления бренда с учетом целевой аудитории каждого. В зоне ответственности: верстка контента, оформление сторис и рекламных креативов, цветокоррекция и ретушь, отрисовка векторных иконок и иллюстраций, применение AI-инструментов для вариативности визуалов. Работа велась для VK и Telegram в тесной связке с SMM-командой. Итог — более 300 креативов по всем направлениям.',
      tags: ['Figma', 'Photoshop', 'Illustrator', 'II Grock'],
      images: [
        'element1.webp','element2.webp','element3.webp','element5.webp','element6.webp',
        'element7.webp','element8.webp','element9.webp','element10.webp','element11.webp'
      ]
    },
    'mebelsoft': {
      title: 'Фирменный стиль для мебельной фирмы МЕБЕЛЬ-SOFT',
      description: 'Разработка логотипа мебельного магазина: красное кресло в обрамлении желтого окна стало смысловым и визуальным ядром айдентики. Знак транслирует ценности бренда — современная элегантность, уют и индивидуальность. Контрастная пара «красный–желтый» формирует теплые ассоциации и динамику, силуэт кресла отсылает к классическим формам ар-нуво, подчеркивая связь с историей дизайна. Также на основе логотипа были созданы атрибуты фирменного стиля.',
      tags: ['Adobe Illustrator', 'Adobe Photoshop'],
      images: ['element12.webp','element13.webp','element14.webp','element15.webp']
    },
    'cofee': {
      title: 'Дизайн для кофейного стаканчика',
      description: 'Векторные иллюстрации для брендированных стаканчиков антикафе «Совиный дом». Первая иллюстрация — «весенний лес» с нейтральной, мягкой палитрой; силуэты сов, «выглядывающих» из листвы, создают фирменную атмосферу пространства. Позднее разработан летний вариант с абстрактными динамичными элементами, передающими ощущение зноя.',
      tags: ['Adobe Illustrator', 'Adobe Photoshop'],
      images: ['element16.webp','element18.webp','element19.webp']
    },
    'nashakuxnya': {
      title: 'Фирменный стиль для бренда "НАША КУХНЯ"',
      description: 'Комплексная айдентика для придорожного кафе-магазина с акцентом на семейную, «домашнюю» атмосферу. Разработаны логотип в виде персонажа, наслаждающегося шаурмой, теплая палитра и графические элементы с фуд-мотивами. Выполнены макеты для фасада и рекламных носителей. Результат — цельный визуальный образ, поддерживающий рост посещаемости и лояльности.',
      tags: ['Adobe Photoshop','Adobe Illustrator', 'Krita'],
      images: ['element20.webp','element21.webp','element22.webp','element23.webp']
    },
    'stickers': {
      title: 'Стикеры для Тбанк"',
      description: 'Стикерпак для корпоративного мероприятия KidsDay. Цели: укрепить взаимопонимание между родителями и детьми и повысить лояльность сотрудников и их семей. В результате создана серия забавных персонажей-детей, унаследовавших характерные черты работающих родителей.',
      tags: ['Adobe Illustrator'],
      images: ['element24.webp','element25.webp']
    },
    'marketplace': {
      title: 'Создание карточек товара на WB и OZON',
      description: 'Создание продающих карточек товаров для Wildberries и Ozon для магазинов из разных ниш. Процесс включает анализ целевой аудитории и требований площадок, разработку инфографики с УТП и характеристиками в минималистичном стиле, оптимизацию описаний с ключевыми словами, A/B-тестирование и итерационные доработки. Выполнены профессиональная предметная съемка на нейтральном фоне, многоракурсные кадры и ретушь.',
      tags: ['Adobe Illustrator,Adobe Photoshop, Figma, Stable Diffusion'],
      images: ['element26.webp','element27.webp','element28.webp','element29.webp','element30.webp','element31.webp']
    }
  };

  // ====== Кастомный курсор (как у вас) ======
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      setTimeout(() => {
        cursorFollower.style.left = `${e.clientX}px`;
        cursorFollower.style.top = `${e.clientY}px`;
      }, 100);
    });
    const hoverElements = document.querySelectorAll('a, button, .gallery-item, .social-link, .burger');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursorFollower.style.transform = 'scale(0.5)';
        cursorFollower.style.backgroundColor = 'transparent';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
        cursorFollower.style.backgroundColor = 'transparent';
      });
    });
  }

  // ====== Портфолио: модалка и слайдер ======
  let currentSlide = 0;

  function showSlide(index, slides) {
    if (!slides.length) return;
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    const offset = -currentSlide * 100;
    sliderContainer.style.transform = `translateX(${offset}%)`;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active-slide', i === currentSlide);
    });
  }

  if (galleryItems.length && modal && sliderContainer && projectTitle && projectDesc && projectTags) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const projectId = item.dataset.project;
        const project = projects[projectId];
        if (!project) return;

        // Заголовок/описание/теги
        projectTitle.textContent = project.title;
        projectDesc.textContent = project.description;

        projectTags.innerHTML = '';
        project.tags.forEach(tag => {
          const tagEl = document.createElement('span');
          tagEl.className = 'project-tag';
          tagEl.textContent = tag;
          projectTags.appendChild(tagEl);
        });

        // Картинки: если ширина ≤768 — подменяем путь на мобильные версии "elementmobileN.webp"
        const imagesToUse = (window.innerWidth <= 768)
          ? project.images.map(img => img.replace(/(element)(\d+)/, '$1mobile$2'))
          : project.images;

        sliderContainer.innerHTML = '';
        imagesToUse.forEach((img, index) => {
          const imgEl = document.createElement('img');
          imgEl.src = img;
          imgEl.alt = `${project.title} - ${index + 1}`;
          if (index === 0) imgEl.classList.add('active-slide');
          sliderContainer.appendChild(imgEl);
        });

        currentSlide = 0;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      });
    }

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        const slides = sliderContainer.querySelectorAll('img');
        showSlide(currentSlide - 1, slides);
      });
      nextBtn.addEventListener('click', () => {
        const slides = sliderContainer.querySelectorAll('img');
        showSlide(currentSlide + 1, slides);
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }

  // ====== Индикатор скролла для мобильных (из второго DOMContentLoaded) ======
  if (window.innerWidth <= 768) {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = '⌄';
    document.body.appendChild(scrollIndicator);

    let firstScrollHandled = false;

    const toggleIndicator = () => {
      if (window.scrollY < 100) {
        scrollIndicator.style.display = 'block';
      } else {
        scrollIndicator.style.display = 'none';
      }
      if (!firstScrollHandled && window.scrollY > 0) {
        firstScrollHandled = true;
        scrollIndicator.style.opacity = '0';
        setTimeout(() => { scrollIndicator.style.display = 'none'; }, 500);
      }
    };

    window.addEventListener('scroll', toggleIndicator, { passive: true });
    toggleIndicator();
  }
});






