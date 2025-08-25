// js/script.js - Fully Repaired & Enhanced with New Cursor Logic
document.addEventListener('DOMContentLoaded', function() {
    // --- PRELOADER ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 600);
        }, 1200);
    }

    // --- NEW & IMPROVED CUSTOM CURSOR ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorAura = document.querySelector('.cursor-aura');
    if (cursorDot && cursorAura) {
        document.body.style.cursor = 'none';

        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let auraX = 0, auraY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            // Dot follows quickly
            dotX += (mouseX - dotX) * 0.7;
            dotY += (mouseY - dotY) * 0.7;
            cursorDot.style.left = `${dotX}px`;
            cursorDot.style.top = `${dotY}px`;

            // Aura follows slowly for a trailing effect
            auraX += (mouseX - auraX) * 0.15;
            auraY += (mouseY - auraY) * 0.15;
            cursorAura.style.left = `${auraX}px`;
            cursorAura.style.top = `${auraY}px`;
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // --- Cursor Interaction States ---
        const interactiveElements = 'a, button, input, textarea, .faq-question, .dock-item, .tab-button';
        const textElements = 'p, h1, h2, h3, h4, h5, span, li, blockquote, label';

        document.body.addEventListener('mouseover', (e) => {
            if (e.target.closest(interactiveElements)) {
                cursorDot.classList.add('interact');
                cursorAura.classList.add('interact');
            } else if (e.target.closest(textElements)) {
                cursorDot.classList.add('text');
                cursorAura.classList.add('text');
            }
        });
        
        document.body.addEventListener('mouseout', (e) => {
            cursorDot.classList.remove('interact', 'text');
            cursorAura.classList.remove('interact', 'text');
        });
        
        document.body.addEventListener('mousedown', () => {
            cursorDot.classList.add('clicked');
            cursorAura.classList.add('clicked');
        });
        
        document.body.addEventListener('mouseup', () => {
            cursorDot.classList.remove('clicked');
            cursorAura.classList.remove('clicked');
        });
    }

    // --- REACTIVE SPOTLIGHT ---
    const spotlight = document.getElementById('spotlight');
    if (spotlight) {
        document.addEventListener('mousemove', (e) => {
            spotlight.style.background = `radial-gradient(circle 800px at ${e.clientX}px ${e.clientY}px, rgba(118, 75, 239, 0.15), transparent 80%)`;
        });
    }

    // --- DOCK NAVIGATION & EFFECT ---
    const dockItems = document.querySelectorAll('.dock-item');
    dockItems.forEach((item, index) => {
        const itemPath = item.getAttribute('href').split('#')[0];
        const pagePath = window.location.pathname.split('/').pop();
        if (itemPath === pagePath || (pagePath === '' && itemPath === 'index.html')) {
            item.classList.add('active');
        }
    });

    // --- COMMAND PALETTE ---
    const commandPalette = document.getElementById('command-palette');
    const commandInput = document.getElementById('command-palette-search-input');
    const commandResults = document.getElementById('command-palette-results');
    
    if (commandPalette) {
        const commands = [
            { name: 'Go to Home', action: () => window.location.href = 'index.html', tags: 'main landing' },
            { name: 'View Game Hosting', action: () => window.location.href = 'games.html', tags: 'minecraft rust ark servers' },
            { name: 'Check Network Status', action: () => window.location.href = 'network.html', tags: 'latency ping datacenter' },
            { name: 'Contact Support', action: () => window.location.href = 'support.html', tags: 'help ticket crew' },
            { name: 'About Us', action: () => window.location.href = 'about.html', tags: 'team mission mandate' },
            { name: 'Send a Message', action: () => window.location.href = 'contact.html', tags: 'email get in touch' },
            { name: 'Terms of Service', action: () => window.location.href = 'terms.html', tags: 'tos legal rules' },
            { name: 'Privacy Policy', action: () => window.location.href = 'privacy.html', tags: 'legal data' },
        ];

        const renderCommands = (filter = '') => {
            if (!commandResults) return;
            commandResults.innerHTML = '';
            const filteredCommands = commands.filter(cmd => 
                cmd.name.toLowerCase().includes(filter.toLowerCase()) || 
                cmd.tags.toLowerCase().includes(filter.toLowerCase())
            );

            if (filteredCommands.length === 0) {
                commandResults.innerHTML = '<div class="command-item-none">No results found</div>';
                return;
            }

            filteredCommands.forEach((cmd, index) => {
                const item = document.createElement('div');
                item.className = 'command-item';
                if (index === 0) item.classList.add('selected');
                item.textContent = cmd.name;
                item.onclick = () => {
                    cmd.action();
                    hideCommandPalette();
                };
                commandResults.appendChild(item);
            });
        };

        const showCommandPalette = () => {
            commandPalette.style.display = 'flex';
            setTimeout(() => {
                commandPalette.style.opacity = '1';
                const modal = commandPalette.querySelector('.command-palette-modal');
                if (modal) modal.style.transform = 'scale(1)';
                if(commandInput) commandInput.focus();
            }, 10);
            renderCommands();
        };

        const hideCommandPalette = () => {
            commandPalette.style.opacity = '0';
            const modal = commandPalette.querySelector('.command-palette-modal');
            if (modal) modal.style.transform = 'scale(0.95)';
            if(commandInput) commandInput.value = '';
            setTimeout(() => commandPalette.style.display = 'none', 200);
        };

        if (commandInput) {
            commandInput.addEventListener('input', () => renderCommands(commandInput.value));
            commandInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const selected = commandResults.querySelector('.command-item.selected');
                    if (selected) selected.click();
                }
            });
        }

        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                commandPalette.style.display === 'flex' ? hideCommandPalette() : showCommandPalette();
            }
            if (e.key === 'Escape' && commandPalette.style.display === 'flex') {
                hideCommandPalette();
            }
        });

        commandPalette.addEventListener('click', (e) => {
            if (e.target === commandPalette) hideCommandPalette();
        });
    }

    // --- AURA CARDS ---
    document.querySelectorAll('.aura-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- FAQ SECTION ---
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        document.querySelectorAll('.faq-question').forEach(button => {
            button.addEventListener('click', () => {
                const item = button.parentElement;
                const wasActive = item.classList.contains('active');
                // Close all other items
                document.querySelectorAll('.faq-item.active').forEach(i => i.classList.remove('active'));
                // Toggle the clicked item
                if (!wasActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // --- NETWORK LATENCY TEST ---
    const runTestBtn = document.getElementById('run-latency-test');
    if (runTestBtn) {
        const resultsContainer = document.getElementById('latency-results');
        const locations = [
            'Los Angeles, USA', 'Dallas, USA', 'London, UK',
            'Tokyo, Japan', 'Sydney, Australia', 'Singapore'
        ];

        runTestBtn.addEventListener('click', () => {
            runTestBtn.disabled = true;
            runTestBtn.innerHTML = 'Testing...<span class="loader"></span>';
            resultsContainer.innerHTML = '';

            locations.forEach((loc, index) => {
                setTimeout(() => {
                    const ping = Math.floor(Math.random() * (250 - 15 + 1)) + 15;
                    let status = 'good';
                    if (ping > 80) status = 'medium';
                    if (ping > 150) status = 'bad';
                    
                    const resultEl = document.createElement('div');
                    resultEl.className = `result-item ${status}`;
                    resultEl.innerHTML = `<span>${loc}</span><span class="ping-value">${ping} ms</span>`;
                    resultsContainer.appendChild(resultEl);
                    setTimeout(() => resultEl.style.opacity = '1', 50);

                }, index * 250);
            });

            const totalTestTime = locations.length * 250;
            setTimeout(() => {
                runTestBtn.disabled = false;
                runTestBtn.innerHTML = 'Run Test Again';
            }, totalTestTime);
        });
    }

    // --- GAME TABS (FIXED) ---
    const tabButtons = document.querySelectorAll('.tab-button');
    // THIS 'IF' STATEMENT IS THE FIX. It prevents this code from running on other pages.
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const game = button.getAttribute('data-game');
                const targetPlan = document.getElementById(`${game}-plans`);

                if (history.pushState) {
                    history.pushState(null, null, `#${game}`);
                } else {
                    window.location.hash = `#${game}`;
                }

                if (targetPlan) {
                    document.querySelector('.tab-button.active').classList.remove('active');
                    button.classList.add('active');
                    document.querySelector('.game-plans.active').classList.remove('active');
                    targetPlan.classList.add('active');
                }
            });
        });

        const gameFromUrl = window.location.hash.substring(1);
        if (gameFromUrl) {
            const targetTabButton = document.querySelector(`.tab-button[data-game="${gameFromUrl}"]`);
            if (targetTabButton) {
                targetTabButton.click();
            }
        }
    }
    
    // --- CONTACT FORM ---
    const contactForm = document.querySelector('form');
    if (contactForm && window.location.pathname.includes('contact.html')) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                setTimeout(() => {
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 1500);
        });
    }

    // --- SCROLL ANIMATIONS ---
    const animatedElements = document.querySelectorAll('.materialize');
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(el => observer.observe(el));
    }

    // --- DYNAMIC COPYRIGHT YEAR ---
    const yearSpan = document.getElementById('copyright-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});