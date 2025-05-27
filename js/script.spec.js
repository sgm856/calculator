const { sanitize, sum, multiply, divide } = require('./script')

describe('sum', () => {
    test('basic numbers work', () => {
        expect(sum(10, -10, 1)).toEqual(1);
    });
    test('works with decimals', () => {
        expect(sum(99.90, -.90, 1)).toEqual(100);
    });
});

describe('multiply', () => {
    test('basic numbers work', () => {
        expect(multiply(10, 10)).toEqual(100);
    });
    test('works with decimals', () => {
        expect(multiply(2.5, 2.5)).toEqual(6.25);
    });
    test('works with negatives', () => {
        expect(multiply(10, -1)).toEqual(-10);
    });
});

describe('divide', () => {
    test('basic numbers work', () => {
        expect(divide(10, 10)).toEqual(1);
    });
    test('works with decimals', () => {
        expect(divide(10.9, 10)).toEqual(1.09);
    });
    test('works with negatives', () => {
        expect(divide(10, -1)).toEqual(-10);
    });
});

describe('sanitize', () => {
    test('cleaned input succesfully', () => {
        expect(sanitize(`500.function()=>{alert('hi')};`)).toEqual(500);
    });
});
