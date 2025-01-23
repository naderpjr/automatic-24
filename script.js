document.addEventListener('DOMContentLoaded', () => {
    const statsBoxes = document.querySelectorAll('.stat-box h2');
    
    const animateCounter = (element, target) => {
        let current = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        element.classList.add('counting-animation');
        element.style.transform = 'scale(1.1)';
        element.style.color = '#ccc';

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                element.textContent = `${Math.floor(current)}+`;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = `${target}+`;

                element.classList.remove('counting-animation');
                element.style.transform = 'scale(1)';
                element.style.color = '';
            }
        };
        
        updateCounter();
    };

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent.replace('+', ''));

                entry.target.style.transition = 'all 0.3s ease';
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statsBoxes.forEach(box => {
        observer.observe(box);
    });
});