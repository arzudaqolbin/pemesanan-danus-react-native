import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider, Text } from 'react-native-paper';
import AuthNavigator from './src/navigation/AuthNavigator';
import MabaNavigator from './src/navigation/MabaNavigator';
import VendorNavigator from './src/navigation/VendorNavigator';
import { getRole, isAuth } from './src/authUtils';
import { View } from 'react-native';
import NavController from './src/navigation/NavController';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const screenOptions = {
  tabBarShowLabel:false,
  headerShown:false,
  tabBarStyle:{
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 0,
    background: "#fff"
  }
}

const App = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      const userRole = await getRole();
      setRole(userRole);
    };

    fetchRole();
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        {isAuth() ? (
          role === 'ROLE_Maba' || role === 'ROLE_Vendor' ? (
            <Tab.Navigator screenOptions={screenOptions}>
              {role === 'ROLE_Maba' ? (
                <Tab.Screen name="MabaNavigator" component={MabaNavigator} options={{ headerShown: false }} />
              ) : (
                <Tab.Screen name="VendorNavigator" component={VendorNavigator} options={{ headerShown: false }} />
              )}
            </Tab.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen name="AuthNavigator" component={AuthNavigator} options={{ headerShown: false }} />
            </Stack.Navigator>
          )
        ) : (
          <AuthNavigator />
        )}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
