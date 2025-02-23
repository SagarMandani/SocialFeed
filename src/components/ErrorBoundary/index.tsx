import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import styles from './style';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.log("Error caught by boundary:", error, info);
    }

    resetError = () => {
        this.setState({ hasError: false });
    };

    render() {
        if (this.state.hasError) {
            return (
                <View style={styles.container}>
                    <Text>Something went wrong! 😢</Text>
                    <Button title="Retry" onPress={this.resetError} />
                </View>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
