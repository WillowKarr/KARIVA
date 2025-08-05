document.addEventListener('DOMContentLoaded', function() {
    // ========== Theme Toggle ==========
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const body = document.body;
        const icon = themeToggle.querySelector('i');
        
        // Проверяем сохранённую тему в localStorage
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark-mode') {
            body.classList.add('dark-mode');
            if (icon) icon.classList.replace('fa-moon', 'fa-sun');
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark-mode');
                if (icon) icon.classList.replace('fa-moon', 'fa-sun');
            } else {
                localStorage.setItem('theme', 'light-mode');
                if (icon) icon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }

    // ========== Burger Menu ==========
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('nav ul');
    
    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('open');
            burger.classList.toggle('active');
        });
    }

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
                description: 'Создавание уникальной визуальной айдентики...',
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
                description: 'Логотип, красное кресло в обрамлении желтого окна...',
                tags: ['Adobe Illustrator', 'Adobe Photoshop'],
                images: [
                    'img/mebelsoft/element13.png',
                    'img/mebelsoft/element14.png',
                    'img/mebelsoft/element15.png',
                    'img/mebelsoft/element16.png'
                ]
            },
            // ... остальные проекты
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





