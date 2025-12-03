document.addEventListener('DOMContentLoaded', function () {
    // --- Common Translations ---
    const commonTranslations = {
        siteName: { ar: 'learnfun.me', en: 'learnfun.me' },
        navHome: { ar: 'الرئيسية', en: 'Home' },
        navTech: { ar: 'أجهزة وتقنية', en: 'Tech & Gadgets' },
        navContact: { ar: 'اتصل بنا', en: 'Contact Us' },
        footerAboutTitle: { ar: 'حول LearnFun.me', en: 'About LearnFun.me' },
        footerAboutText: { ar: 'موقعك للمعرفة والتقنية، نسعى لتقديم محتوى قيم ومفيد في مجالات متنوعة.', en: 'Your site for knowledge and technology. We strive to provide valuable and useful content in various fields.' },
        footerLinksTitle: { ar: 'روابط هامة', en: 'Important Links' },
        footerPrivacyLink: { ar: 'سياسة الخصوصية', en: 'Privacy Policy' },
        footerTermsLink: { ar: 'شروط الاستخدام', en: 'Terms of Service' },
        footerAboutLink: { ar: 'من نحن', en: 'About Us' },
        footerContactLink: { ar: 'اتصل بنا', en: 'Contact Us' },
        footerFollowTitle: { ar: 'تابعنا', en: 'Follow Us' },
        footerRights: { ar: 'جميع الحقوق محفوظة © 2025 لموقع learnfun.me', en: 'All Rights Reserved © 2025 learnfun.me' },
        footerDeveloper: { ar: 'تم التطوير والتصميم بواسطة بيبو نعيم', en: 'Developed and Designed by Bebo Naiem' },
        // Cookie Consent Translations
        cookieTitle: { ar: 'نحن نستخدم ملفات تعريف الارتباط', en: 'We Use Cookies' },
        cookieMessage: { ar: 'نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربتك على موقعنا، وتحليل حركة المرور، وتخصيص المحتوى. باستمرارك في استخدام موقعنا، فإنك توافق على استخدامنا لملفات تعريف الارتباط وفقًا لسياسة الخصوصية الخاصة بنا.', en: 'We use cookies to improve your experience on our site, analyze traffic, and personalize content. By continuing to use our site, you agree to our use of cookies in accordance with our Privacy Policy.' },
        cookieAccept: { ar: 'موافق', en: 'Accept' },
        cookieDecline: { ar: 'رفض', en: 'Decline' },
        cookieLearnMore: { ar: 'معرفة المزيد', en: 'Learn More' }
    };

    // --- Merge Translations ---
    // Combine common translations with page-specific translations defined in window.pageTranslations
    const allTranslations = { ...commonTranslations, ...(window.pageTranslations || {}) };

    // --- Language Switcher Logic ---
    const langSwitcher = document.getElementById('lang-switcher');

    const setLanguage = (lang) => {
        localStorage.setItem('siteLanguage', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.body.className = `page-body ${lang}-layout`;

        // Update Text Content
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.dataset.translateKey;
            if (allTranslations[key] && allTranslations[key][lang]) {
                el.innerHTML = allTranslations[key][lang];
            }
        });

        // Update Page Title and Meta Description
        const pageKey = document.body.dataset.pageKey;
        if (pageKey) {
            const titleKey = `${pageKey}PageTitle`;
            const metaDescKey = `${pageKey}MetaDescription`;
            if (allTranslations[titleKey]?.[lang]) document.title = allTranslations[titleKey][lang];
            const metaDescEl = document.querySelector('meta[name="description"]');
            if (metaDescEl && allTranslations[metaDescKey]?.[lang]) metaDescEl.content = allTranslations[metaDescKey][lang];
        }

        // Update Alt Texts
        document.querySelectorAll('[data-translate-alt]').forEach(el => {
            const key = el.dataset.translateAlt;
            if (allTranslations[key]?.[lang]) el.alt = allTranslations[key][lang];
        });

        // Update Placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
            const key = el.dataset.translatePlaceholder;
            if (allTranslations[key]?.[lang]) el.placeholder = allTranslations[key][lang];
        });

        // Update Active States
        if (langSwitcher) {
            document.querySelectorAll('#lang-switcher a').forEach(a => a.classList.toggle('active', a.dataset.lang === lang));
        }

        const currentNavKey = pageKey?.startsWith('techDetail') ? 'tech' : pageKey;
        document.querySelectorAll('.nav-links a').forEach(link => link.classList.toggle('active', link.dataset.navKey === currentNavKey));
    };

    if (langSwitcher) {
        langSwitcher.addEventListener('click', (e) => {
            e.preventDefault();
            const targetLink = e.target.closest('a');
            if (targetLink?.dataset.lang) setLanguage(targetLink.dataset.lang);
        });
    }

    // Initialize Language
    const initialLang = localStorage.getItem('siteLanguage') || (navigator.language.slice(0, 2) === 'ar' ? 'ar' : 'en');
    setLanguage(initialLang);

    // --- Menu Toggle Logic ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // --- Sticky Header Scroll Effect ---
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        // Check on load
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        }
    }

    // --- Cookie Consent Banner ---
    const createCookieBanner = () => {
        // Check if user has already made a choice
        if (localStorage.getItem('cookieConsent')) {
            return;
        }

        // Create cookie banner HTML
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-consent-content">
                <div class="cookie-consent-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                        <circle cx="8" cy="10" r="1.5" fill="currentColor"/>
                        <circle cx="16" cy="10" r="1.5" fill="currentColor"/>
                        <circle cx="12" cy="15" r="1.5" fill="currentColor"/>
                        <circle cx="9" cy="13" r="1" fill="currentColor"/>
                        <circle cx="15" cy="13" r="1" fill="currentColor"/>
                    </svg>
                </div>
                <div class="cookie-consent-text">
                    <h3 data-translate-key="cookieTitle"></h3>
                    <p data-translate-key="cookieMessage"></p>
                </div>
                <div class="cookie-consent-buttons">
                    <button id="cookie-accept" class="btn btn-primary" data-translate-key="cookieAccept"></button>
                    <button id="cookie-decline" class="btn btn-secondary-outline" data-translate-key="cookieDecline"></button>
                    <a href="/privacy-policy/" class="cookie-learn-more" data-translate-key="cookieLearnMore"></a>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        // Update text based on current language
        const currentLang = localStorage.getItem('siteLanguage') || 'ar';
        banner.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.dataset.translateKey;
            if (allTranslations[key] && allTranslations[key][currentLang]) {
                el.textContent = allTranslations[key][currentLang];
            }
        });

        // Handle accept button
        document.getElementById('cookie-accept').addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            banner.classList.add('fade-out');
            setTimeout(() => banner.remove(), 300);
        });

        // Handle decline button
        document.getElementById('cookie-decline').addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            banner.classList.add('fade-out');
            setTimeout(() => banner.remove(), 300);
        });

        // Show banner with animation
        setTimeout(() => banner.classList.add('show'), 100);
    };

    // Initialize cookie banner
    createCookieBanner();
});


