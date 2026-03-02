// -----------------------------------------------------------------------------
//  
// -----------------------------------------------------------------------------
var delayForDebug = 0;

var sectionsToLoad = [];

var sectionObserver;

const sectionObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

var navItems;
 
// -----------------------------------------------------------------------------
window.addEventListener('load', function(e) {

    var mainElement = document.querySelector('main');
    
    delayForDebug = mainElement && mainElement.getAttribute('delayForDebug') ? parseInt(mainElement.getAttribute('delayForDebug')) * 1000 : 0;

    mainNav = this.document.querySelector('#main_nav');

    navItems = document.querySelectorAll('.nav-item');
    footerNavItems = document.querySelectorAll('.footer-nav-item');
  
    setNavItemsEvents();

    setSectionLoaders();

    var langToggle = this.document.getElementById('lang_toggle');

    langToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = e.currentTarget.classList.contains('EN') ? 'en' : 'es';
        toggleLang(lang);
    });

});
//------------------------------------------------------------------------------
function setNavItemsEvents() {

    for (var i = 0; i < navItems.length; i++) {
        navItems[i].addEventListener('click', function (e) {
            var mainNavButton = document.getElementById('nav_button');
            mainNavButton.checked = false;
        });
    }
}
//------------------------------------------------------------------------------
function setSectionLoaders() {

    sectionObserver = new IntersectionObserver(loadSection, sectionObserverOptions);

    sectionsToLoad = document.querySelectorAll('section.main-section');

    for (var i = 0; i < sectionsToLoad.length; i++) {
        sectionObserver.observe(sectionsToLoad[i]);
    }
    
}   
//------------------------------------------------------------------------------
function loadSection(entries, observer) {

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

    const target = (lang === 'en') ? "index_en.html" : "index.html";
    
    window.location.replace(target);

}
// -----------------------------------------------------------------------------