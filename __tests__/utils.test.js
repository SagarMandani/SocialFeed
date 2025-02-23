import { addNumbers } from '../src/common/Utils';

test('adds two numbers correctly', () => {
    expect(addNumbers(2, 3)).toBe(5);
});

test('adds two numbers correctly', () => {
    expect(addNumbers(10, 5)).toBe(15);
});