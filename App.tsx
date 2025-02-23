import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from "react-redux";
import { Store } from "./src/redux/Store";
import AppNavigator from './src/navigation';
import { CommonStyle } from './src/common';
import { ErrorBoundary } from './src/components';
import { ThemeProvider } from "./src/context/ThemeProvider";

const App = () => (
  <SafeAreaView style={CommonStyle.flex}>
    <Provider store={Store}>
      <ThemeProvider>
        <ErrorBoundary>
          <AppNavigator />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  </SafeAreaView>
);

export default App;