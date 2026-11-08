const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const themeToggleLabel = document.querySelector('.theme-toggle-label');
const themeToggleIcon = document.querySelector('.theme-toggle-icon');
const root = document.documentElement;
const themeColor = document.querySelector('meta[name="theme-color"]');

const storedTheme = localStorage.getItem('portfolio-theme');
if (storedTheme === 'light' || storedTheme === 'dark') {
    root.dataset.theme = storedTheme;
}

const isNightMode = () => root.dataset.theme === 'dark'
    || (!root.dataset.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);

const updateThemeToggle = () => {
    const nightMode = isNightMode();
    themeToggle?.setAttribute('aria-pressed', String(nightMode));
    if (themeToggleLabel) {
        themeToggleLabel.textContent = nightMode ? 'Day mode' : 'Night mode';
    }
    if (themeToggleIcon) {
        themeToggleIcon.textContent = nightMode ? '☼' : '◐';
    }
    themeColor?.setAttribute('content', nightMode ? '#151a18' : '#f7f7f4');
};

themeToggle?.addEventListener('click', () => {
    root.dataset.theme = isNightMode() ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', root.dataset.theme);
    updateThemeToggle();
});

updateThemeToggle();

menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    navLinks?.classList.toggle('open', !isOpen);
});

navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        menuToggle?.setAttribute('aria-expanded', 'false');
        menuToggle?.setAttribute('aria-label', 'Open navigation menu');
        navLinks.classList.remove('open');
    });
});
