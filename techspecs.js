// ==========================================
// TECH SPECS PAGE SPECIFIC SCRIPTS
// ==========================================

// Reactor Core Animation
function initReactorAnimation() {
    const core = document.querySelector('.reactor-core');
    const rings = document.querySelectorAll('.reactor-ring');
    
    if (core) {
        gsap.to(core, {
            scale: 1.1,
            opacity: 0.8,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });
    }
    
    rings.forEach((ring, index) => {
        gsap.to(ring, {
            rotation: 360,
            duration: 10 - (index * 2),
            repeat: -1,
            ease: 'none'
        });
    });
}

// Animate spec bars on scroll
function initSpecBars() {
    const specBars = document.querySelectorAll('.spec-item .h-full');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                
                gsap.to(entry.target, {
                    width: width,
                    duration: 1.5,
                    ease: 'power2.out',
                    delay: 0.2
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    specBars.forEach(bar => observer.observe(bar));
}

// Animate nanotech cells
function initNanotechAnimation() {
    const cells = document.querySelectorAll('.nano-cell');
    
    cells.forEach((cell, index) => {
        gsap.to(cell, {
            opacity: Math.random() * 0.5 + 0.5,
            scale: Math.random() * 0.2 + 0.9,
            duration: Math.random() * 2 + 1,
            repeat: -1,
            yoyo: true,
            delay: index * 0.01,
            ease: 'power1.inOut'
        });
    });
}

// Animate repulsor diagram
function initRepulsorAnimation() {
    const waves = document.querySelectorAll('.energy-wave');
    const pulseCircle = document.querySelector('.pulse-circle');
    
    waves.forEach((wave, index) => {
        gsap.fromTo(wave, 
            { opacity: 0.6, attr: { r: 30 } },
            {
                opacity: 0,
                attr: { r: 150 },
                duration: 2,
                repeat: -1,
                delay: index * 0.7,
                ease: 'none'
            }
        );
    });
    
    if (pulseCircle) {
        gsap.to(pulseCircle, {
            attr: { r: 35 },
            opacity: 0.5,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });
    }
}

// Animate feature items on scroll
function initFeatureItems() {
    const features = document.querySelectorAll('.feature-item');
    
    gsap.from(features, {
        scrollTrigger: {
            trigger: '.feature-item',
            start: 'top 80%'
        },
        opacity: 0,
        x: -50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out'
    });
}

// Initialize all tech specs animations
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initReactorAnimation();
        initSpecBars();
        initNanotechAnimation();
        initRepulsorAnimation();
        initFeatureItems();
    }, 100);
});

console.log('%c⚡ TECH SPECS DATABASE LOADED', 'color: #7209b7; font-size: 16px; font-weight: bold;');