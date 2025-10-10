// Hamburger Menu:
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navBackdrop = document.querySelector('.nav-backdrop');
    const menuIcon = document.querySelector('.menu-icon');
    const xIcon = document.querySelector('.x-icon');

    // Toggle menu visibility:
    navMenu.classList.toggle('active');
    navBackdrop.classList.toggle('active');

    // Switch icons:
    if (navMenu.classList.contains('active')) {
        menuIcon.style.display = 'none';
        xIcon.style.display = 'block';
    } else {
        closeMenu();
    }
}

// Site Navbar Navigation:
function navigateTo(target) {
    const navMenu = document.querySelector('.nav-menu');

    // Navigate to target section:
    if (target === '#home' || target === '#') {
        window.scrollTo({ top: -80, behavior: 'smooth' });
    }
    else {
        const element = document.querySelector(target);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - 80;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    }

    // Check if the nav menu is open:
    if (navMenu.classList.contains('active')) {
        closeMenu();
    }
}

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navBackdrop = document.querySelector('.nav-backdrop');

    // If menu is open and click is outside menu area
    if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
    }
});

// Close the navigation side menu:
function closeMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navBackdrop = document.querySelector('.nav-backdrop');
    const menuIcon = document.querySelector('.menu-icon');
    const xIcon = document.querySelector('.x-icon');

    navMenu.classList.remove('active');
    navBackdrop.classList.remove('active');

    // Switch icons back
    document.querySelector('.menu-icon').style.display = 'block';
    document.querySelector('.x-icon').style.display = 'none';
}