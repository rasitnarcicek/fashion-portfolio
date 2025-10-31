document.addEventListener('DOMContentLoaded', () => {
    const rootStyles = getComputedStyle(document.documentElement);
    const accentColor = rootStyles.getPropertyValue('--color-accent').trim() || '#d6b77d';

    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const hamburgerBars = hamburger ? hamburger.querySelectorAll('.bar') : [];
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    let currentLightboxIndex = 0;
    let currentGallery = [];

    const animatedElements = document.querySelectorAll('[data-aos]');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        animatedElements.forEach(element => observer.observe(element));
    } else {
        animatedElements.forEach(element => element.classList.add('visible'));
    }

    function updateCurrentGallery() {
        currentGallery = Array.from(document.querySelectorAll('.portfolio-item:not(.hidden) .portfolio-image img'));
        if (!currentGallery.length) {
            currentGallery = Array.from(document.querySelectorAll('.portfolio-image img'));
        }
    }

    function handleNavbar() {
        if (!navbar) return;
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    function toggleMobileMenu() {
        if (!hamburger || !navMenu) return;
        navMenu.classList.toggle('open');
        const isOpen = navMenu.classList.contains('open');
        hamburger.setAttribute('aria-expanded', String(isOpen));

        hamburgerBars.forEach((bar, index) => {
            if (isOpen) {
                if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    }

    function closeMobileMenu() {
        if (!hamburger || !navMenu) return;
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburgerBars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    }

    function setActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    function showBackToTop() {
        if (!backToTop) return;
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }

    function smoothScroll(event) {
        const targetId = this.getAttribute('href');
        if (!targetId || !targetId.startsWith('#')) return;

        event.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        closeMobileMenu();
    }

    function handleScroll() {
        handleNavbar();
        setActiveNav();
        showBackToTop();
    }

    function filterPortfolio(category) {
        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'all' || itemCategory === category) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });

        updateCurrentGallery();
    }

    function openLightbox(imageElement) {
        if (!lightbox || !lightboxImage || !imageElement) return;
        updateCurrentGallery();

        currentLightboxIndex = currentGallery.indexOf(imageElement);
        if (currentLightboxIndex === -1) {
            currentGallery = Array.from(document.querySelectorAll('.portfolio-image img'));
            currentLightboxIndex = currentGallery.indexOf(imageElement);
        }

        if (currentLightboxIndex === -1) return;

        lightboxImage.src = imageElement.getAttribute('src');
        lightboxImage.alt = imageElement.getAttribute('alt') || 'Portfolio image';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('open');
        document.body.style.removeProperty('overflow');
    }

    function changeLightboxImage(direction) {
        if (!currentGallery.length) {
            updateCurrentGallery();
        }
        if (!currentGallery.length) return;

        currentLightboxIndex = (currentLightboxIndex + direction + currentGallery.length) % currentGallery.length;
        const nextImage = currentGallery[currentLightboxIndex];

        if (!nextImage) return;
        lightboxImage.src = nextImage.getAttribute('src');
        lightboxImage.alt = nextImage.getAttribute('alt') || 'Portfolio image';
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        if (!formMessage) return;

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }

        formMessage.style.opacity = '0';
        setTimeout(() => {
            showFormMessage('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
        }, 240);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.style.color = type === 'error' ? '#ff6b6b' : accentColor;
        formMessage.style.opacity = '1';

        setTimeout(() => {
            formMessage.style.opacity = '0';
        }, 5000);
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    navLinks.forEach(link => link.addEventListener('click', smoothScroll));

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterPortfolio(button.getAttribute('data-filter'));
        });
    });

    document.querySelectorAll('.btn-view').forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();
            const image = button.closest('.portfolio-item')?.querySelector('.portfolio-image img');
            if (image) {
                openLightbox(image);
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => changeLightboxImage(-1));
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => changeLightboxImage(1));
    }

    if (lightbox) {
        lightbox.addEventListener('click', event => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', event => {
        if (!lightbox || !lightbox.classList.contains('open')) return;

        switch (event.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                changeLightboxImage(-1);
                break;
            case 'ArrowRight':
                changeLightboxImage(1);
                break;
            default:
                break;
        }
    });

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            closeMobileMenu();
        }
    });

    handleNavbar();
    setActiveNav();
    showBackToTop();
    updateCurrentGallery();

    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    const style = document.createElement('style');
    style.textContent = `
        .hero-title-main,
        .hero-title-sub,
        .hero-description,
        .hero .btn-primary {
            opacity: 0;
        }

        body.loaded .hero-title-main,
        body.loaded .hero-title-sub {
            animation: fadeInUp 1s ease forwards;
        }

        body.loaded .hero-title-main {
            animation-delay: 0.2s;
        }

        body.loaded .hero-title-sub {
            animation-delay: 0.4s;
        }

        body.loaded .hero-description {
            animation: fadeInUp 1s ease forwards;
            animation-delay: 0.6s;
        }

        body.loaded .hero .btn-primary {
            animation: fadeInUp 1s ease forwards;
            animation-delay: 0.8s;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;

    document.head.appendChild(style);
});
