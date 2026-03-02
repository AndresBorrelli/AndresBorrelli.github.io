// -----------------------------------------------------------------------------
// V A L I D A R   F O R M U L A R I O   D E   C O N T A C T O
// -----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('contact_form');

    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }

    form.addEventListener('submit', (event) => {

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        // Sanitización final antes de que viaje a Formspree
        nameInput.value = sanitizeInput(nameInput.value.trim());
        emailInput.value = sanitizeInput(emailInput.value.trim());
        messageInput.value = sanitizeInput(messageInput.value.trim());
        
    });

});
//-------------------------------------------------------------------------------