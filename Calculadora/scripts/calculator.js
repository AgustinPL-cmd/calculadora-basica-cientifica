let operationsStack = [];
let operatorsButtons = document.querySelectorAll('.operator');
let equalButton = document.getElementById('equals');
let operationInput = document.getElementById('operation-input');
const scientificButtons = document.querySelectorAll('.btn.scientific');

scientificButtons.forEach(button => {
    button.addEventListener('click', handleScientificOperation);
});
operatorsButtons.forEach((button) => {
    button.addEventListener('click', buildOperation)
});
equalButton.addEventListener('click', buildOperation);
operationInput.addEventListener('keydown', handleKeydown);

function handleKeydown(event) {
    const operators = ['+', '-', '*', '/', '=', 'Enter'];
    
    if (operators.includes(event.key)) {
        
        buildOperation(event);
    }
}

function buildOperation(event) {
    const operationInputValue = document.getElementById('operation-input').value;
    const operators = ['+', '*', '/', '%', '÷', '×', '-', '='];
    
    let operator;
    if (event.type === 'keydown') {
        operator = event.key;
        if (operator === 'Enter') operator = '=';
    } else {
        operator = event.target.innerHTML;
    }
    
    let stringNumber = '';
    let number;
    
    for(let i = operationInputValue.length - 1; i >= 0; i--) {
        const currentChar = operationInputValue[i];
        
        if (operators.includes(currentChar)) {
            if(currentChar === '-' && i === 0) {
                stringNumber = currentChar + stringNumber;
                break;
            }
            if(currentChar === '-' && i > 0 && operators.includes(operationInputValue[i-1])) {
                stringNumber = currentChar + stringNumber;
                continue;
            }
            break;
        }
        stringNumber = currentChar + stringNumber; 
    }
    
    if (stringNumber !== '') {
        try {
            number = parseFloat(stringNumber); 
            operationsStack.push(number);
            
            if (operator !== '=') {
                operationsStack.push(operator);
            } else {
                calculateResult();
            }
        } catch(error) {
            console.log(error);
        }
    }
    console.log('Stack actual:', operationsStack); 
}

function calculateResult() {
    let result = 0;
    
    const operacionCompleta = document.getElementById('operation-input').value;
    
    for (let i = 0; i < operationsStack.length; i += 2) {
        const operand1 = (i === 0) ? operationsStack[i] : result;
        const operator = operationsStack[i + 1];
        const operand2 = operationsStack[i + 2];
        if (operand2 === undefined) {
            break;
        }
        console.log(operationsStack);
        console.log(`Calculando: ${operand1} ${operator} ${operand2}`);
        result = performOperation(operand1, operand2, operator);
    }
    operationsStack = [];
    
    document.getElementById('operation-input').value = result;
    document.getElementById('operation-show').value = operacionCompleta;
}

function performOperation(operand1, operand2, operator) {
    switch(operator) {
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '*':
            return operand1 * operand2;
        case '/':
            return operand1 / operand2;
        case '%':
            return operand1 % operand2;
        case '÷':
            return operand1 / operand2;
        case '×':
            return operand1 * operand2;
        default:
            throw new Error('Operador desconocido: ' + operator);
    }
}

function handleScientificOperation(event) {
    const operation = event.target.id;
    const currentInput = document.getElementById('operation-input').value;
    const currentShow = document.getElementById('operation-show').value;
    
    let result;
    
    switch(operation) {
        case 'power':
            const base = parseFloat(currentInput) || 0;
            const exponent = prompt('Ingresa el exponente (n):', '2');
            if (exponent === null) return; 
            result = Math.pow(base, parseFloat(exponent) || 0);
            break;
        case 'sqrt':
            result = Math.sqrt(parseFloat(currentInput) || 0);
            break;
        case 'sin':
            result = Math.sin((parseFloat(currentInput) || 0) * Math.PI / 180);
            break;
        case 'cos':
            result = Math.cos((parseFloat(currentInput) || 0) * Math.PI / 180);
            break;
        default:
            return;
    }
    
    // Mostrar resultado
    document.getElementById('operation-input').value = result;
    document.getElementById('operation-show').value = `${currentInput} ${getScientificSymbol(operation, exponent)}`;
}

function getScientificSymbol(operation, exponent = null) {
    switch(operation) {
        case 'power': 
            return exponent ? `^${exponent}` : '^n';
        case 'sqrt': return '√';
        case 'sin': return 'sin';
        case 'cos': return 'cos';
        default: return '';
    }
}