document.addEventListener('DOMContentLoaded', function() {

    /**
     * =================================================================
     * TRANSLATION DICTIONARY (WITH NEW ADDITIONS)
     * =================================================================
     */
    const translations = {
        // --- Translation keys used in index.html ---
        readFullReviewBtn: { ar: 'اقرأ المراجعة الكاملة', en: 'Read Full Review' },
        heroTitleV2: { ar: 'قرارك التقني يبدأ من هنا', en: 'Your Next Tech Decision Starts Here' },
        heroSubtitleV2: { ar: 'مراجعات عميقة ومقارنات حيادية لمساعدتك على اختيار الأفضل في عالم التكنولوجيا.', en: 'In-depth reviews and unbiased comparisons to help you choose the best in the world of technology.' },
        heroButtonV2: { ar: 'تصفح أحدث المراجعات', en: 'Browse Latest Reviews' },
        heroButtonSecondary: { ar: 'تعرف علينا أكثر', en: 'Learn More About Us' },
        featuredTitle: { ar: 'أحدث المراجعات', en: 'Latest Reviews' },
        badgeBestAllRound: { ar: 'الأفضل تكاملاً', en: 'Best All-Round' },
        badgeBestVideo: { ar: 'الأفضل للفيديو', en: 'Best for Video' },
        badgeBestCamera: { ar: 'الأفضل تصويراً', en: 'Best Camera' },
        badgeBestGaming: { ar: 'وحش الألعاب', en: 'Gaming Beast' },
        badgePremiumFlagship: { ar: 'رائد فاخر', en: 'Premium Flagship' },
        badgeUltimateCamera: { ar: 'كاميرا مطلقة', en: 'Ultimate Camera' },
        techReview1Title: { ar: 'مراجعة هاتف Galaxy S25 Ultra', en: 'Galaxy S25 Ultra Review' },
        techReview2Title: { ar: 'مراجعة iPhone 16 Pro Max', en: 'iPhone 16 Pro Max Review' },
        techReview3Title: { ar: 'مراجعة Google Pixel 9 Pro', en: 'Google Pixel 9 Pro Review' },
        techReview1Desc: { ar: 'الهاتف الذي لا يقدم أي تنازلات، يجمع بين القوة والتصوير الاحترافي.', en: 'The phone that makes no compromises, combining power and pro photography.'},
        techReview2Desc: { ar: 'ملك تسجيل الفيديو وتجربة النظام البيئي المتكاملة من آبل.', en: 'The king of video recording and Apple\'s integrated ecosystem experience.'},
        techReview3Desc: { ar: 'ذكاء اصطناعي فائق وتصوير فوتوغرافي يعيد تعريف الواقعية.', en: 'Superior AI and computational photography that redefines reality.'},
        techReviewASUSROG9ProTitle: { ar: 'مراجعة ASUS ROG Phone 9 Pro', en: 'ASUS ROG Phone 9 Pro Review' },
        techReviewHonorMagic8ProTitle: { ar: 'مراجعة Honor Magic 8 Pro', en: 'Honor Magic 8 Pro Review' },
        techReview18Title: { ar: 'مراجعة Xiaomi 15 Ultra', en: 'Xiaomi 15 Ultra Review' },
        techReviewASUSROG9ProDesc: { ar: 'أقوى هاتف للألعاب مع أحدث المعالجات ونظام التبريد المتقدم.', en: 'The most powerful gaming phone with the latest processors and advanced cooling system.'},
        techReviewHonorMagic8ProDesc: { ar: 'رائد فاخر مع كاميرا متطورة وتصميم أنيق.', en: 'Premium flagship with advanced camera and elegant design.'},
        techReview18Desc: { ar: 'أفضل كاميرا في هاتف ذكي مع مستشعر بحجم 1 بوصة.', en: 'The best camera in a smartphone with a 1-inch sensor.'},
        whyUsTitle: { ar: 'لماذا تثق في Learn Fun؟', en: 'Why Trust Learn Fun?' },
        whyUsCard1Title: { ar: 'تحليل عميق', en: 'In-Depth Analysis' },
        whyUsCard1Desc: { ar: 'نحن لا نكتفي بالمواصفات. نغوص في صلب التجربة لنقدم لك التفاصيل التي تهمك حقًا.', en: 'We don\'t just list specs. We dive into the core experience to give you the details that truly matter.' },
        whyUsCard2Title: { ar: 'مراجعات حيادية', en: 'Unbiased Reviews' },
        whyUsCard2Desc: { ar: 'هدفنا الوحيد هو مساعدتك. مراجعاتنا مستقلة تمامًا ومبنية على اختبارات واقعية.', en: 'Our only goal is to help you. Our reviews are completely independent and based on real-world testing.' },
        whyUsCard3Title: { ar: 'محتوى سهل الفهم', en: 'Easy to Understand' },
        whyUsCard3Desc: { ar: 'نترجم المصطلحات التقنية المعقدة إلى لغة بسيطة وواضحة، مما يجعل اتخاذ القرار أسهل.', en: 'We translate complex technical jargon into simple, clear language, making your decision-making easier.' },
        whyUsCard4Title: { ar: 'محدث باستمرار', en: 'Constantly Updated' },
        whyUsCard4Desc: { ar: 'نقوم بتحديث مراجعاتنا باستمرار لتعكس أحدث التطورات في عالم التكنولوجيا.', en: 'We constantly update our reviews to reflect the latest developments in the world of technology.' },
        latestTechTitle: { ar: 'أحدث التقنيات', en: 'Latest Technology' },
        ctaTitle: { ar: 'هل أنت جاهز لاكتشاف المزيد؟', en: 'Ready to Discover More?' },
        ctaDesc: { ar: 'قسمنا التقني مليء بالمراجعات والمقارنات لمساعدتك على اتخاذ القرار الصحيح.', en: 'Our tech section is packed with reviews and comparisons to help you make the right call.' },
        ctaButton: { ar: 'اذهب إلى قسم التقنية', en: 'Go to Tech Section' }
    };

    /**
     * =================================================================
     * DYNAMICALLY LOAD HEADER AND FOOTER
     * =================================================================
     */
    const headerElement = document.querySelector('.header');
    const footerElement = document.querySelector('.footer');
    const pathPrefix = document.body.dataset.pageKey.startsWith('techDetail') ? '../' : '';

    const headerHTML = `
        <div class="container">
            <a href="./" class="logo" data-translate-key="siteName"></a>
            <nav class="nav-links">
                <ul>
                    <li><a href="./" data-translate-key="navHome" data-nav-key="index"></a></li>
                    <li><a href="tech/" data-translate-key="navTech" data-nav-key="tech"></a></li>
                    <li><a href="contact/" data-translate-key="navContact" data-nav-key="contact"></a></li>
                </ul>
            </nav>
            <button class="menu-toggle" id="menu-toggle" aria-label="Open Menu" data-translate-key="menuAriaLabel"><span></span><span></span><span></span></button>
        </div>`;
    
    const footerHTML = `
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4 data-translate-key="footerAboutTitle"></h4>
                    <p data-translate-key="footerAboutText"></p>
                </div>
                <div class="footer-section">
                    <h4 data-translate-key="footerLinksTitle"></h4>
                    <ul>
                        <li><a href="about/" data-translate-key="footerAboutLink"></a></li>
                        <li><a href="contact/" data-translate-key="footerContactLink"></a></li>
                        <li><a href="privacy-policy/" data-translate-key="footerPrivacyLink"></a></li>
                        <li><a href="terms-of-service/" data-translate-key="footerTermsLink"></a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4 data-translate-key="footerFollowTitle"></h4>
                    <div class="social-links">
                        <a href="#" aria-label="Facebook">F</a>
                        <a href="#" aria-label="Twitter">T</a>
                        <a href="#" aria-label="Instagram">I</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p data-translate-key="footerRights"></p>
                <p data-translate-key="footerDeveloper"></p>
            </div>
        </div>`;
        
    if(headerElement) headerElement.innerHTML = headerHTML;
    if(footerElement) footerElement.innerHTML = footerHTML;

    /**
     * =================================================================
     * MOBILE MENU TOGGLE
     * =================================================================
     */
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    /**
     * =================================================================
     * HEADER SCROLL EFFECT
     * =================================================================
     */
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /**
     * =================================================================
     * LANGUAGE SWITCHING LOGIC
     * =================================================================
     */
    const langSwitcher = document.getElementById('lang-switcher');

    const setLanguage = (lang) => {
        localStorage.setItem('siteLanguage', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.body.classList.remove('rtl-layout', 'ltr-layout');
        document.body.classList.add(lang === 'ar' ? 'rtl-layout' : 'ltr-layout');

        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.dataset.translateKey;
            if (translations[key] && translations[key][lang]) {
                el.innerHTML = translations[key][lang];
            }
        });
        
        const pageKey = document.body.dataset.pageKey;
        if (pageKey) {
            const titleKey = `${pageKey}PageTitle`;
            const metaDescKey = `${pageKey}MetaDescription`;
            if (translations[titleKey] && translations[titleKey][lang]) {
                document.title = translations[titleKey][lang];
            }
            const metaDescEl = document.querySelector('meta[name="description"]');
            if (metaDescEl && translations[metaDescKey] && translations[metaDescKey][lang]) {
                metaDescEl.setAttribute('content', translations[metaDescKey][lang]);
            }
        }

        document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
            const key = el.dataset.translatePlaceholder;
            if (translations[key] && translations[key][lang]) {
                el.placeholder = translations[key][lang];
            }
        });

        document.querySelectorAll('[data-translate-alt]').forEach(el => {
            const key = el.dataset.translateAlt;
            if (translations[key] && translations[key][lang]) {
                el.alt = translations[key][lang];
            }
        });

        document.querySelectorAll('#lang-switcher a').forEach(a => {
            a.classList.toggle('active', a.dataset.lang === lang);
        });
        
        const currentNavKey = pageKey.startsWith('techDetail') ? 'tech' : pageKey;
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.toggle('active', link.dataset.navKey === currentNavKey);
        });
    };

    if (langSwitcher) {
        langSwitcher.addEventListener('click', (e) => {
            e.preventDefault();
            const targetLink = e.target.closest('a');
            if (targetLink && targetLink.dataset.lang) {
                setLanguage(targetLink.dataset.lang);
            }
        });
    }

    const savedLang = localStorage.getItem('siteLanguage');
    const browserLang = navigator.language.slice(0, 2);
    const initialLang = savedLang || (browserLang === 'ar' ? 'ar' : 'en');
    setLanguage(initialLang);
    
    // Set initial content to prevent layout shift
    const heroTitle = document.querySelector('[data-translate-key="heroTitleV2"]');
    const heroSubtitle = document.querySelector('[data-translate-key="heroSubtitleV2"]');
    if (heroTitle && heroSubtitle) {
        heroTitle.textContent = translations.heroTitleV2[initialLang];
        heroSubtitle.textContent = translations.heroSubtitleV2[initialLang];
    }

});