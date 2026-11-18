/* =========================================================
   Malak Ahmed — Portfolio interactions
   - Arabic / English switching (RTL / LTR)
   - Mobile navigation
   - Scroll state, active section, reveal animations
   ========================================================= */

(() => {
  "use strict";

  /* ---------- Translations ---------- */
  const translations = {
    ar: {
      "meta.title": "ملاك أحمد — طالبة علوم الحاسب وتصميم البرمجيات",
      "meta.description":
        "الموقع الشخصي لملاك أحمد، طالبة علوم الحاسب وتصميم البرمجيات — البرمجة وتطوير الويب وتحليل البيانات وتصميم واجهات المستخدم.",

      "a11y.skip": "تخطَّ إلى المحتوى",
      "a11y.nav": "التنقل الرئيسي",
      "a11y.lang": "اختيار اللغة",
      "a11y.menuOpen": "فتح القائمة",
      "a11y.menuClose": "إغلاق القائمة",
      "a11y.email": "إرسال بريد إلكتروني إلى ملاك أحمد",

      name: "ملاك أحمد",

      "nav.home": "الرئيسية",
      "nav.about": "نبذة عني",
      "nav.skills": "المهارات",
      "nav.contact": "التواصل",

      "hero.role": "طالبة علوم الحاسب وتصميم البرمجيات",
      "hero.lead":
        "مرحبًا، أنا ملاك. أهتم بالتقنية وتطوير الويب وتحليل البيانات، وأسعى لتحويل الأفكار إلى حلول رقمية مبتكرة.",
      "hero.cta": "تواصلي معي",

      "about.title": "نبذة عني",
      "about.text":
        "طالبة بكالوريوس في علوم الحاسب وتصميم البرمجيات، أمتلك معرفة في البرمجة وتطوير الويب وتحليل البيانات وقواعد البيانات. لدي خبرة في استخدام Python و Java و MySQL وأدوات تحليل البيانات، إلى جانب خبرة ثلاث سنوات في خدمة العملاء. أسعى إلى تطوير مهاراتي والمساهمة في بناء حلول تقنية مبتكرة وفعالة.",
      "about.educationLabel": "التعليم",
      "about.educationValue": "بكالوريوس علوم الحاسب وتصميم البرمجيات",
      "about.focusLabel": "مجالات الاهتمام",
      "about.focusValue": "تطوير الويب · تحليل البيانات · قواعد البيانات",
      "about.experienceLabel": "الخبرة",
      "about.experienceValue": "ثلاث سنوات في خدمة العملاء",

      "skills.title": "المهارات",
      "skills.programming": "البرمجة",
      "skills.web": "تطوير الويب",
      "skills.data": "تحليل البيانات",
      "skills.database": "إدارة قواعد البيانات",
      "skills.uiux": "تصميم واجهات المستخدم",

      "contact.title": "لنبقَ على تواصل",
      "contact.lead": "يسعدني التواصل معكم ومناقشة الفرص والمشاريع التقنية.",
      "contact.emailLabel": "البريد الإلكتروني",

      "footer.nameAr": "ملاك أحمد",
      "footer.nameEn": "Malak Ahmed",
      "footer.copy": "© 2026 جميع الحقوق محفوظة."
    },

    en: {
      "meta.title": "Malak Ahmed — Computer Science & Software Design Student",
      "meta.description":
        "The personal portfolio of Malak Ahmed, a Computer Science and Software Design student focused on programming, web development, data analysis, and UI/UX design.",

      "a11y.skip": "Skip to content",
      "a11y.nav": "Main navigation",
      "a11y.lang": "Language selection",
      "a11y.menuOpen": "Open menu",
      "a11y.menuClose": "Close menu",
      "a11y.email": "Send an email to Malak Ahmed",

      name: "Malak Ahmed",

      "nav.home": "Home",
      "nav.about": "About Me",
      "nav.skills": "Skills",
      "nav.contact": "Contact",

      "hero.role": "Computer Science & Software Design Student",
      "hero.lead":
        "Hello, I'm Malak. I'm passionate about technology, web development, and data analysis, and I aspire to turn ideas into innovative digital solutions.",
      "hero.cta": "Contact Me",

      "about.title": "About Me",
      "about.text":
        "I'm a Computer Science and Software Design student with knowledge of programming, web development, data analysis, and database management. I have experience with Python, Java, MySQL, and data analysis tools, along with three years of customer service experience. I'm eager to expand my skills and contribute to building innovative and effective technology solutions.",
      "about.educationLabel": "Education",
      "about.educationValue": "B.Sc. in Computer Science & Software Design",
      "about.focusLabel": "Focus Areas",
      "about.focusValue": "Web development · Data analysis · Databases",
      "about.experienceLabel": "Experience",
      "about.experienceValue": "Three years in customer service",

      "skills.title": "Skills",
      "skills.programming": "Programming",
      "skills.web": "Web Development",
      "skills.data": "Data Analysis",
      "skills.database": "Database Management",
      "skills.uiux": "UI/UX Design",

      "contact.title": "Let's Connect",
      "contact.lead":
        "I'd love to connect and discuss new opportunities and technology projects.",
      "contact.emailLabel": "Email",

      "footer.nameAr": "ملاك أحمد",
      "footer.nameEn": "Malak Ahmed",
      "footer.copy": "© 2026 All Rights Reserved."
    }
  };

  /* ---------- Elements ---------- */
  const html = document.documentElement;
  const header = document.getElementById("site-header");
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const langButtons = Array.from(document.querySelectorAll(".lang-btn"));
  const metaDescription = document.querySelector('meta[name="description"]');
  const sections = Array.from(document.querySelectorAll("section[id]"));

  let currentLanguage = "ar";

  /* ---------- Language ---------- */
  const isNavOpen = () => header.classList.contains("nav-open");

  function updateMenuLabel() {
    if (!menuToggle) return;
    const key = isNavOpen() ? "a11y.menuClose" : "a11y.menuOpen";
    menuToggle.setAttribute("aria-label", translations[currentLanguage][key]);
  }

  function setLanguage(language) {
    const dictionary = translations[language];
    if (!dictionary) return;

    currentLanguage = language;

    html.lang = language;
    html.dir = language === "ar" ? "rtl" : "ltr";

    document.title = dictionary["meta.title"];
    if (metaDescription) {
      metaDescription.setAttribute("content", dictionary["meta.description"]);
    }

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (dictionary[key] !== undefined) {
        element.textContent = dictionary[key];
      }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      const key = element.dataset.i18nAria;
      if (dictionary[key] !== undefined) {
        element.setAttribute("aria-label", dictionary[key]);
      }
    });

    langButtons.forEach((button) => {
      const isActive = button.dataset.lang === language;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    updateMenuLabel();
  }

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.lang !== currentLanguage) {
        setLanguage(button.dataset.lang);
      }
    });
  });

  /* ---------- Mobile navigation ---------- */
  function openNav() {
    header.classList.add("nav-open");
    menuToggle.setAttribute("aria-expanded", "true");
    updateMenuLabel();
  }

  function closeNav() {
    if (!isNavOpen()) return;
    header.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", "false");
    updateMenuLabel();
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      if (isNavOpen()) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  document.querySelectorAll('.nav a, .brand').forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });

  document.addEventListener("click", (event) => {
    if (isNavOpen() && !header.contains(event.target)) closeNav();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeNav();
  });

  /* ---------- Header state & active section ---------- */
  function updateActiveSection() {
    const probe = window.scrollY + header.offsetHeight + Math.min(window.innerHeight * 0.3, 180);
    let activeId = sections[0] ? sections[0].id : null;

    sections.forEach((section) => {
      if (section.offsetTop <= probe) activeId = section.id;
    });

    const atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;

    if (atBottom && sections.length) {
      activeId = sections[sections.length - 1].id;
    }

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${activeId}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  let scrollTicking = false;

  function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(() => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      updateActiveSection();
      scrollTicking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateActiveSection);

  /* ---------- Reveal on scroll ---------- */
  const revealElements = Array.from(document.querySelectorAll(".reveal"));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  /* ---------- Footer names ----------
     Keep both names correct even if the static HTML was saved
     with a non-UTF-8 encoding by an editor or upload tool. */
  function normalizeFooterNames() {
    const arabicName = document.querySelector('.footer-name span[lang="ar"]');
    const englishName = document.querySelector('.footer-name span[lang="en"]');

    if (arabicName) arabicName.textContent = translations.ar.name;
    if (englishName) englishName.textContent = translations.en.name;
  }

  /* ---------- Init ---------- */
  normalizeFooterNames();
  setLanguage("ar");
  onScroll();
})();
