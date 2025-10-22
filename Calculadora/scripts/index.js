

window.addEventListener('DOMContentLoaded',()=>{
    const display = document.getElementById('display');
    const operationInput = document.getElementById('operation-input');
    const operationShow = document.getElementById('operation-show');
    const buttons = document.querySelectorAll('.buttons-container button');
    const ClrButton = document.getElementById('clear');
    const backspaceButton = document.getElementById('backspace');
    const scientificToggle = document.getElementById('scientific-toggle');
    const buttonsContainer = document.querySelector('.buttons-container');

    operationInput.addEventListener('keydown', validateInput);
    operationInput.addEventListener('input', (e)=>{
        operationShow.value = e.target.value;
    });
    ClrButton.addEventListener('click', ()=>{
        operationInput.value = '';
        operationShow.value = '';
    });
    scientificToggle.addEventListener('click', () => {
    scientificToggle.classList.toggle('active');
        document.querySelector('.calculator-main').classList.toggle('scientific-mode');
        
        if (scientificToggle.classList.contains('active')) {
            scientificToggle.textContent = 'BASIC';
        } else {
            scientificToggle.textContent = 'SCI';
        }
    });

    buttons.forEach(button =>{
        button.addEventListener('click', ()=>{
            const value = button.textContent;
            if(value != '=' && value != 'Clr' && value != '←' && validarCaracter(value, operationInput.value)){
                operationInput.value += value;
                operationShow.value += value;
            }

            if(value === 'Clr'){
                operationInput.value = '';
                operationShow.value = '';
            }

            if(value === '←'){
                operationInput.value = operationInput.value.slice(0, -1);
                operationShow.value = operationShow.value.slice(0, -1);
            }

        });
    });

    function validarCaracter(nuevoCaracter, textoActual) {
        const validChars = ['0','1','2','3','4','5','6','7','8','9',
            '+','-','*','/','.', '%', '÷','×', '²', '√', 's', 'i', 'n', 'c', 'o', '^',
            'Backspace'];
        
        if (!validChars.includes(nuevoCaracter)) {
            return false;
        }
        
        const lastChar = textoActual.slice(-1);
        const penultimateChar = operationInput.value.slice(-2);
        const notViableOperatorsRepeat = ['+', '*', '/', '.', '%', '÷','×', '^'];
        const charIsNotViableRepeat = notViableOperatorsRepeat.includes(nuevoCaracter);
        const lastCharIsNotViableRepeat = notViableOperatorsRepeat.includes(lastChar);
        
        if (charIsNotViableRepeat && lastCharIsNotViableRepeat) {
            return false;
        }

        if (penultimateChar == '--' && nuevoCaracter == '-') {
            return false;
        }
        
        return true;
    }

    function validateInput(event) {
        const key = event.key;
        if(!validarCaracter(key, operationInput.value)){
            event.preventDefault();
            return false;
        }
    }


});