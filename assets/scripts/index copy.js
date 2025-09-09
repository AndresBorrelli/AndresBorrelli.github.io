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

    mainNav = this.document.querySelector('#main-nav')

    navItems = document.querySelectorAll('.main-nav-item');
  
    setNavItemsEvents();

    setSectionLoaders();

});
//------------------------------------------------------------------------------
function setNavItemsEvents() {

    navItems[0].classList.add('current-link');

    for (var i = 0; i < navItems.length; i++) {
        navItems[i].addEventListener('click', function (e) {
            var mainNavButton = document.getElementById('main_nav_button');
            mainNavButton.checked = false;
        });
    }
}   
//------------------------------------------------------------------------------
function loadSectionStyles(section) {

    var cssFile = section.getAttribute('data-css');

    if (cssFile) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssFile;
        document.head.appendChild(link);
    } else {
        console.warn('No se encontró el archivo CSS para la sección:', section.id);
    }
}
//------------------------------------------------------------------------------
function loadSection(entries, observer) {

    var entry = entries[0];

    if (entry.isIntersecting) {
        var section = entry.target;
        setCurrentLink(section);
        var src = section.getAttribute('data-src');
        if (section.classList.contains('not-loaded') && src) {
            setTimeout(function() {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', src, true);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        var loader = section.querySelector('.loader');
                        if (loader) {
                            loader.parentNode.removeChild(loader);
                        }
                        var contentDiv = section.querySelector('.section-content');
                        if (contentDiv) {
                            contentDiv.insertAdjacentHTML('beforeend', xhr.responseText);
                        }
                        loadSectionStyles(section);
                        section.classList.add('loaded');
                        section.classList.remove('not-loaded');
                    }
                };
                xhr.send();
            }, delayForDebug);
        } 
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
// -----------------------------------------------------------------------------
function setCurrentLink(currentSection) {

    for (var j = 0; j < navItems.length; j++) {
        navItems[j].classList.remove('current-link'); 
    }

    const activeLink = document.querySelector(`.main-nav-item[href="#${currentSection.id}"]`);
    
    if (activeLink) {
        activeLink.classList.add("current-link");
    }

}
// -----------------------------------------------------------------------------