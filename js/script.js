let operator = "";
let previousContext = "";
let resultDisplay = document.querySelector('.results-display');
let isResultDisplaying = false;

const sanitizeNumberInput = function (input) {
    let cleanInput = input.toString().replace(/[^0-9.\-%]/g, '');
    return cleanInput;
}

const includesNumbers = function (input) {
    return /[0-9.]/.test(input.toString());
}

const containsMessage = function (input) {
    return /[a-zA-Z]/.test(input.toString())
}

const sanitizeOperatorInput = function (input) {
    let cleanInput = input.toString().replace(/[^+-×/]/g, '');
    return cleanInput;
}

const sum = function (...args) {
    let total = 0;
    for (let addend of args) {
        total += addend;
    }
    return total;
}

const multiply = function (...args) {
    if (args.length === 0) {
        return 0;
    }
    let product = 1;
    for (let factor of args) {
        product *= factor;
    }
    return product;
}

const divide = function (...args) {
    if (args.length === 0) {
        return -0;
    }
    let quotient = args[0];
    let term = 1;
    for (let i = 1; i < args.length; i++) {
        term = args[i]
        quotient /= term;
    }
    return quotient;
}

const setPreviousNumber = function (value) {
    if (typeof value === 'number' && Number.isFinite(value)) {
        previousContext = value;
    }
}

const setOperator = function (value) {
    operator = value;
}

const getPreviousNumber = function () {
    return previousContext;
}

const getOperator = function () {
    return operator;
}

const getResultContainer = function () {
    return resultDisplay;
}

const updateDisplay = function (value) {
    if (isResultDisplaying && value != '%') {
        clearResultsDisplay();
        isResultDisplaying = false;
    }
    currentText = getResultContainer().value.toString();
    if (containsMessage(currentText)) {
        reset();
        currentText = '';
    }
    const shouldAdd =
        (value !== '.' && value !== '%') ||
        (value === '.' && !currentText.includes('.')) ||
        (value === '%' && !currentText.includes('%') && includesNumbers(currentText));
    if (shouldAdd) {
        getResultContainer().value = currentText + value;
    }
}

const clearContainerText = function (element) {
    element.value = '';
}

const resetTerms = function () {
    previousContext = null;
    operator = null;
}

const getCurrentNumber = function () {
    let currentNumber = sanitizeNumberInput(getResultContainer().value);
    if (currentNumber === '') {
        return NaN;
    }
    if (currentNumber.includes('%')) {
        return Number(sanitizeNumberInput(getResultContainer().value.replace(/[%]/g, ''))) / 100;
    }
    return Number(sanitizeNumberInput(getResultContainer().value));
}

const clearResultsDisplay = function () {
    clearContainerText(getResultContainer());
}

const operate = function (term1, term2, operation) {
    if (arguments.length !== 3 || operation == null) return;

    term1 = Number(term1);
    term2 = Number(term2);

    if (isNaN(term1) || isNaN(term2)) {
        return;
    }

    switch (operation) {
        case "+":
            return roundDecimal(sum(term1, term2));
        case "-":
            return roundDecimal(sum(term1, term2));
        case "×":
            return roundDecimal(multiply(term1, term2));
        case "/":
            if (term2 === 0) {
                reset();
                return 'Nice try.';
            } else {
                return roundDecimal(divide(term1, term2));
            }
    }
}

const flipSign = function () {
    debugger;
    const currNumber = getCurrentNumber();
    if (typeof currNumber === 'number' && Number.isFinite(currNumber)) {
        const flippedNumber = currNumber * -1;
        clearResultsDisplay();
        updateDisplay(flippedNumber.toString());
    }
}

const reset = function () {
    clearResultsDisplay();
    resetTerms();
}

const roundDecimal = function (value) {
    if (value === Math.floor(value)) {
        return value;
    }
    return parseFloat(value.toFixed(8));
}

let characterButtons = document.querySelectorAll('.character');
characterButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        let value = event.target.textContent;
        value = sanitizeNumberInput(value);
        updateDisplay(value);
    })
});

let resetButton = document.querySelector('.all-clear');
resetButton.addEventListener('click', () => {
    reset();
})

let operators = document.querySelectorAll('.operator');
operators.forEach((button) => {
    button.addEventListener('click', (event) => {
        if ((typeof getCurrentNumber() === 'number' && !isNaN(getCurrentNumber()))
            || (typeof getPreviousNumber() === 'number' && !isNaN(getPreviousNumber()))) {
            setPreviousNumber(getCurrentNumber());
            clearResultsDisplay();
            setOperator(event.target.textContent);
            updateDisplay(getOperator());
        }
    })
});

let equals = document.querySelector('.equals');
equals.addEventListener('click', () => {
    debugger;
    if (typeof getPreviousNumber() === 'number') {
        let result = operate(getPreviousNumber(), getCurrentNumber(), getOperator());
        clearResultsDisplay();
        updateDisplay(result);
        isResultDisplaying = true;
    }
});

let percentage = document.querySelector('.percentage');
percentage.addEventListener('click', (event) => {
    let value = event.target.textContent;
    value = sanitizeNumberInput(value);
    updateDisplay(value);
});

let sign = document.querySelector('.sign');
sign.addEventListener('click', (event) => {
    flipSign();
}
)

module.exports = {
    sanitize: sanitizeNumberInput,
    sum,
    multiply,
    divide
};



