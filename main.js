class Calculator {
    /* 
        A calculator has to perform following abstract functions
        - apppend digits to current number
        - delete digits from current number
        - choose an operation to perform
        - clear the calculator
        - update the display
        - perform calculation
    */

    constructor(prevOperandElement, currentOperandElement) {
        this.prevOperandElement = prevOperandElement;
        this.currentOperandElement = currentOperandElement;
        // console.log(this.currentOperandElement + "not working");
        this.prevOperand = '';
        this.currentOperand = '0';
        this.operator = undefined;
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number == '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand == '0' && number != '.') {
            this.currentOperand = number.toString();
        }
        else this.currentOperand += number.toString();
    }

    deleteNumber() {
        this.currentOperand = 
        this.currentOperand.substring(0, this.currentOperand.length - 1)
        if (this.currentOperand === '') this.currentOperand = '0'
    }

    chooseOperator(operator) {
        if (this.operator != undefined && prevOperandElement != '') {
            this.currentOperand = this.calculate();
        }
        this.operator = operator.toString();
        this.prevOperand = this.currentOperand;
        this.currentOperand = '0';
    }

    clear() {
        this.currentOperand = '0';
        this.prevOperand = '';
        this.operator = undefined;
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.currentOperand;
        this.prevOperandElement.innerText = 
        `${this.prevOperand} ${this.operator == undefined ? '' : this.operator}`;
    }

    equals() {
        this.currentOperand = this.calculate().toString();
        this.prevOperand = '';
        this.operator = undefined;
    }

    calculate() {
        let a = parseFloat(this.prevOperand);
        let b = parseFloat(this.currentOperand);
        let computed = undefined;

        if (isNaN(a) || isNaN(b)) return computed;
        switch(this.operator) {
            case '÷':
                computed = a / b;
                break;
            case '×':
                computed = a * b;
                break;
            case '–':
                computed = a - b;
                break;
            case '+':
                computed = a + b;
                break;
            default:
                return computed;
        }

        if (!Number.isInteger(computed)) {
            computed = computed.toFixed(4);
        }
        return computed;
    }
}

const prevOperandElement = document.querySelector('[data-prev-operand]');
const currentOperandElement = document.querySelector('[data-curr-operand]');

const allClearButton = document.querySelector('[data-all-clear]');
const backspaceButton = document.querySelector('[data-backspace]');

const percentageButton = document.querySelector('[data-percent]');
const equalsButton = document.querySelector('[data-equals]');

const operatorButtons = document.querySelectorAll('[data-operator]');
const numberButtons = document.querySelectorAll('[data-number]');

// to test if query selection is working or not
console.log(currentOperandElement);

const calculator = new Calculator(prevOperandElement, currentOperandElement);

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerHTML);
        calculator.updateDisplay();
    })
})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

backspaceButton.addEventListener('click', () => {
    calculator.deleteNumber();
    calculator.updateDisplay();
})

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.chooseOperator(button.innerHTML);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', () => {
    calculator.equals();
    calculator.updateDisplay();
})
