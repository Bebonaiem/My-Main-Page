document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
});

// Scroll Progress Bar
window.onscroll = function() { updateProgressBar() };
function updateProgressBar() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    const bar = document.getElementById("myBar");
    if(bar) bar.style.width = scrolled + "%";
}

// Font Size
function setFontSize(size) {
    document.body.classList.remove('large-font', 'extra-large-font');
    if (size === 'large') document.body.classList.add('large-font');
    if (size === 'extra') document.body.classList.add('extra-large-font');
    localStorage.setItem('fontSize', size);
}

// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    document.body.classList.remove('high-contrast');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('lightMode', isLight);
    localStorage.setItem('highContrast', 'false');
    updateThemeBtn(isLight);
}

function updateThemeBtn(isLight) {
    const btn = document.getElementById('theme-btn');
    if(btn) btn.innerText = isLight ? '🌙 وضع الليل' : '☀️ وضع النهار';
}

function toggleContrast() {
    document.body.classList.toggle('high-contrast');
    document.body.classList.remove('light-mode');
    const isHigh = document.body.classList.contains('high-contrast');
    localStorage.setItem('highContrast', isHigh);
    localStorage.setItem('lightMode', 'false');
}

function loadSettings() {
    const size = localStorage.getItem('fontSize');
    const light = localStorage.getItem('lightMode');
    const high = localStorage.getItem('highContrast');
    if (size) setFontSize(size);
    if (light === 'true') { document.body.classList.add('light-mode'); updateThemeBtn(true); }
    else { updateThemeBtn(false); }
    if (high === 'true') document.body.classList.add('high-contrast');
}

// TTS
function speakText(id) {
    window.speechSynthesis.cancel();
    const text = document.getElementById(id).innerText;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ar-SA'; u.rate = 0.9;
    window.speechSynthesis.speak(u);
}

// Quiz
function checkAnswer(isCorrect, id) {
    const el = document.getElementById(id);
    if(isCorrect) el.innerHTML = '<span style="color:#0f0; font-weight:bold">🎉 إجابة صحيحة!</span>';
    else el.innerHTML = '<span style="color:#f00; font-weight:bold">❌ حاول مرة أخرى</span>';
}