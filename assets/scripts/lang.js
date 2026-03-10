//------------------------------------------------------------------------------
// Cambio de lenguaje de acuerdo a preferencia de usuario (o idioma navegador)
//------------------------------------------------------------------------------
(function() {

    const preferredLang = localStorage.getItem('user-lang');
    const browserLang = navigator.language || navigator.userLanguage;
    const isEnPage = window.location.pathname.includes('index_en.html');
    
    if ((preferredLang === 'en' || (!preferredLang && browserLang.startsWith('en'))) && !isEnPage) {
        window.location.replace("index_en.html");
    } else if (preferredLang === 'es' && isEnPage) {
        window.location.replace("./");
    }

})();
