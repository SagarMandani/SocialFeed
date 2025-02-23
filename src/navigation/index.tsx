import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
// import { useTheme } from '../context/ThemeProvider';
import { Feed, Settings } from '../screens';
import { RootStackParamList } from '../types';

// Create the stack with type safety
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  // const theme = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

// Example of how to type props in screens
export type FeedScreenProps = NativeStackScreenProps<RootStackParamList, 'Feed'>;
export type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;
