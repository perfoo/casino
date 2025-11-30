let currentLanguage = 'hr';

document.addEventListener('DOMContentLoaded', function() {
    initLanguageSwitcher();
    initSmoothScrolling();
    initScrollAnimations();
    initMobileMenu();
    initContactForm();
    updateCurrentYear();
    initHeaderScroll();
    initPrizeRulesToggle();
});

function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');

    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);

            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function switchLanguage(lang) {
    currentLanguage = lang;

    const elements = document.querySelectorAll('[data-hr][data-en]');

    elements.forEach(element => {
        const hrText = element.getAttribute('data-hr');
        const enText = element.getAttribute('data-en');

        if (lang === 'hr') {
            element.textContent = hrText;
        } else {
            element.textContent = enText;
        }
    });

    document.documentElement.lang = lang;
}

function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .hero-cta');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href.startsWith('#')) {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const headerOffset = 80;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    const navMenu = document.getElementById('navMenu');
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                    }
                }
            }
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');

        const spans = this.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    const statusElement = document.getElementById('formStatus');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const honeypot = form.querySelector('input[name="website"]');
        if (honeypot.value !== '') {
            return;
        }

        statusElement.textContent = '';

        const formData = new FormData(form);

        fetch(form.getAttribute('action'), {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                const successMessage = currentLanguage === 'hr'
                    ? 'Hvala vam! Vaša poruka je uspješno poslana. Odgovorit ćemo vam u najkraćem mogućem roku.'
                    : 'Thank you! Your message has been sent successfully. We will respond to you as soon as possible.';

                const errorMessage = currentLanguage === 'hr'
                    ? 'Došlo je do pogreške pri slanju poruke. Pokušajte ponovno.'
                    : 'There was an error sending your message. Please try again.';

                statusElement.textContent = data.message || (data.success ? successMessage : errorMessage);
                statusElement.dataset.status = data.success ? 'success' : 'error';

                if (data.success) {
                    form.reset();
                }
            })
            .catch(() => {
                const errorMessage = currentLanguage === 'hr'
                    ? 'Došlo je do pogreške pri slanju poruke. Pokušajte ponovno.'
                    : 'There was an error sending your message. Please try again.';
                statusElement.textContent = errorMessage;
                statusElement.dataset.status = 'error';
            });
    });
}

function updateCurrentYear() {
    const yearSpan = document.getElementById('currentYear');
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
}

function initHeaderScroll() {
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        }

        lastScroll = currentScroll;
    });
}

function initPrizeRulesToggle() {
    const toggleButton = document.getElementById('prizeRulesToggle');
    const rulesCard = document.getElementById('prizeRulesCard');

    if (!toggleButton || !rulesCard) return;

    toggleButton.addEventListener('click', () => {
        const isHidden = rulesCard.hasAttribute('hidden');

        if (isHidden) {
            rulesCard.removeAttribute('hidden');
        } else {
            rulesCard.setAttribute('hidden', '');
        }

        toggleButton.setAttribute('aria-expanded', String(isHidden));
        toggleButton.classList.toggle('open', isHidden);
    });
}
