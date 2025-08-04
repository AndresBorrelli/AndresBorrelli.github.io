//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
window.addEventListener('load', (e) => {

    //--------------------------------------------------------------------------
    // C O N T R O L   D E   M E N U
    //--------------------------------------------------------------------------
  
    const navItems = document.querySelectorAll('.main-nav-item');
  
    for (var i = 0; i < navItems.length; i++) {
        navItems[i].addEventListener('click', e => {
            var mainNavButton = document.getElementById('main-nav-button');
            mainNavButton.checked = false;
        });

    }

    //--------------------------------------------------------------------------
    // C A R G A   D E   S E C C I O N E S
    //--------------------------------------------------------------------------
    
    const sectionsToLoad = document.querySelectorAll('.main-section[data-src]');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // -------------------------------------------------------------------------
    const loadCSS = (href) => {
        const existingLink = document.querySelector(`link[href="${href}"]`);
        if (existingLink) {
            return; 
        }

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    };
    // -------------------------------------------------------------------------
    const loadSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                const htmlSrc = section.dataset.src; // Ruta del HTML
                // Construye la ruta del CSS basado en el ID de la sección
                // Ejemplo: #home -> styles/home.css
                const cssId = section.id.substring(1);
                const cssSrc = `resources/styles/css/${cssId}.min.css`; // Asume que tus CSS están en la carpeta 'styles'

                // Si la sección aún no ha sido cargada
                if (htmlSrc && !section.classList.contains('loaded')) {
                    // Cargar el CSS asociado a la sección
                    loadCSS(cssSrc);
                    // Cargar el contenido HTML de la sección
                    fetch(htmlSrc)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.text();
                        })
                        .then(html => {
                            section.innerHTML = html;
                            section.classList.add('loaded');
                            section.classList.remove('placeholder');
                            observer.unobserve(section);
                        })
                        .catch(error => {
                            console.error(`Error al cargar la sección ${htmlSrc}:`, error);
                            //section.innerHTML = `<p style="color: red;">Error al cargar el contenido de esta sección.</p>`;
                            section.classList.add('loaded');
                            section.classList.remove('placeholder');
                            observer.unobserve(section);
                        });
                }
            }
        });
    };
    // -------------------------------------------------------------------------
    const observer = new IntersectionObserver(loadSection, observerOptions);

    sectionsToLoad.forEach(section => {
        observer.observe(section);
    });
    //--------------------------------------------------------------------------

});
//------------------------------------------------------------------------------