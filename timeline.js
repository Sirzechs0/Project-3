// ==========================================
// TIMELINE PAGE SPECIFIC SCRIPTS
// ==========================================

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Animate timeline events on scroll
function initTimelineAnimations() {
    const events = document.querySelectorAll('.timeline-event');
    
    events.forEach((event, index) => {
        gsap.from(event, {
            scrollTrigger: {
                trigger: event,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.1
        });
    });
}

// Animate stat cards
function initStatCards() {
    const statCards = document.querySelectorAll('.stat-card');
    
    gsap.from(statCards, {
        scrollTrigger: {
            trigger: '.stat-card',
            start: 'top 80%'
        },
        opacity: 0,
        scale: 0.9,
        stagger: 0.15,
        duration: 0.6,
        ease: 'back.out(1.4)'
    });
}

// Initialize all timeline animations
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initTimelineAnimations();
        animateCounters();
        initStatCards();
    }, 100);
});

console.log('%c⚡ TIMELINE DATABASE LOADED', 'color: #06ffa5; font-size: 16px; font-weight: bold;');