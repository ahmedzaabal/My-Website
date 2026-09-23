console.log("SYSTEM INITIALIZED: Cyberpunk Portfolio v1.0");

const subtitleElement = document.querySelector('.subtitle');
const originalText = subtitleElement.innerText;
subtitleElement.innerText = '';

let i = 0;
const typeWriter = () => {
    if (i < originalText.length) {
        subtitleElement.innerText += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 50 + Math.random() * 100);
    }
};

setTimeout(typeWriter, 1000);

const projectCards = document.querySelectorAll('.project-card');
const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (supportsHover && !reducedMotion) {
    projectCards.forEach((card) => {
        card.addEventListener('mousemove', (event) => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * 12;
            const rotateX = (0.5 - (y / rect.height)) * 12;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });
}

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealElements.forEach((element) => revealObserver.observe(element));

const certificateCards = document.querySelectorAll('.certificate-card');
certificateCards.forEach((card) => {
    const toggleCard = () => card.classList.toggle('expanded');
    card.addEventListener('click', toggleCard);
    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleCard();
        }
    });
});

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));

navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const sections = document.querySelectorAll('main section[id]');
const navigationLinks = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navigationLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
            });
        }
    });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach((section) => sectionObserver.observe(section));

const themeSwitcher = document.querySelector('.theme-switcher');
document.querySelector('.theme-toggle')?.addEventListener('click', () => {
    themeSwitcher.classList.toggle('open');
});

document.querySelectorAll('[data-theme]').forEach((button) => {
    button.addEventListener('click', () => {
        const theme = button.dataset.theme;
        if (theme === 'cyber') {
            document.body.removeAttribute('data-theme');
        } else {
            document.body.dataset.theme = theme;
        }
        localStorage.setItem('portfolio-theme', theme);
        themeSwitcher.classList.remove('open');
    });
});

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme && savedTheme !== 'cyber') {
    document.body.dataset.theme = savedTheme;
}

const cursorGlow = document.querySelector('.cursor-glow');
if (supportsHover && !reducedMotion && cursorGlow) {
    document.addEventListener('mousemove', (event) => {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
    });
}
