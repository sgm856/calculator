let operator = "";
let firstTerm = "";
let secondTerm = "";
let displaying = false;
let isInputDecimal = false;
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

const setFirstTerm = function (value) {
    firstTerm = value;
}

const setSecondTerm = function (value) {
    secondTerm = value;
}

const setOperator = function (value) {
    operator = value;
}

const getFirstTerm = function () {
    return firstTerm;
}

const getSecondTerm = function () {
    return secondTerm;
}

const getOperator = function () {
    return operator;
}

const updateDisplay = function (value) {
    currentText = resultDisplay.value.toString();
    value = sanitizeNumberInput(value);
    if (!currentText.includes('.') || value != '.') {
        resultDisplay.value = currentText + value;
    }
}

const clearContainerText = function (element) {
    element.textContent = '';
}

const resetTerms = function () {
    firstTerm = null;
    secondTerm = null;
}

let characterButtons = document.querySelectorAll('.character');
characterButtons.forEach((button, index) => {
    button.addEventListener('click', (event) => {
        debugger;
        updateDisplay(event.target.textContent);
        alert(index);
    })
}
);

const operate = function (term1, term2, operation) {

}

module.exports = {
    sanitize: sanitizeNumberInput,
    sum,
    multiply,
    divide
};



