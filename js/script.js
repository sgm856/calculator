let operator = "";
let previousContext = "";
let currentContext = "";
let resultDisplay = document.querySelector('.results-display');

const sanitizeNumberInput = function (input) {
    let cleanInput = input.toString().replace(/[^0-9.-]/g, '');
    return cleanInput;
}

const sanitizeOperatorInput = function (input) {
    let cleanInput = input.toString().replace(/[^+-x/]/g, '');
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

const setPreviousContext = function (value) {
    previousContext = value;
}

const setOperator = function (value) {
    operator = value;
}

const getPreviousContext = function () {
    return previousContext;
}

const getOperator = function () {
    return operator;
}

const getResultDisplay = function () {
    return resultDisplay;
}

const updateDisplay = function (value) {
    currentText = getResultDisplay().value.toString();
    if (!currentText.includes('.') || value != '.') {
        getResultDisplay().value = currentText + value;
    }
}

const clearContainerText = function (element) {
    element.value = '';
}

const resetTerms = function () {
    previousContext = null;
    operator = null;
}

const getCurrentContext = function () {
    return sanitizeNumberInput(getResultDisplay().value);
}

const clearResultsDisplay = function () {
    clearContainerText(getResultDisplay());
}

const operate = function (term1, term2, operation) {
    term1 = Number(term1);
    term2 = Number(term2);
    if (term1 && term2 && operation) {
        switch (operation) {
            case "+":
                return sum(term1, term2);
            case "-":
                return sum(term1, term2);
            case "x":
                return multiply(term1, term2);
            case "/":
                return divide(term1, term2);
        }
    }
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
    clearResultsDisplay();
    resetTerms();
})

let operators = document.querySelectorAll('.operator');
operators.forEach((button) => {
    button.addEventListener('click', (event) => {
        setPreviousContext(getCurrentContext());
        clearResultsDisplay();
        setOperator(event.target.textContent);
        updateDisplay(getOperator());
    })
});

let equals = document.querySelector('.equals');
equals.addEventListener('click', (event) => {
    debugger;
    let result = operate(getPreviousContext(), getCurrentContext(), getOperator());
    clearResultsDisplay();
    updateDisplay(result);
});

module.exports = {
    sanitize: sanitizeNumberInput,
    sum,
    multiply,
    divide
};



