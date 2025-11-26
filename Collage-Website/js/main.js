document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    
    // حركة ظهور البطاقات
    const cards = document.querySelectorAll('.lesson-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

function setFontSize(size) {
    document.body.classList.remove('large-font', 'extra-large-font');
    if (size === 'large') document.body.classList.add('large-font');
    if (size === 'extra') document.body.classList.add('extra-large-font');
    localStorage.setItem('fontSize', size);
}

// دالة تبديل الثيم
function toggleTheme() {
    // التبديل بإضافة/إزالة كلاس الوضع المضيء
    document.body.classList.toggle('light-mode');
    document.body.classList.remove('high-contrast'); // إيقاف التباين العالي
    
    const isLight = document.body.classList.contains('light-mode');
    
    // حفظ الحالة
    localStorage.setItem('lightMode', isLight);
    localStorage.setItem('highContrast', 'false');
    
    updateThemeButtonText(isLight);
}

function updateThemeButtonText(isLight) {
    const btn = document.getElementById('theme-btn');
    if(btn) {
        if (isLight) {
            btn.innerText = '🌙 الوضع المظلم'; // إذا كنا في المضيء، نعرض زر للتحويل للمظلم
        } else {
            btn.innerText = '☀️ الوضع المضيء'; // إذا كنا في المظلم، نعرض زر للتحويل للمضيء
        }
    }
}

function toggleContrast() {
    document.body.classList.toggle('high-contrast');
    document.body.classList.remove('light-mode');
    
    const isHighContrast = document.body.classList.contains('high-contrast');
    localStorage.setItem('highContrast', isHighContrast);
    localStorage.setItem('lightMode', 'false');
}

function loadSettings() {
    const fontSize = localStorage.getItem('fontSize');
    const lightMode = localStorage.getItem('lightMode');
    const highContrast = localStorage.getItem('highContrast');

    if (fontSize) setFontSize(fontSize);
    
    // التحقق مما إذا كان الوضع المضيء محفوظاً
    if (lightMode === 'true') {
        document.body.classList.add('light-mode');
        updateThemeButtonText(true);
    } else {
        updateThemeButtonText(false); // الوضع الافتراضي (المظلم)
    }
    
    if (highContrast === 'true') document.body.classList.add('high-contrast');
}

function speakText(elementId) {
    window.speechSynthesis.cancel();
    const text = document.getElementById(elementId).innerText;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}

function checkAnswer(isCorrect, feedbackId) {
    const feedbackEl = document.getElementById(feedbackId);
    if (isCorrect) {
        feedbackEl.innerHTML = '<span style="color:#00ff00; font-weight:bold; font-size:1.2rem">🎉 إجابة صحيحة!</span>';
    } else {
        feedbackEl.innerHTML = '<span style="color:#ff0000; font-weight:bold; font-size:1.2rem">❌ حاول مرة أخرى</span>';
    }
}