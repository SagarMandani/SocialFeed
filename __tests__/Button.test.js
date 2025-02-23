import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../src/components/Button';

describe('Button Component', () => {
    it('renders correctly with given title', () => {
        const { getByText } = render(<Button title="Click Me" onPress={() => { }} />);
        expect(getByText('Click Me')).toBeTruthy();
    });

    it('calls onPress when clicked', () => {
        const mockFn = jest.fn();
        const { getByTestId } = render(<Button title="Press" onPress={mockFn} />);

        fireEvent.press(getByTestId('custom-button'));

        expect(mockFn).toHaveBeenCalledTimes(1);
    });
});