document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('nav');
    
    burger.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Закрытие при клике на ссылку
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Закрытие при клике вне меню
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !burger.contains(e.target)) {
            burger.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
});
    // ========== Smooth Scrolling ==========
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Закрываем мобильное меню, если открыто
                if (nav && nav.classList.contains('open')) {
                    nav.classList.remove('open');
                    if (burger) burger.classList.remove('active');
                }
            }
        });
    });

    // ========== Custom Cursor ==========
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

        // Эффекты при наведении
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

    // ========== Portfolio Modal ==========
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('portfolioModal');
    
    if (galleryItems.length && modal) {
        const closeBtn = modal.querySelector('.close-modal');
        const sliderContainer = modal.querySelector('.slider-container');
        const prevBtn = modal.querySelector('.prev-slide');
        const nextBtn = modal.querySelector('.next-slide');
        const projectTitle = modal.querySelector('.project-title');
        const projectDesc = modal.querySelector('.project-description p');
        const projectTags = modal.querySelector('.project-tags');
        
        // Данные проектов
        const projects = {
            'logopotam': {
                title: 'Оформление соц. сетей Логопотам',
                description: 'Создание уникальной визуальной айдентики, для соц. сетей Логопотам - компании, специализирующейся на онлайн коррекции речи у детей. Всего было создано 4 уникальных дизайн- кода под каждое направление компании (приложение, лого, психология) учитывающей ЦА каждого из направлений бренда. В мои задачи входила вёрстка контента, оформление сторис и рекламных креативов, цветокоррекция и ретушь, а также отрисовка векторных иконок и изображений, работа с нейросетями. Работала с платформами VK и Telegram, тесно взаимодействовала с SMM-командой, чтобы контент оставался стильным и эффективным. В было создано 300+ креативов для всех направлений компании',
                tags: ['Figma', 'Photoshop', 'Illustrator', 'II Grock'],
                images: [
                    'element1.webp',
                    'element2.webp',
                    'element3.webp',
                    'element5.webp',
                    'element6.webp',
                    'element7.webp',
                    'element8.webp',
                    'element9.webp',
                    'element10.webp',
                    'element11.webp'
                ]
            },
            'mebelsoft': {
                title: 'Фирменный стиль для мебельной фирмы МЕБЕЛЬ-SOFT',
                description: 'Логотип, красное кресло в обрамлении желтого окна, стал смысловым и визуальным центром всей айдентики мебельного магазина. Он передает ценности компании: элегантность модерна, уют и индивидуальность.Кресло, выполненное в насыщенном красном, символизирует комфорт и смелый дизайн, а желтое окно добавляет теплоту и ассоциации с естественным светом, простором. Контраст цветов делает логотип динамичным и запоминающимся, а силуэт кресла отсылает к классическим формам ар-нуво, подчеркивая связь с историей дизайна.Логотип работает как самостоятельный графический символ: его можно обыгрывать в рекламе, использовать в паттернах или даже как элемент интерьера, усиливая связь бренда с темой стильной и продуманной мебели',
                tags: ['Adobe Illustrator', 'Adobe Photoshop'],
                images: [
                    'element12.webp',
                    'element13.webp',
                    'element14.webp',
                    'element15.webp',
                ]
            },
             'cofee': {
                title: 'Дизайн для кофейного стаканчика',
                description: 'Разработка векторной иллюстрации для брендированных стаканчиков «Совиного Дома» - атикафе с совами внутри. Первая иллюстрация выполнена в стиле весеннего леса, цвеовая гамма нейтральная, нежная. тут и там выглядывающие совы ключ атмосферы совиного антикафе. Позже был разработан и летний дизайн с яркими абстрактными элементами, имитирующими летний зной',
                tags: ['Adobe Illustrator', 'Adobe Photoshop'],
                images: [
                   'element16.webp',
                    'element18.webp',
                    'element19.webp'
                ]
            },
             'nashakuxnya': {
      title: 'Фирменный стиль для бренда "НАША КУХНЯ"',
      description: 'Создание комплексной айдентики для придорожного кафе-магазина с акцентом на уютную семейную атмосферу: разработан логотип, в виде человека, поедающего шаурму, яркая цветовая палитра и графические элементы в виде еды в теплой, «домашней» стилистике. Разработан дизайн для фасада с яркими акцентами, дизайн рекламных носителей: баннеры, листовки, посты для соцсетей. Результат — целостный образ, увеличивающий посещаемость и лояльность аудитории.',
      tags: ['Adobe Photoshop','Adobe Illustrator', 'Krita'],
      images: [
        'element20.webp',
         'element21.webp',
         'element22.webp',
         'element23.webp'
      ]
    },
                'stickers': {
      title: 'Стикеры для Тбанк"',
      description: 'Цель мероприятия KidsDay, которому посвящен стикерпак:Укрепить взаимопонимание между родителями и детьми и повысить лояльность сотрудников и их семей. В итоге вышел забавный стикерпак с детьми, которые переняли основные черты работающих родителей.',
      tags: ['Adobe Illustrator'],
      images: [
        'element24.webp',
         'element25.webp'
      ]
    },
         'marketplace': {
      title: 'Создание карточек товара на WB и OZON',
      description: 'Процесс создания продающих карточек товаров для WB и Ozon для различных магазинов включает анализ ЦА и требований маркетплейсов, создание инфографики с УТП и техническими характеристиками в минималистичном стиле, оптимизацию текста с ключевыми словами и четким описанием, A/B-тестирование и доработку на основе аналитики. А также профессиональную фотосъемку с нейтральным фоном и несколькими ракурсами, ретушь.',
      tags: ['Adobe Illustrator,Adobe Photoshop, Figma, Stable Diffusion'],
      images: [
        'element26.webp',
         'element27.webp',
         'element28.webp',
         'element29.webp',
        'element30.webp',
         'element31.webp'
      ]
    },
  };
        
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
        
        // Открытие модального окна
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const projectId = this.dataset.project;
                const project = projects[projectId];
                
                if (!project) return;
                
                // Заполняем данными
                projectTitle.textContent = project.title;
                projectDesc.textContent = project.description;
                
                // Очищаем и добавляем теги
                projectTags.innerHTML = '';
                project.tags.forEach(tag => {
                    const tagElement = document.createElement('span');
                    tagElement.className = 'project-tag';
                    tagElement.textContent = tag;
                    projectTags.appendChild(tagElement);
                });
                
                // Очищаем и добавляем изображения
                sliderContainer.innerHTML = '';
                project.images.forEach((img, index) => {
                    const imgElement = document.createElement('img');
                    imgElement.src = img;
                    imgElement.alt = `${project.title} - ${index + 1}`;
                    if (index === 0) imgElement.classList.add('active-slide');
                    sliderContainer.appendChild(imgElement);
                });
                
                // Сбрасываем счётчик слайдов
                currentSlide = 0;
                
                // Показываем модальное окно
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Закрытие модального окна
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        // Навигация по слайдам
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', function() {
                const slides = document.querySelectorAll('.slider-container img');
                showSlide(currentSlide - 1, slides);
            });
            
            nextBtn.addEventListener('click', function() {
                const slides = document.querySelectorAll('.slider-container img');
                showSlide(currentSlide + 1, slides);
            });
        }
        
        // Закрытие при клике вне окна
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});
        
        // Прячем индикатор после первого скролла
        let scrolled = false;
        window.addEventListener('scroll', function() {
            if (!scrolled) {
                scrollIndicator.style.opacity = '0';
                setTimeout(() => {
                    scrollIndicator.style.display = 'none';
                }, 500);
                scrolled = true;
            }
        });
    }
    
    // Для модального окна - адаптация изображений
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                const projectId = this.dataset.project;
                const project = projects[projectId];
                
                if (project) {
                    project.images = project.images.map(img => 
                        img.replace(/(element)(\d+)/, '$1mobile$2')
                    );
                }
            });
        });
    }
});



