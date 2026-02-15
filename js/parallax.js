// Parallax / Sticky card scroll effect
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.parallax-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    cards.forEach(card => observer.observe(card));
});
