// -----------------------------------------------------------------------------
// V A L I D A R   F O R M U L A R I O   D E   C O N T A C T O
// -----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('_contact-form');

    //--------------------------------------------------------------------------

    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }

    //--------------------------------------------------------------------------

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    //--------------------------------------------------------------------------

    form.addEventListener('submit', (event) => {
        
        event.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const messageValue = messageInput.value.trim();

        let isValid = true;
        let errorMessage = '';

        if (nameValue === '') {
            isValid = false;
            errorMessage += 'El nombre no puede estar vacío.\n';
        } else if (nameValue.length > 64) {
            isValid = false;
            errorMessage += 'El nombre no puede exceder los 64 caracteres.\n';
        } else if (sanitizeInput(nameValue) !== nameValue) {
            isValid = false;
            errorMessage += 'El nombre contiene caracteres no válidos.\n';
        }

        if (emailValue === '') {
            isValid = false;
            errorMessage += 'El correo electrónico no puede estar vacío.\n';
        } else if (!isValidEmail(emailValue)) {
            isValid = false;
            errorMessage += 'Por favor, ingresá una dirección de correo válida.\n';
        } else if (sanitizeInput(emailValue) !== emailValue) {
            isValid = false;
            errorMessage += 'El correo electrónico contiene caracteres no válidos.\n';
        }

        if (messageValue === '') {
            isValid = false;
            errorMessage += 'El mensaje no puede estar vacío.\n';
        } else if (messageValue.length > 256) {
            isValid = false;
            errorMessage += 'El mensaje no puede exceder los 256 caracteres.\n';
        } else if (sanitizeInput(messageValue) !== messageValue) {
            isValid = false;
            errorMessage += 'El mensaje contiene caracteres no válidos.\n';
        }

        if (isValid) {
            //alert('Formulario enviado con éxito!');
            form.submit();
        } else {
            alert(errorMessage);
        }
    });
    // --------------------------------------------------------------------------
});
//-------------------------------------------------------------------------------