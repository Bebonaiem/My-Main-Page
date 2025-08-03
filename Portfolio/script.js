document.addEventListener('DOMContentLoaded', () => {
    // --- Preloader Logic (Performance Optimized) ---
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', () => {
        if (preloader) {
            // Wait for animations to finish before fading out
            setTimeout(() => {
                preloader.classList.add('fade-out');
                document.body.classList.add('loaded');
            }, 300);
        }
    });

    // --- Initialize All Other Logic After DOM is Ready ---
    function initializePortfolio() {
        
        // --- Custom Cursor Logic ---
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        const interactiveElements = document.querySelectorAll('a, button, .magnetic-item, .project-card, .skill-card');

        let mouseX = 0, mouseY = 0, outlineX = 0, outlineY = 0;
        const easing = 0.15;

        const animateCursor = () => {
            if (cursorDot && cursorOutline) {
                cursorDot.style.left = `${mouseX}px`;
                cursorDot.style.top = `${mouseY}px`;

                const dx = mouseX - outlineX;
                const dy = mouseY - outlineY;
                outlineX += dx * easing;
                outlineY += dy * easing;

                cursorOutline.style.left = `${outlineX}px`;
                cursorOutline.style.top = `${outlineY}px`;
            }
            requestAnimationFrame(animateCursor);
        };

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        animateCursor();
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-pointer-hover'));
            element.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-pointer-hover'));
        });

        // --- Header Scroll Effect ---
        const header = document.querySelector('header');
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });

        // --- tsParticles Initialization ---
        if (typeof tsParticles !== 'undefined') {
            tsParticles.load("tsparticles", {
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: { enable: true, mode: "push" },
                        onHover: { 
                            enable: true, 
                            mode: "repulse",
                            parallax: { enable: true, force: 30, smooth: 10 }
                        },
                        resize: true
                    },
                    modes: {
                        repulse: { distance: 100, duration: 0.4 },
                        push: { quantity: 4 }
                    }
                },
                particles: {
                    color: { value: "#c1c8f3" },
                    links: { color: { value: "#c1c8f3" }, distance: 150, enable: true, opacity: 0.4, width: 1 },
                    move: { 
                        direction: "none", 
                        enable: true, 
                        outModes: { default: "bounce" }, 
                        random: true, 
                        speed: 1.5, 
                        straight: false
                    },
                    number: { density: { enable: true, area: 800 }, value: 100 },
                    opacity: { value: { min: 0.1, max: 0.5 } },
                    shape: { type: "circle" },
                    size: { value: { min: 1, max: 5 } }
                },
                detectRetina: true
            });
        }

        // --- Typewriter Effect ---
        const typewriterElement = document.querySelector('.typewriter');
        if (typewriterElement) {
            const words = ["I'm a Creative Developer", "I'm a UI/UX Enthusiast", "I'm a Problem Solver"];
            let wordIndex = 0, charIndex = 0, isDeleting = false;
            
            function type() {
                const currentWord = words[wordIndex];
                const typingSpeed = isDeleting ? 50 : 100;
                typewriterElement.textContent = currentWord.substring(0, charIndex);
                
                if (!isDeleting && charIndex < currentWord.length) charIndex++;
                else if (isDeleting && charIndex > 0) charIndex--;
                else {
                    isDeleting = !isDeleting;
                    if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
                }
                setTimeout(type, isDeleting || charIndex === 0 ? (isDeleting ? typingSpeed : 1200) : typingSpeed);
            }
            setTimeout(type, 1500); // Start after a slight delay for effect
        }

        // --- Initialize Animation Libraries ---
        if (typeof Splitting !== 'undefined') Splitting();
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out-quad',
                once: true,
                mirror: false,
                offset: 100
            });
        }

        // --- GSAP Animations ---
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

            // --- Kinetic Hero Text ---
            const kineticText = document.querySelector('.kinetic-text h1');
            if (kineticText) {
                const heroSection = document.querySelector('.hero');
                heroSection.addEventListener('mousemove', (e) => {
                    const { clientX, clientY, currentTarget } = e;
                    const { offsetWidth, offsetHeight } = currentTarget;
                    const x = (clientX / offsetWidth - 0.5) * 2;
                    const y = (clientY / offsetHeight - 0.5) * 2;
                    gsap.to(kineticText, {
                        duration: 0.5, rotationX: -y * 10, rotationY: x * 10, z: 50, ease: "power1.out"
                    });
                });
                heroSection.addEventListener('mouseleave', () => {
                    gsap.to(kineticText, {
                        duration: 0.5, rotationX: 0, rotationY: 0, z: 0, ease: "power1.out"
                    });
                });
            }

            // --- Magnetic Items ---
            const magneticItems = document.querySelectorAll('.magnetic-item');
            magneticItems.forEach(item => {
                const strength = parseFloat(item.dataset.strength) || 0.2;
                item.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = (e.clientX - rect.left - rect.width / 2) * strength;
                    const y = (e.clientY - rect.top - rect.height / 2) * strength;
                    gsap.to(this, { x: x, y: y, duration: 0.4, ease: 'power1.out' });
                });
                item.addEventListener('mouseleave', function() {
                    gsap.to(this, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
                });
            });

            // --- GSAP Smooth Scrolling ---
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    gsap.to(window, {
                        duration: 0.1, // [CHANGED] Further reduced duration for a snappier feel.
                        scrollTo: { y: targetId, offsetY: 80 }, 
                        ease: "power2.out" // [CHANGED] Starts fast, then slows. Feels more responsive.
                    });
                });
            });

            // --- GSAP Staggered Title Reveal ---
            gsap.utils.toArray('.section-title[data-splitting]').forEach(title => {
                const chars = title.querySelectorAll('.char');
                gsap.from(chars, {
                    yPercent: 115,
                    stagger: 0.03,
                    duration: 0.7,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: title,
                        start: "top 85%",
                        once: true
                    }
                });
            });
            
            // --- GSAP Stat Card Number Counter ---
            gsap.utils.toArray('.stat-card').forEach(card => {
                const numberEl = card.querySelector('.stat-number');
                const endValue = parseInt(numberEl.dataset.value);
                let counter = { value: 0 };
                
                gsap.from(card, { autoAlpha: 0, y: 50, duration: 0.8, ease: 'power3.out' });
                
                gsap.to(counter, {
                    value: endValue,
                    duration: 2.5,
                    ease: 'power2.out',
                    onUpdate: () => {
                        let suffix = '+';
                        if (numberEl.dataset.value.includes('%')) {
                            suffix = '%';
                        }
                        numberEl.textContent = Math.ceil(counter.value) + suffix;
                    },
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        once: true
                    }
                });
            });
            
            // --- GSAP Skill Bar Animation ---
            gsap.utils.toArray('.skill-card .progress-bar').forEach(bar => {
                gsap.fromTo(bar, 
                    { width: '0%' },
                    { 
                        width: bar.style.width, 
                        duration: 1.5, 
                        ease: 'power3.inOut',
                        scrollTrigger: {
                            trigger: bar.closest('.skill-card'),
                            start: 'top 85%',
                            once: true
                        }
                    }
                );
            });

            // --- 3D Card Tilt Effect ---
            const tiltableCards = document.querySelectorAll('.project-card, .skill-card');
            tiltableCards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = (e.clientX - rect.left - rect.width / 2) / 25; 
                    const y = (e.clientY - rect.top - rect.height / 2) / -25;
                    gsap.to(card, {
                        rotationY: x, rotationX: y, transformPerspective: 1000,
                        ease: "power1.out", duration: 0.8
                    });
                });
                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        rotationY: 0, rotationX: 0,
                        ease: "elastic.out(1, 0.5)", duration: 1.2
                    });
                });
            });

            // --- Parallax for Decorative Shapes ---
            gsap.to(".about .shape-circle", {
                y: -100,
                scrollTrigger: { trigger: ".about", start: "top bottom", end: "bottom top", scrub: 1.5 }
            });
            gsap.to(".about .shape-triangle", {
                y: 100, x: 50, rotation: 45,
                scrollTrigger: { trigger: ".about", start: "top bottom", end: "bottom top", scrub: true }
            });
        }

        // --- Active Nav Link on Scroll ---
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-dock .dock-item');
        window.addEventListener('scroll', () => {
            let currentSectionId = '';
            const scrollY = window.pageYOffset;
            sections.forEach(section => {
                if (scrollY >= section.offsetTop - 150) currentSectionId = section.id;
            });
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
            });
        });

        // --- Update current year in footer ---
        const currentYearSpan = document.querySelector('.current-year');
        if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();
    }

    initializePortfolio();
});