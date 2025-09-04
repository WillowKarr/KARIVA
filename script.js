document.addEventListener('DOMContentLoaded', () => {
  // ====== КЭШ DOM ======
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('header nav');
  const links = nav ? nav.querySelectorAll('a') : [];

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
      description: 'Создание уникальной визуальной айдентики, для соц. сетей Логопотам - компании, специализирующейся на онлайн коррекции речи у детей. Всего было создано 4 уникальных дизайн- кода под каждое направление компании (приложение, лого, психология) учитывающей ЦА каждого из направлений бренда. В мои задачи входила вёрстка контента, оформление сторис и рекламных креативов, цветокоррекция и ретушь, а также отрисовка векторных иконок и изображений, работа с нейросетями. Работала с платформами VK и Telegram, тесно взаимодействовала с SMM-командой, чтобы контент оставался стильным и эффективным. В было создано 300+ креативов для всех направлений компании',
      tags: ['Figma', 'Photoshop', 'Illustrator', 'II Grock'],
      images: [
        'element1.webp','element2.webp','element3.webp','element5.webp','element6.webp',
        'element7.webp','element8.webp','element9.webp','element10.webp','element11.webp'
      ]
    },
    'mebelsoft': {
      title: 'Фирменный стиль для мебельной фирмы МЕБЕЛЬ-SOFT',
      description: 'Логотип, красное кресло в обрамлении желтого окна, стал смысловым и визуальным центром всей айдентики мебельного магазина. Он передает ценности компании: элегантность модерна, уют и индивидуальность.Кресло, выполненное в насыщенном красном, символизирует комфорт и смелый дизайн, а желтое окно добавляет теплоту и ассоциации с естественным светом, простором. Контраст цветов делает логотип динамичным и запоминающимся, а силуэт кресла отсылает к классическим формам ар-нуво, подчеркивая связь с историей дизайна.Логотип работает как самостоятельный графический символ: его можно обыгрывать в рекламе, использовать в паттернах или даже как элемент интерьера, усиливая связь бренда с темой стильной и продуманной мебели',
      tags: ['Adobe Illustrator', 'Adobe Photoshop'],
      images: ['element12.webp','element13.webp','element14.webp','element15.webp']
    },
    'cofee': {
      title: 'Дизайн для кофейного стаканчика',
      description: 'Разработка векторной иллюстрации для брендированных стаканчиков «Совиного Дома» - атикафе с совами внутри. Первая иллюстрация выполнена в стиле весеннего леса, цвеовая гамма нейтральная, нежная. тут и там выглядывающие совы ключ атмосферы совиного антикафе. Позже был разработан и летний дизайн с яркими абстрактными элементами, имитирующими летний зной',
      tags: ['Adobe Illustrator', 'Adobe Photoshop'],
      images: ['element16.webp','element18.webp','element19.webp']
    },
    'nashakuxnya': {
      title: 'Фирменный стиль для бренда "НАША КУХНЯ"',
      description: 'Создание комплексной айдентики для придорожного кафе-магазина с акцентом на уютную семейную атмосферу: разработан логотип, в виде человека, поедающего шаурму, яркая цветовая палитра и графические элементы в виде еды в теплой, «домашней» стилистике. Разработан дизайн для фасада с яркими акцентами, дизайн рекламных носителей: баннеры, листовки, посты для соцсетей. Результат — целостный образ, увеличивающий посещаемость и лояльность аудитории.',
      tags: ['Adobe Photoshop','Adobe Illustrator', 'Krita'],
      images: ['element20.webp','element21.webp','element22.webp','element23.webp']
    },
    'stickers': {
      title: 'Стикеры для Тбанк"',
      description: 'Цель мероприятия KidsDay, которому посвящен стикерпак:Укрепить взаимопонимание между родителями и детьми и повысить лояльность сотрудников и их семей. В итоге вышел забавный стикерпак с детьми, которые переняли основные черты работающих родителей.',
      tags: ['Adobe Illustrator'],
      images: ['element24.webp','element25.webp']
    },
    'marketplace': {
      title: 'Создание карточек товара на WB и OZON',
      description: 'Процесс создания продающих карточек товаров для WB и Ozon для различных магазинов включает анализ ЦА и требований маркетплейсов, создание инфографики с УТП и техническими характеристиками в минималистичном стиле, оптимизацию текста с ключевыми словами и четким описанием, A/B-тестирование и доработку на основе аналитики. А также профессиональную фотосъемку с нейтральным фоном и несколькими ракурсами, ретушь.',
      tags: ['Adobe Illustrator,Adobe Photoshop, Figma, Stable Diffusion'],
      images: ['element26.webp','element27.webp','element28.webp','element29.webp','element30.webp','element31.webp']
    }
  };

  // ====== БУРГЕР-МЕНЮ ======
  if (burger && nav) {
    const openMenu = () => {
      burger.classList.add('active');
      nav.classList.add('mobile-open');
      document.body.style.overflow = 'hidden';
      burger.setAttribute('aria-expanded', 'true');
    };
    const closeMenu = () => {
      burger.classList.remove('active');
      nav.classList.remove('mobile-open');
      document.body.style.overflow = '';
      burger.setAttribute('aria-expanded', 'false');
    };

    burger.setAttribute('aria-label', 'Открыть меню');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-controls', 'site-nav');
    nav.setAttribute('id', 'site-nav');

    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.contains('mobile-open') ? closeMenu() : openMenu();
    });

    links.forEach((a) => a.addEventListener('click', closeMenu));

    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !burger.contains(e.target)) closeMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  // ====== Smooth Scrolling (внутри того же DOMContentLoaded!) ======
  document.querySelectorAll('header nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
      if (nav && nav.classList.contains('mobile-open')) {
        // корректно закрываем именно мобильное меню
        nav.classList.remove('mobile-open');
        burger && burger.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

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


