import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} testID="custom-button">
            <Text>{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;