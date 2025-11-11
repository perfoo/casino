// Utility to handle smooth scrolling for navigation links
const smoothScrollLinks = document.querySelectorAll('[data-scroll]');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

smoothScrollLinks.forEach(link => {
    link.addEventListener('click', event => {
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            // Close mobile navigation after selecting an item
            if (nav.classList.contains('open')) {
                nav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
});

// Toggle navigation on small screens
if (navToggle) {
    navToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

// Language switching logic
const languageButtons = document.querySelectorAll('.lang-btn');
const translatableElements = document.querySelectorAll('[data-lang]');
const defaultLanguage = 'hr';

function setLanguage(language) {
    translatableElements.forEach(element => {
        const elementLang = element.getAttribute('data-lang');
        if (elementLang === language) {
            element.classList.add('show');
        } else {
            element.classList.remove('show');
        }
    });

    languageButtons.forEach(button => {
        button.classList.toggle('active', button.dataset.language === language);
    });

    document.documentElement.lang = language;
}

languageButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedLanguage = button.dataset.language;
        setLanguage(selectedLanguage);
    });
});

// Initialize language on page load
setLanguage(defaultLanguage);

// Intersection Observer for fade-in animations
const observersTargets = document.querySelectorAll('[data-observe]');
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.2
    }
);

observersTargets.forEach(target => observer.observe(target));

// Footer year handling for bilingual display
const yearSpanHr = document.getElementById('year');
const yearSpanEn = document.getElementById('year-en');
const currentYear = new Date().getFullYear();

if (yearSpanHr) {
    yearSpanHr.textContent = currentYear;
}

if (yearSpanEn) {
    yearSpanEn.textContent = currentYear;
}

// Basic form handler placeholder to prevent submission when honeypot is filled
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', event => {
        const honeypot = contactForm.querySelector('#company');
        if (honeypot && honeypot.value.trim() !== '') {
            event.preventDefault();
            return false;
        }
    });
}
