document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal Elements on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 2. Animated Counter for Penalty Points
    const counterElement = document.getElementById('points-counter');
    const targetPoints = 225;
    let counted = false;

    const animateCounter = () => {
        let currentPoints = 0;
        const duration = 2000; // 2 seconds
        const interval = 20;
        const step = targetPoints / (duration / interval);

        const timer = setInterval(() => {
            currentPoints += step;
            if (currentPoints >= targetPoints) {
                counterElement.textContent = targetPoints;
                clearInterval(timer);
            } else {
                counterElement.textContent = Math.floor(currentPoints);
            }
        }, interval);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                animateCounter();
            }
        });
    }, { threshold: 0.5 });

    if (counterElement) {
        counterObserver.observe(counterElement);
    }

    // 3. Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });
});
