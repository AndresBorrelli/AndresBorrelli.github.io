//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
window.addEventListener('load', (e) => {
  
    const navItems = document.querySelectorAll('.main-nav-item');
  
    for (var i = 0; i < navItems.length; i++) {
        navItems[i].addEventListener('click', e => {
            var mainNavButton = document.getElementById('main-nav-button');
            mainNavButton.checked = false;
        });

    }

});
//------------------------------------------------------------------------------