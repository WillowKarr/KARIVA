   document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('feedbackForm');
            const successMessage = document.getElementById('successMessage');
            
            // Валидация формы
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                let isValid = true;
                
                // Проверка имени
                const name = document.getElementById('name');
                const nameError = document.getElementById('nameError');
                if (name.value.trim() === '') {
                    nameError.style.display = 'block';
                    name.style.borderColor = '#e74c3c';
                    isValid = false;
                } else {
                    nameError.style.display = 'none';
                    name.style.borderColor = '#dfe6e9';
                }
                
                // Проверка email
                const email = document.getElementById('email');
                const emailError = document.getElementById('emailError');
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email.value)) {
                    emailError.style.display = 'block';
                    email.style.borderColor = '#e74c3c';
                    isValid = false;
                } else {
                    emailError.style.display = 'none';
                    email.style.borderColor = '#dfe6e9';
                }
                
                // Проверка сообщения
                const message = document.getElementById('message');
                const messageError = document.getElementById('messageError');
                if (message.value.trim() === '') {
                    messageError.style.display = 'block';
                    message.style.borderColor = '#e74c3c';
                    isValid = false;
                } else {
                    messageError.style.display = 'none';
                    message.style.borderColor = '#dfe6e9';
                }
                
                // Если форма валидна
                if (isValid) {
                    // Здесь можно добавить AJAX-запрос для отправки формы
                    // Для примера просто покажем сообщение об успехе
                    form.style.display = 'none';
                    successMessage.style.display = 'block';
                    
                    // Очистка формы через 5 секунд
                    setTimeout(() => {
                        form.reset();
                        form.style.display = 'block';
                        successMessage.style.display = 'none';
                    }, 5000);
                }
            });
            
            // Анимация при наведении на социальные иконки
            const socialLinks = document.querySelectorAll('.social-link');
            socialLinks.forEach(link => {
                link.addEventListener('mouseenter', function() {
                    const icon = this.querySelector('i');
                    icon.style.transform = 'rotate(15deg)';
                });
                
                link.addEventListener('mouseleave', function() {
                    const icon = this.querySelector('i');
                    icon.style.transform = 'rotate(0)';
                });
            });
        });
		 // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved user preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark-mode');
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('theme', '');
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    // Burger Menu
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('nav ul');

    burger.addEventListener('click', () => {
        nav.classList.toggle('open');
        burger.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (nav.classList.contains('open')) {
                nav.classList.remove('open');
                burger.classList.remove('active');
            }
        });
    });

    // Scroll animations
    function checkScroll() {
        // About section scale animation
        const aboutSection = document.querySelector('.about');
        const aboutContent = document.querySelector('.about-content');
        const aboutPosition = aboutSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (aboutPosition < screenPosition) {
            aboutContent.classList.add('active');
        }

        // Timeline items animation
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            const itemPosition = item.getBoundingClientRect().top;
            if (itemPosition < screenPosition) {
                setTimeout(() => {
                    item.classList.add('active');
                }, index * 200);
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    window.addEventListener('load', checkScroll);

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    // Cursor effects on hover
    const hoverElements = document.querySelectorAll('a, button, .project-card, .social-link, .burger');
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

    // Modal functionality
    const projectButtons = document.querySelectorAll('.project-btn');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    const prevButtons = document.querySelectorAll('.prev-slide');
    const nextButtons = document.querySelectorAll('.next-slide');

    // Open modal
    projectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Reset slider position
            const slider = modal.querySelector('.modal-slider');
            slider.style.transform = 'translateX(0)';
            
            // Show modal with animation
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        });
    });

    // Close modal
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        });
    });

    // Close when clicking outside modal content
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        });
    });

    // Modal slider functionality
    modals.forEach(modal => {
        const slider = modal.querySelector('.modal-slider');
        const slides = modal.querySelectorAll('.modal-slide');
        const prevBtn = modal.querySelector('.prev-slide');
        const nextBtn = modal.querySelector('.next-slide');
        let currentSlide = 0;
        const slideCount = slides.length;

        function goToSlide(index) {
            if (index < 0) index = slideCount - 1;
            if (index >= slideCount) index = 0;
            currentSlide = index;
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                goToSlide(currentSlide - 1);
            });

            nextBtn.addEventListener('click', () => {
                goToSlide(currentSlide + 1);
            });
        }
    });

    // Form validation
    const form = document.getElementById('feedbackForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Name validation
        if (nameInput.value.trim() === '') {
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }

        // Message validation
        if (messageInput.value.trim() === '') {
            messageError.style.display = 'block';
            isValid = false;
        } else {
            messageError.style.display = 'none';
        }

        if (isValid) {
            // Here you would typically send the form data to a server
            alert('Сообщение отправлено! Спасибо за ваше обращение.');
            form.reset();
        }
    });

    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers without native lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const lazyLoad = () => {
            lazyImages.forEach(img => {
                if (img.getBoundingClientRect().top < window.innerHeight + 100) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
            });
        };

        window.addEventListener('load', lazyLoad);
        window.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
    }
	
	// JavaScript для работы модального окна
