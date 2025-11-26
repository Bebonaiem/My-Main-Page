document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    highlightCurrentPage();
    setupKeyboardNavigation();
});

// Setup keyboard navigation for navbar
function setupKeyboardNavigation() {
    const navbar = document.querySelector('.main-navbar');
    if (!navbar) return;
    
    navbar.addEventListener('keydown', function(event) {
        // ESC key to close mobile menu
        if (event.key === 'Escape') {
            const navLinks = document.getElementById('navLinks');
            const btn = document.querySelector('.mobile-menu-btn');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (btn) btn.innerHTML = '☰';
            }
        }
    });
}

// Highlight current page in navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref && (linkHref === currentPage || 
            (currentPage === 'index.html' && linkHref === 'index.html'))) {
            link.classList.add('current-page');
        }
    });
}

// === Font Size ===
function setFontSize(size) {
    document.body.classList.remove('large-font', 'extra-large-font');
    if (size === 'large') document.body.classList.add('large-font');
    if (size === 'extra') document.body.classList.add('extra-large-font');
    localStorage.setItem('fontSize', size);
}

// === Theme Logic ===
function setTheme(themeName) {
    // 1. Remove all existing theme classes
    document.body.classList.remove(
        'light-mode', 
        'nature-mode', 
        'sunset-mode', 
        'reading-mode', 
        'high-contrast'
    );

    // 2. Add the selected class (unless it's 'default')
    if (themeName !== 'default') {
        document.body.classList.add(themeName);
    }

    // 3. Save to storage
    localStorage.setItem('selectedTheme', themeName);
}

// === Load Settings on Startup ===
function loadSettings() {
    // 1. Load Font
    const size = localStorage.getItem('fontSize');
    if (size) setFontSize(size);

    // 2. Load Theme
    const theme = localStorage.getItem('selectedTheme') || 'default';
    setTheme(theme);

    // 3. Update the Dropdown to match current theme
    const selector = document.getElementById('theme-selector');
    if (selector) {
        selector.value = theme;
    }
}

// === Scroll Progress Bar ===
window.onscroll = function() { updateProgressBar() };
function updateProgressBar() {
    const bar = document.getElementById("myBar");
    if(bar) {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        bar.style.width = scrolled + "%";
    }
}

// === Text to Speech (TOGGLE: Start/Stop) ===
let currentSpeakingId = null; // Variable to track what is currently being spoken

function speakText(id) {
    // 1. Check if we are currently speaking AND the clicked ID is the same as the active one
    if (window.speechSynthesis.speaking && currentSpeakingId === id) {
        window.speechSynthesis.cancel(); // Stop speaking
        currentSpeakingId = null;        // Reset tracker
        return;                          // Exit function
    }

    // 2. If it's a new ID or nothing is speaking, stop any previous sound first
    window.speechSynthesis.cancel();
    
    const element = document.getElementById(id);
    if(element) {
        const text = element.innerText;
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'ar-SA'; 
        u.rate = 0.9;
        
        // When speech finishes naturally, reset the tracker so the next click starts it again
        u.onend = function() {
            currentSpeakingId = null;
        };

        currentSpeakingId = id; // Set this as the active ID
        window.speechSynthesis.speak(u);
    }
}

// === Quiz Logic ===
function checkAnswer(isCorrect, id) {
    const el = document.getElementById(id);
    if(isCorrect) el.innerHTML = '<span style="color:var(--primary-color); font-weight:bold; font-size:1.1rem;">🎉 إجابة صحيحة!</span>';
    else el.innerHTML = '<span style="color:red; font-weight:bold; font-size:1.1rem;">❌ حاول مرة أخرى</span>';
}

// === Mobile Menu Toggle ===
function toggleMobileMenu() {
    const navLinks = document.getElementById("navLinks");
    if (navLinks) {
        navLinks.classList.toggle("active");
        
        const btn = document.querySelector('.mobile-menu-btn');
        if (btn) {
            if(navLinks.classList.contains('active')){
                btn.innerHTML = '✕'; // Close icon
                // Focus first link for accessibility
                setTimeout(() => {
                    const firstLink = navLinks.querySelector('a');
                    if (firstLink) firstLink.focus();
                }, 100);
            } else {
                btn.innerHTML = '☰'; // Menu icon
            }
        }
    }
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.getElementById('navLinks');
    const btn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.main-navbar');
    
    // If clicking anywhere that is NOT the navbar and NOT the button
    if (nav && nav.classList.contains('active') && !navbar.contains(event.target)) {
        nav.classList.remove('active');
        if (btn) btn.innerHTML = '☰';
    }
});

// Handle dropdown menus
document.addEventListener('click', function(event) {
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.main-navbar');
    
    // Close dropdowns when clicking outside navbar
    if (navbar && !navbar.contains(event.target)) {
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(dropdown => {
            dropdown.style.display = '';
        });
        return;
    }
    
    // Handle mobile menu dropdowns
    if (navLinks && navLinks.classList.contains('active')) {
        const dropdownItems = navLinks.querySelectorAll('li');
        dropdownItems.forEach(item => {
            const dropdown = item.querySelector('.dropdown-content');
            if (dropdown && item.contains(event.target) && event.target.tagName === 'A') {
                // Toggle dropdown visibility on mobile
                if (window.innerWidth <= 850) {
                    const isVisible = dropdown.style.display === 'flex';
                    // Hide all dropdowns first
                    navLinks.querySelectorAll('.dropdown-content').forEach(d => d.style.display = 'none');
                    // Toggle the clicked one
                    if (!isVisible) {
                        dropdown.style.display = 'flex';
                    }
                }
            }
        });
    }
});

// Close dropdowns when mouse leaves navbar (desktop)
document.addEventListener('mouseleave', function(event) {
    if (window.innerWidth > 850) {
        const navbar = document.querySelector('.main-navbar');
        if (navbar && navbar.contains(event.relatedTarget)) return;
        
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(dropdown => {
            dropdown.style.display = '';
        });
    }
});