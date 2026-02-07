// ==========================================
// INITIALIZATION
// ==========================================
gsap.registerPlugin(ScrollTrigger);

// Page Load Animation
window.addEventListener('load', () => {
    const loader = document.getElementById('page-loader');
    gsap.to(loader, {
        opacity: 0,
        duration: 0.5,
        delay: 1.5,
        onComplete: () => {
            loader.style.display = 'none';
            initializeAnimations();
        }
    });
});

// ==========================================
// PARTICLES SYSTEM
// ==========================================
function createParticles() {
    const particlesContainer = document.getElementById('particles-bg');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = Math.random() > 0.5 ? '#00d9ff' : '#e63946';
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.5;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.filter = 'blur(1px)';
        particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px currentColor`;
        
        particlesContainer.appendChild(particle);
        
        gsap.to(particle, {
            y: `+=${Math.random() * 100 - 50}`,
            x: `+=${Math.random() * 100 - 50}`,
            opacity: Math.random() * 0.8,
            duration: Math.random() * 10 + 10,
            repeat: -1,
            yoyo: true,
            ease: 'none'
        });
    }
}

createParticles();

// ==========================================
// CUSTOM CURSOR
// ==========================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorCircle = document.querySelector('.cursor-circle');

if (cursorDot && cursorCircle) {
    gsap.set([cursorDot, cursorCircle], {xPercent: -50, yPercent: -50});

    let mouseX = 0, mouseY = 0;
    
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        gsap.to(cursorDot, {duration: 0.1, x: mouseX, y: mouseY});
        gsap.to(cursorCircle, {duration: 0.6, x: mouseX, y: mouseY, ease: "power2.out"});
    });

    // Interactive elements
    const interactables = document.querySelectorAll('a, button, .suit-card, .stat-card, .holo-btn');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursorCircle, {scale: 2, borderColor: '#e63946', duration: 0.3});
            gsap.to(cursorDot, {scale: 1.5, background: 'linear-gradient(135deg, #e63946, #ff6b6b)', duration: 0.3});
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursorCircle, {scale: 1, borderColor: 'rgba(0, 217, 255, 0.5)', duration: 0.3});
            gsap.to(cursorDot, {scale: 1, background: 'linear-gradient(135deg, #00d9ff, #06ffa5)', duration: 0.3});
        });
    });
}

// ==========================================
// NAVIGATION EFFECTS
// ==========================================
const mainNav = document.getElementById('main-nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        mainNav.style.background = 'rgba(5, 5, 5, 0.95)';
        mainNav.style.backdropFilter = 'blur(20px)';
        mainNav.style.borderBottom = '1px solid rgba(0, 217, 255, 0.1)';
    } else {
        mainNav.style.background = '';
        mainNav.style.backdropFilter = '';
        mainNav.style.borderBottom = '';
    }
    
    if (currentScroll > lastScroll && currentScroll > 500) {
        gsap.to(mainNav, {y: -100, duration: 0.3});
    } else {
        gsap.to(mainNav, {y: 0, duration: 0.3});
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            gsap.from('.mobile-nav-link', {
                x: -50,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1
            });
        } else {
            mobileMenu.classList.add('hidden');
        }
    });

    // Close on link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// ==========================================
// JARVIS PANEL
// ==========================================
const jarvisToggle = document.getElementById('jarvis-toggle');
const jarvisPanel = document.getElementById('jarvis-panel');
const jarvisClose = document.getElementById('jarvis-close');
const jarvisMessage = document.getElementById('jarvis-message');

const jarvisMessages = [
    "All systems nominal. Awaiting input.",
    "Arc reactor output stable at 98.7%.",
    "Nanobot assembly ready for deployment.",
    "Threat assessment: CLEAR. No anomalies detected.",
    "Repulsor array calibrated and online.",
    "Flight systems check: PASSED.",
    "Armor integrity at maximum capacity.",
    "Power distribution optimized across all systems."
];

let jarvisMessageIndex = 0;

function updateJarvisMessage() {
    jarvisMessageIndex = (jarvisMessageIndex + 1) % jarvisMessages.length;
    const newMessage = jarvisMessages[jarvisMessageIndex];
    
    gsap.to(jarvisMessage, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            jarvisMessage.textContent = newMessage;
            gsap.to(jarvisMessage, {opacity: 1, duration: 0.3});
        }
    });
}

if (jarvisToggle && jarvisPanel) {
    jarvisToggle.addEventListener('click', () => {
        const isHidden = jarvisPanel.classList.contains('hidden');
        if (isHidden) {
            jarvisPanel.classList.remove('hidden');
            gsap.from(jarvisPanel, {
                x: 100,
                opacity: 0,
                duration: 0.5,
                ease: 'power3.out'
            });
            setInterval(updateJarvisMessage, 5000);
        } else {
            gsap.to(jarvisPanel, {
                x: 100,
                opacity: 0,
                duration: 0.5,
                onComplete: () => jarvisPanel.classList.add('hidden')
            });
        }
    });
}

if (jarvisClose) {
    jarvisClose.addEventListener('click', () => {
        gsap.to(jarvisPanel, {
            x: 100,
            opacity: 0,
            duration: 0.5,
            onComplete: () => jarvisPanel.classList.add('hidden')
        });
    });
}

// ==========================================
// HERO SECTION ANIMATIONS
// ==========================================
function initializeAnimations() {
    const heroTl = gsap.timeline();

    // Typing effect
    const typingText = document.querySelector('.typing-text');
    const fullText = "Nanostructure integration complete. Energy output nominal. Welcome back, Mr. Stark.";
    let charIndex = 0;

    function typeText() {
        if (charIndex < fullText.length) {
            typingText.textContent += fullText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 50);
        } else {
            gsap.to('.typing-cursor', {opacity: 0, duration: 0.5, delay: 1});
        }
    }

    heroTl.to('#hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    })
    .to('#hero-title', {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "back.out(1.4)"
    }, "-=0.5")
    .add(() => typeText(), "-=0.8")
    .to('#hero-desc', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=0.5")
    .to('.hero-buttons', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.4");

    // Parallax Effect
    gsap.to('#hero-bg', {
        scrollTrigger: {
            trigger: 'header',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: 300,
        scale: 1.2,
        ease: "none"
    });

    // HUD Corners animation
    gsap.from('.hud-corner', {
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 1
    });
}

// ==========================================
// COUNTER ANIMATION
// ==========================================
function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.floor(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

ScrollTrigger.create({
    trigger: '.stat-item',
    start: 'top 80%',
    onEnter: () => {
        document.querySelectorAll('.counter').forEach(counter => {
            animateCounter(counter);
        });
    },
    once: true
});

// ==========================================
// SCROLL TRIGGERED ANIMATIONS
// ==========================================

// Assembly Section
gsap.from('.assembly-trigger-1', {
    scrollTrigger: {
        trigger: '.assembly-trigger-1',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
});

// Scanning Effect
const scanTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.assembly-trigger-image',
        start: 'top 75%',
        toggleActions: 'play none none none'
    }
});

scanTl.from('.assembly-trigger-image', {
    scale: 0.95,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
})
.to('.scan-line', {
    top: '100%',
    opacity: 1,
    duration: 2,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true
});

// Armory Section Header
gsap.from('.assembly-header', {
    scrollTrigger: {
        trigger: '.assembly-header',
        start: 'top 85%'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
});

// Suit Cards Animation
gsap.from('.suit-card', {
    scrollTrigger: {
        trigger: '.suit-card',
        start: 'top 85%',
    },
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "back.out(1.4)"
});

// Tech Features
gsap.from('.tech-feature', {
    scrollTrigger: {
        trigger: '.tech-feature',
        start: 'top 85%',
    },
    x: -30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out"
});

// ==========================================
// BUTTON HOVER EFFECTS
// ==========================================
document.querySelectorAll('.holo-btn, .holo-btn-outline').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
            scale: 1.05,
            duration: 0.3,
            ease: "back.out(2)"
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            scale: 1,
            duration: 0.3
        });
    });

    btn.addEventListener('click', () => {
        gsap.fromTo(btn, 
            {scale: 1.05}, 
            {scale: 0.95, duration: 0.1, yoyo: true, repeat: 1}
        );
    });
});

// ==========================================
// STAT CARDS PARALLAX
// ==========================================
document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    });
});

// ==========================================
// GLITCH EFFECT ON HOVER
// ==========================================
const heroTitle = document.getElementById('hero-title');
if (heroTitle) {
    let glitchInterval;
    
    heroTitle.addEventListener('mouseenter', () => {
        let glitchCount = 0;
        glitchInterval = setInterval(() => {
            if (glitchCount < 5) {
                gsap.to(heroTitle, {
                    x: Math.random() * 4 - 2,
                    duration: 0.05,
                    yoyo: true,
                    repeat: 1
                });
                glitchCount++;
            } else {
                clearInterval(glitchInterval);
            }
        }, 100);
    });
}

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: target,
                ease: "power2.inOut"
            });
        }
    });
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
// Throttle scroll events
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
});

// ==========================================
// EASTER EGG: KONAMI CODE
// ==========================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateJarvisMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateJarvisMode() {
    const body = document.body;
    const originalBg = body.style.background;
    
    gsap.to(body, {
        background: 'radial-gradient(circle, rgba(0,217,255,0.2), rgba(5,5,5,1))',
        duration: 1
    });
    
    // Create ripple effect
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const ripple = document.createElement('div');
            ripple.style.position = 'fixed';
            ripple.style.width = '10px';
            ripple.style.height = '10px';
            ripple.style.borderRadius = '50%';
            ripple.style.background = '#00d9ff';
            ripple.style.left = Math.random() * window.innerWidth + 'px';
            ripple.style.top = Math.random() * window.innerHeight + 'px';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '9999';
            document.body.appendChild(ripple);
            
            gsap.to(ripple, {
                scale: 20,
                opacity: 0,
                duration: 2,
                ease: 'power2.out',
                onComplete: () => ripple.remove()
            });
        }, i * 100);
    }
    
    setTimeout(() => {
        gsap.to(body, {
            background: originalBg,
            duration: 1
        });
    }, 3000);
}

// ==========================================
// CONSOLE MESSAGE
// ==========================================
console.log('%c⚡ STARK INDUSTRIES ⚡', 'color: #00d9ff; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to the Mark 85 Interface', 'color: #e63946; font-size: 14px;');
console.log('%cTry the Konami Code for a surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA', 'color: #fca311; font-size: 12px;');
