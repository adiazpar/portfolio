// Re-lock --app-height on real resizes only (rotation, deliberate window
// resize). Width-only changes are the reliable signal for "real" resizes;
// height-only changes on mobile are almost always the address bar collapsing
// or expanding during scroll, which we want to ignore. The initial set
// already happened inline in the <head>, before the first paint.
(function relockAppHeightOnRealResize() {
    let lastWidth = window.innerWidth;

    function updateAppHeight() {
        document.documentElement.style.setProperty(
            '--app-height',
            window.innerHeight + 'px'
        );
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth !== lastWidth) {
            lastWidth = window.innerWidth;
            updateAppHeight();
        }
    });

    // Orientation change is always a "real" resize even when innerWidth
    // briefly reports the same value mid-rotation.
    window.addEventListener('orientationchange', updateAppHeight);
})();


// Fade in effect:
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');

    fadeElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * 1);
    });
});


// Email functionality:
function sendMail(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get current timestamp
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    var params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
        time: timeString, // Add the missing time parameter
    };

    const serviceID = "service_trhlufi";
    const templateID = "template_je714f6";

    emailjs
        .send(serviceID, templateID, params)
        .then((res) => {
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("message").value = "";
                console.log(res);
                alert("Your message was sent successfully!");
            })
            .catch((err) => {
                console.log(err);
                alert("Failed to send message. Please try again.");
            });
}