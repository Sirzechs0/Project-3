// ==========================================
// ARMORY PAGE SPECIFIC SCRIPTS
// ==========================================

// Initialize armor cards animation on scroll
function initArmorCards() {
    const cards = document.querySelectorAll('.armor-card');
    
    // Make all cards initially visible
    cards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => observer.observe(card));
}

// Filter functionality
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const armorCards = document.querySelectorAll('.armor-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Filter cards with animation
            armorCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    // Show card
                    card.style.display = 'block';
                    gsap.fromTo(card, 
                        { opacity: 0, scale: 0.9 },
                        { 
                            opacity: 1, 
                            scale: 1, 
                            duration: 0.5,
                            delay: index * 0.05,
                            ease: 'back.out(1.2)'
                        }
                    );
                } else {
                    // Hide card
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.9,
                        duration: 0.3,
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });

            // JARVIS voice effect
            announceFilter(filter);
        });
    });
}

// View toggle functionality
function initViewToggle() {
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const suitsContainer = document.getElementById('suits-container');
    const visibleCards = document.querySelectorAll('.armor-card:not([style*="display: none"])');

    if (gridViewBtn && listViewBtn) {
        gridViewBtn.addEventListener('click', () => {
            suitsContainer.classList.remove('list-view');
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            
            // Re-animate visible cards only
            const visibleCards = Array.from(document.querySelectorAll('.armor-card'))
                .filter(card => card.style.display !== 'none');
            
            gsap.from(visibleCards, {
                scale: 0.9,
                opacity: 0.5,
                duration: 0.5,
                stagger: 0.05,
                ease: 'back.out(1.2)'
            });
        });

        listViewBtn.addEventListener('click', () => {
            suitsContainer.classList.add('list-view');
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
            
            // Re-animate visible cards only
            const visibleCards = Array.from(document.querySelectorAll('.armor-card'))
                .filter(card => card.style.display !== 'none');
            
            gsap.from(visibleCards, {
                x: -50,
                opacity: 0.5,
                duration: 0.5,
                stagger: 0.05,
                ease: 'power2.out'
            });
        });
    }
}

// Announce filter change (simulated JARVIS)
function announceFilter(filter) {
    console.log(`%cFiltering: ${filter.toUpperCase()} suits`, 'color: #00d9ff; font-size: 12px;');
}

// Armor card hover 3D effect
function initArmorCardEffects() {
    const cards = document.querySelectorAll('.armor-card-inner');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            gsap.to(card, {
                rotateX: -rotateX,
                rotateY: rotateY,
                duration: 0.5,
                ease: "power2.out",
                transformPerspective: 1000,
                transformStyle: "preserve-3d"
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
}

// Stat bar animation on card visibility
function animateStatBars() {
    const cards = document.querySelectorAll('.armor-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.armor-stats .bar div');
                bars.forEach((bar, index) => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    
                    setTimeout(() => {
                        gsap.to(bar, {
                            width: width,
                            duration: 1,
                            ease: 'power2.out'
                        });
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    cards.forEach(card => observer.observe(card));
}

// Search functionality (if search input exists)
function initSearch() {
    const searchInput = document.getElementById('armor-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.armor-card');
            
            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.3
                    });
                    card.style.display = 'block';
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.9,
                        duration: 0.3,
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    }
}

// Initialize all armory functions
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure GSAP and page are fully loaded
    setTimeout(() => {
        initArmorCards();
        initFilters();
        initViewToggle();
        initArmorCardEffects();
        animateStatBars();
        initSearch();
    }, 100);
});

// Console Easter Egg
console.log('%c⚡ ARMORY DATABASE LOADED', 'color: #e63946; font-size: 16px; font-weight: bold;');
console.log('%c85+ Iron Man suits cataloged and ready', 'color: #00d9ff; font-size: 12px;');