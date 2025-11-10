document.addEventListener('DOMContentLoaded', function() {
    // Generic script for all detail pages
    const headerElement = document.querySelector('.header');
    const footerElement = document.querySelector('.footer');
    const pathPrefix = '../'; 

    const headerHTML = `<div class="container"><a href="${pathPrefix}../" class="logo">learnfun.me</a><nav class="nav-links"><ul><li><a href="${pathPrefix}../" data-nav-key="home" data-translate-key="navHome"></a></li><li><a href="${pathPrefix}../tech/" data-nav-key="tech" data-translate-key="navTech"></a></li><li><a href="${pathPrefix}../contact/" data-nav-key="contact" data-translate-key="navContact"></a></li></ul></nav><button class="menu-toggle" id="menu-toggle" aria-label="Toggle navigation menu"><span data-translate-aria="menuAriaLabel"></span><span></span><span></span></button></div>`;
    const footerHTML = `<div class="container"><div class="footer-content"><div class="footer-section"><h4 data-translate-key="footerAboutTitle"></h4><p data-translate-key="footerAboutText"></p></div><div class="footer-section"><h4 data-translate-key="footerLinksTitle"></h4><ul><li><a href="${pathPrefix}../about/" data-translate-key="footerAboutLink"></a></li><li><a href="${pathPrefix}../contact/" data-translate-key="footerContactLink"></a></li><li><a href="${pathPrefix}../privacy-policy/" data-translate-key="footerPrivacyLink"></a></li><li><a href="${pathPrefix}../terms-of-service/" data-translate-key="footerTermsLink"></a></li></ul></div><div class="footer-section"><h4 data-translate-key="footerFollowTitle"></h4><div class="social-links"><a href="#" aria-label="Facebook">F</a><a href="#" aria-label="Twitter">T</a><a href="#" aria-label="Instagram">I</a></div></div></div><div class="footer-bottom"><p data-translate-key="footerRights"></p><p data-translate-key="footerDeveloper"></p></div></div>`;
        
    if(headerElement) headerElement.innerHTML = headerHTML;
    if(footerElement) footerElement.innerHTML = footerHTML;

    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
    }

    const langSwitcher = document.getElementById('lang-switcher');
    const setLanguage = (lang) => {
        localStorage.setItem('siteLanguage', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.body.className = `page-body ${lang}-layout`;

        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.dataset.translateKey;
            if (translations[key] && translations[key][lang]) {
                el.innerHTML = translations[key][lang];
            }
        });
        
        if (pageKey) {
            const titleKey = `${pageKey}PageTitle`;
            const metaDescKey = `${pageKey}MetaDescription`;
            if (translations[titleKey]?.[lang]) document.title = translations[titleKey][lang];
            const metaDescEl = document.querySelector('meta[name="description"]');
            if (metaDescEl && translations[metaDescKey]?.[lang]) metaDescEl.content = translations[metaDescKey][lang];
        }

        document.querySelectorAll('[data-translate-alt]').forEach(el => {
            const key = el.dataset.translateAlt;
            if (translations[key]?.[lang]) el.alt = translations[key][lang];
        });

        document.querySelectorAll('[data-translate-aria]').forEach(el => {
            const key = el.dataset.translateAria;
            if (translations[key]?.[lang]) el.setAttribute('aria-label', translations[key][lang]);
        });

        document.querySelectorAll('#lang-switcher a').forEach(a => a.classList.toggle('active', a.dataset.lang === lang));
        
        const currentNavKey = pageKey?.startsWith('techDetail') ? 'tech' : pageKey;
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.toggle('active', link.dataset.navKey === currentNavKey);
        });
    };

    if (langSwitcher) {
        langSwitcher.addEventListener('click', (e) => {
            e.preventDefault();
            const targetLink = e.target.closest('a');
            if (targetLink?.dataset.lang) setLanguage(targetLink.dataset.lang);
        });
    }

    const initialLang = localStorage.getItem('siteLanguage') || (navigator.language.slice(0, 2) === 'ar' ? 'ar' : 'en');
    setLanguage(initialLang);
});