document.addEventListener('DOMContentLoaded', function() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('portfolioModal');
  const closeBtn = document.querySelector('.close-modal');
  const sliderContainer = document.querySelector('.slider-container');
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');
  const projectTitle = document.querySelector('.project-title');
  const projectDesc = document.querySelector('.project-description p');
  const projectTags = document.querySelector('.project-tags');
  
  // Данные проектов (можно заменить на динамическую загрузку)
  const projects = {
    'logopotam': {
      title: 'Оформление соц. сетей Логопотам',
      description: 'Создавание уникальной визуальной айдентики, для нескольких направлений Логопотам (приложение, лого, психология) учитывающей ЦА каждого из направлений бренда. Разработка графических концепций и адаптаций дизайн под соцсети. В мои задачи входила вёрстка контента, оформление сторис и рекламных креативов, цветокоррекция и ретушь, а также отрисовка векторных иконок и изображений, работа с нейросетями. Работала с платформами VK и Telegram, тесно взаимодействовала с SMM-командой, чтобы контент оставался стильным и эффективным. В было создано 300+ креативов для всех направлений компании.',
      tags: ['Figma', 'Photoshop', 'Illustrator', 'II Grock'],
      images: [
        'element1.png',
        'element2.png',
        'element3.png',
		'element4.png'
      ]
    },
    'circusdolls': {
      title: 'Цирковая коллекция кукол',
      description: 'Серия уникальных кукол, воплощающих образы цирковых артистов: от эксцентричных клоунов до грациозных гимнастов. Каждая кукла на проволочном каркасе, некоторые элементы слеплены из глины. Образы дополняют сложные детализированные костюмы ручной работы.  Коллекция передает магию цирка через призму авторского художественного видения с индивидуальной проработкой каждого характера.',
      tags: ['Лепка', 'Рукоделие', 'Шитье'],
      images: [
        'element5.png',
        'element6.png',
        'element7.png',
		'element8.png'
      ]
    },
		  'autumnart': {
      title: 'Осенние иллюстрации',
      description: 'Серия иллюстраций выполнена в мрачной, меланхоличной эстетике с имитацией фактуры восковых мелков и угля. Цветовая палитра построена на глубоких охристых, тускло-бордовых и свинцово-серых тонах с акцентными охристыми цветами. Иллюстрации можно использовать в качестве открыток, значков, стикеров.',
      tags: ['Adobe Photoshop', 'Krita'],
      images: [
        'element9.png',
        'element10.png',
		'element12.png'
      ]
    },
		'mebelsoft': {
      title: 'Фирменный стиль для мебельной фирмы МЕБЕЛЬ-SOFT',
      description: 'Логотип, красное кресло в обрамлении желтого окна, стал смысловым и визуальным центром всей айдентики мебельного магазина. Он передает ценности компании: элегантность модерна, уют и индивидуальность.Кресло, выполненное в насыщенном красном, символизирует комфорт и смелый дизайн, а желтое окно добавляет теплоту и ассоциации с естественным светом, простором и открытостью. Контраст цветов делает логотип динамичным и запоминающимся, а силуэт кресла отсылает к классическим формам ар-нуво, подчеркивая связь с историей дизайна.Логотип работает как самостоятельный графический символ: его можно обыгрывать в рекламе, использовать в паттернах или даже как элемент интерьера, усиливая связь бренда с темой стильной и продуманной мебели.',
      tags: ['Adobe Illustrator', 'Adobe Photoshop'],
      images: [
        'element13.png',
        'element14.png',
        'element15.png',
		'element16.png'
      ]
    },
		'girlandmonster': {
      title: 'Иллюстрация Девочка и монстр',
      description: 'Иллюстрация разработана по эскизу заказчика в фантезийной, сказочной эстетике. Монстр приглашает девочку в волшебный мир, важно было переддать дружелюбное настроение монстра и радость персонажа. Также работа была адаптирована под разные форматы для печати на футболке и настенном гобелене.',
      tags: ['Adobe Photoshop'],
      images: [
        'element17.png',
		'element18.png'
      ]
    },
		'aurora': {
      title: 'Лендинг Аврора',
      description: '<a href="https://aurora-cafe.ru/" target="_blank" rel="noopener noreferrer">Разработка лендинга для столовой «АВРОРА»</a> началась с анализа фирменного стиля заведения и утверждения цветовой схемы (зеленый, красный, белый). В Figma был создан детализированный макет, продумана структура блоков: приветственный экран с отснятым видео столовой, раздел с меню, информация о работе заведения и контакты. После утверждения дизайна макет с компонентами и autolayout был перенесен в Tilda с помощью zeroblock. Настроена адаптивная верстка под мобильные устройства.',
      tags: ['Figma', 'Tilda', 'Adobe Illustrator'],
      images: [
        'element19.png'
      ]
    },
		'random': {
      title: 'Посты-афиши для мероприятий',
      description: 'Проект заключался в создании визуального контента и продвижении игроночей по играм Fran Bow и Sally Face для ивент-коммуны <a href="https://t.me/random_culture" target="_blank" rel="noopener noreferrer">Рандом Культуры</a>. В мои задачи входила отрисовка растровых изображений для афиш и соцсетей, написание постов, а также организация публикаций для привлечения аудитории к мероприятиям. Работа была направлена на усиление визуальной идентичности событий и повышение их узнаваемости среди целевой аудитории.',
      tags: ['Procreate', 'Krita'],
      images: [
        'element20.png',
		'element21.png'
      ]
    },
		'cofee': {
      title: 'Дизайн для кофейного стаканчика',
      description: 'Разработка векторной иллюстрации для брендированных стаканчиков «Совиного Дома». Иллюстрация выполнена в стиле весеннего леса, цвеовая гамма нейтральная, нежная. тут и там выглядывающие совы ключ атмосферы совиного антикафе.',
	  tags: ['Procreate', 'Krita'],
      images: [
		'element22.png'
      ]
    },
			'journal': {
      title: 'Вёрстка журнала "Швейцарская школа графики 50-70ых годов"',
      description: 'На разворотах журнала "Как в Аптеке. Швейцарская школа графики 50-70ых годов" реализованы принципы швейцарской верстки: строгая модульная сетка, асимметричная композиция, минималистичная типографика с контрастом шрифтов и выразительными геометричными акцентами. Использование чёрно-белой палитры с добавлением цвета подчёркивает структуру и визуальную иерархию.  В этом проекте особое внимание уделено негативному пространству, которое создает целостность композиции каждого разворота.',
	  tags: ['Adobe InDesign', 'Adobe Photoshop'],
      images: [
		'element23.png',
		'element24.png',
		'element25.png',
		'element26.png',
		'element27.png'
      ]
    },
			'dolls': {
      title: 'Куклы на свободную тематику',
      description: 'Серия авторских кукол, выполненная в едином минималистичном стиле и технике. Предназначены для продажи, выставок и конкурсов. Включает в себя куклу Эндрю — черно-белого персонажа, от лица которого велся TikTok-аккаунт с stop-motion анимацией, что способствовало продвижению творчества.',
	  tags: ['Лепка', 'Рукоделие', 'Шитье'],
      images: [
		'element28.png',
		'element29.png',
		'element30.png'
      ]
    },
				'nashakuxnya': {
      title: 'Фирменный стиль для бренда "НАША КУХНЯ"',
      description: 'Создание комплексной айдентики для придорожного кафе-магазина с акцентом на уютную семейную атмосферу: разработан логотип, в виде человека, поедающего шаурму, яркая цветовая палитра и графические элементы в виде еды в теплой, «домашней» стилистике. Разработан дизайн для фасада с яркими акцентами, дизайн рекламных носителей: баннеры, листовки, посты для соцсетей. Результат — целостный образ, увеличивающий посещаемость и лояльность аудитории.',
	  tags: ['Adobe Photoshop','Adobe Illustrator', 'Krita'],
      images: [
		'element31.png',
		'element32.png',
		'element33.png',
		'element34.png'
      ]
    },
				'karmash': {
      title: 'Фирменный стиль для бренда "КАРМАШ"',
      description: 'Бренд «Кармаш» создаёт авторских кукол из глины на проволочном каркасе, создавая уникальных кукол. Чтобы усилить узнаваемость бренда, был разработан фирменный стиль, отражающий личность автора кукол:  основной символ ворон  — игра с фамилией автора, а звезды обозначают уникальность каждой куклы. Ключевым элементом стала брендированная упаковка в виде стилизованной кроватки, добавляющая ценности продукту и усиливая эмоциональную связь с покупателем.',
	  tags: ['Adobe Photoshop','Adobe Illustrator', 'Krita','Лепка', 'Рукоделие', 'Шитье'],
      images: [
		'element39.png',
		'element40.png',
		'element41.png'
      ]
    },
					'tatoo': {
      title: 'Татуировки',
      description: 'Проект представляет собой разработку индивидуальных эскизов для татуировок с полным погружением в запросы клиента — от концепции до финальных правок. Каждый эскиз создаётся как уникальный символ, отражающий личную историю или значимый образ, предназначенный для постоянного ношения.',
	  tags: ['Adobe Illustrator', 'Krita'],
      images: [
		'element42.png',
		'element43.png'
      ]
    },
						'logo': {
      title: 'Логотип для спортивной команды "Феникс"',
      description: 'Создание логотипа для футбольной команды "Феникс" в двух цветовых вариациях, проведение предпечатной подготовки логотипа для печати его на футболках',
	  tags: ['Adobe Illustrator'],
      images: [
		'element35.png',
		'element36.png',
		'element37.png',
		'element38.png'
      ]
    },
						'stickers': {
      title: 'Стикеры для Тбанк"',
      description: 'Цель мероприятия KidsDay, которому посвящен стикерпак:Укрепить взаимопонимание между родителями и детьми и повысить лояльность сотрудников и их семей. В итоге вышел забавный стикерпак с детьми, которые переняли основные черты работающих родителей.',
	  tags: ['Adobe Illustrator'],
      images: [
		'element44.png',
		'element45.png'
      ]
    },
  };
  
  // Открытие модального окна
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const projectId = this.dataset.project;
      const project = projects[projectId];
      
      // Заполняем данными
      projectTitle.textContent = project.title;
      projectDesc.innerHTML = project.description;
      
      // Очищаем теги
      projectTags.innerHTML = '';
      project.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'project-tag';
        tagElement.textContent = tag;
        projectTags.appendChild(tagElement);
      });
      
      // Очищаем слайдер и добавляем изображения
      sliderContainer.innerHTML = '';
      project.images.forEach((img, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = img;
        imgElement.alt = `${project.title} - ${index + 1}`;
        if(index === 0) imgElement.classList.add('active-slide');
        sliderContainer.appendChild(imgElement);
      });
      
      // Показываем модальное окно
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Закрытие модального окна
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  
  // Навигация слайдера
  let currentSlide = 0;
  
  function updateSlider() {
    const offset = -currentSlide * 100;
    sliderContainer.style.transform = `translateX(${offset}%)`;
  }
  
  nextBtn.addEventListener('click', function() {
    const slides = document.querySelectorAll('.slider-container img');
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
  });
  
  prevBtn.addEventListener('click', function() {
    const slides = document.querySelectorAll('.slider-container img');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
  });
  
  // Закрытие по клику вне окна
  modal.addEventListener('click', function(e) {
    if(e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


