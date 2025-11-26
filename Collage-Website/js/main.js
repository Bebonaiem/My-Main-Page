document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
});

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

// === Text to Speech ===
function speakText(id) {
    window.speechSynthesis.cancel();
    const element = document.getElementById(id);
    if(element) {
        const text = element.innerText;
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'ar-SA'; u.rate = 0.9;
        window.speechSynthesis.speak(u);
    }
}

// === Quiz Logic ===
function checkAnswer(isCorrect, id) {
    const el = document.getElementById(id);
    if(isCorrect) el.innerHTML = '<span style="color:var(--primary-color); font-weight:bold; font-size:1.1rem;">🎉 إجابة صحيحة!</span>';
    else el.innerHTML = '<span style="color:red; font-weight:bold; font-size:1.1rem;">❌ حاول مرة أخرى</span>';
}