const sanitize = function (input) {
    let cleanInput = input.toString().replace(/[^0-9.-]/g, '');
    let number = Number.parseFloat(cleanInput);
    return number;
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

const operate = function () {

}

module.exports = {
    sanitize,
    sum,
    multiply,
    divide
};



