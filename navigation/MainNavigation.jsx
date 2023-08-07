import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profiles from '../screens/Profiles/Profiles';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profiles"
      screenOptions={{header: () => null, headerShown: false}}>
      <Stack.Screen name="Profiles" component={Profiles} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
