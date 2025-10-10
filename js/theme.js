// Update logo based on theme:
function updateLogo() {
    const html = document.documentElement;
    const logo = document.querySelector('.logo');
    const currentTheme = html.getAttribute('data-theme');

    // If light mode, use dark logo (dark logo on light background)
    // If dark mode, use light logo (light logo on dark background)
    if (currentTheme === 'light') {
        logo.src = 'images/logo-dark.png';
    } else {
        logo.src = 'images/logo-light.png';
    }
}

// Toggle between light and dark theme:
function toggleTheme() {
    const html = document.documentElement;
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = html.getAttribute('data-theme');

    // Add scale-out class to trigger animation
    themeToggle.classList.add('scale-out');

    // Wait for scale-out to complete, then switch theme
    setTimeout(() => {
        // Toggle theme
        if (currentTheme === 'light') {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }

        // Update logo after theme change
        updateLogo();

        // Remove scale-out and add scale-in class
        themeToggle.classList.remove('scale-out');
        themeToggle.classList.add('scale-in');

        // Remove scale-in class after animation completes
        setTimeout(() => {
            themeToggle.classList.remove('scale-in');
        }, 350); // Match scaleIn animation duration
    }, 200); // Wait for scaleOut animation to complete
}

// Load saved theme preference on page load:
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const html = document.documentElement;

    if (savedTheme) {
        // Use saved preference if it exists
        html.setAttribute('data-theme', savedTheme);
    } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

        if (prefersDark) {
            html.setAttribute('data-theme', 'dark');
        } else if (prefersLight) {
            html.setAttribute('data-theme', 'light');
        } else {
            // Default to dark mode if no system preference is detected
            html.setAttribute('data-theme', 'dark');
        }
    }

    // Update logo based on loaded theme
    updateLogo();
}

// Initialize theme on page load:
document.addEventListener('DOMContentLoaded', function() {
    loadTheme();

    // Add click handler to theme toggle button
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});