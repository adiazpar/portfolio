// Fade In Effect:
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');

    fadeElements.forEach((element) => {
        setTimeout(() => {
            element.classList.add('visible');
        });
    });
});

