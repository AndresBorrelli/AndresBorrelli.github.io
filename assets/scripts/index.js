// -----------------------------------------------------------------------------
//  
// -----------------------------------------------------------------------------

var sectionsToObserve = [];

var sectionObserver;

const sectionObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

var navItems;

// -----------------------------------------------------------------------------
window.addEventListener('load', function (e) {

    const preferredLang = localStorage.getItem('user-lang');
    const browserLang = navigator.language || navigator.userLanguage;
    const isEnPage = window.location.pathname.includes('index_en.html');

    if ((preferredLang === 'en' || (!preferredLang && browserLang.startsWith('en'))) && !isEnPage) {
        window.location.replace("index_en.html");
    } else if (preferredLang === 'es' && isEnPage) {
        window.location.replace("./");
    }

    var mainElement = document.querySelector('main');

    mainNav = this.document.querySelector('#main_nav');

    navItems = document.querySelectorAll('.nav-item');

    sectionsObserver();

    var langToggle = this.document.getElementById('lang_toggle');

    langToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = e.currentTarget.classList.contains('EN') ? 'en' : 'es';
        toggleLang(lang);
    });

});
//------------------------------------------------------------------------------
function sectionsObserver() {

    sectionObserver = new IntersectionObserver(sectionObserved, sectionObserverOptions);

    sectionsToObserve = document.querySelectorAll('section.main-section');

    for (var i = 0; i < sectionsToObserve.length; i++) {
        sectionObserver.observe(sectionsToObserve[i]);
    }

}
//------------------------------------------------------------------------------
function sectionObserved(entries, observer) {

    var entry = entries[0];

    if (entry.isIntersecting) {
        var section = entry.target;
        for (var i = 0; i < navItems.length; i++) {
            navItems[i].classList.remove('active');
        }
        const activeLink = document.querySelector(`.nav-item[href="#${section.id}"]`);
        if (activeLink) {
            activeLink.classList.add("active");
        }
    }
}
// -----------------------------------------------------------------------------
// Forzar cambio de idioma 
// -----------------------------------------------------------------------------
function toggleLang(lang) {

    localStorage.setItem('user-lang', lang);

    const target = (lang === 'en') ? "index_en.html" : "./";

    window.location.replace(target);

}
// -----------------------------------------------------------------------------