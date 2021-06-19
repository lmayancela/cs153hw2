import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, AboutScreen, ContactScreen, BattleScreen } from './screens/index'

const Stack = createStackNavigator();
const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="About" component={AboutScreen} />

        <Stack.Screen name="Contact" component={ContactScreen} />

        <Stack.Screen name="Battle" component={BattleScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
