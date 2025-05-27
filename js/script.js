let operator = "";
let previousContext = "";
let currentContext = "";
let resultDisplay = document.querySelector('.results-display');

const sanitizeNumberInput = function (input) {
    let cleanInput = input.toString().replace(/[^0-9.-]/g, '');
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
    value = sanitizeNumberInput(value);
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

let characterButtons = document.querySelectorAll('.character');
characterButtons.forEach((button, index) => {
    button.addEventListener('click', (event) => {
        updateDisplay(event.target.textContent);
    })
}
);

let resetButton = document.querySelector('.all-clear');
resetButton.addEventListener('click', () => {
    clearContainerText(getResultDisplay());
    resetTerms();
})

const getCurrentContext = function () {
    return
}

const operate = function (term1, term2, operation) {
    if (term1 && term2 && operation) {
        let result = 0;
        switch (operation) {
            case "+":
                setPreviousContext()
                clearContainerText(getResultDisplay());
                break;
            case "-":
                clearContainerText(getResultDisplay());
                break;
            case "x":
                clearContainerText(getResultDisplay());
                break;
            case "/":
                clearContainerText(getResultDisplay());
                break;
        }
    }
}

module.exports = {
    sanitize: sanitizeNumberInput,
    sum,
    multiply,
    divide
};



