import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screen/Auth/LoginScreen';
import RegisterScreen from '../screen/Auth/RegisterScreen';
import RegisterVendorScreen from '../screen/Auth/RegisterVendorScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{title: 'Login'}} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{title: 'Register Maba'}}/>
        <Stack.Screen name="RegisterVendor" component={RegisterVendorScreen} options={{title: 'Register Vendor'}}/>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
