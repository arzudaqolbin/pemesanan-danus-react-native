import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation, Fontisto } from '@expo/vector-icons';
import ProfileVendor from '../screen/Vendor/ProfileVendor';
import MenuVendor from '../screen/Vendor/MenuVendor';
import OrderVendor from '../screen/Vendor/OrderVendor';
import TambahMenu from '../screen/Vendor/TambahMenu';
import DetailMenuVendor from '../screen/Vendor/DetailMenuVendor';
import EditMenu from '../screen/Vendor/EditMenu';
import OrderDetailVendor from '../screen/Vendor/OrderDetailVendor';

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
    height: 60,
    backgroundColor: "#fff"
  }
}

const MenuVendorStack = () => (
  <Stack.Navigator initialRouteName='MenuVendor'>
    <Stack.Screen
      name="MenuVendor"
      component={MenuVendor}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="TambahMenu"
      component={TambahMenu}
      options={{ title: 'Tambah Menu' }}
    />
    <Stack.Screen
      name="DetailMenuVendor"
      component={DetailMenuVendor}
      options={{ title: 'Detail Menu' }}
    />
    <Stack.Screen
      name="EditMenu"
      component={EditMenu}
      options={{ title: 'EditMenu' }}
    />
  </Stack.Navigator>
);


const OrderVendorStack = () => (
  <Stack.Navigator initialRouteName='OrderVendor'>
    <Stack.Screen
      name="OrderVendor"
      component={OrderVendor}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="OrderDetailVendor"
      component={OrderDetailVendor}
      options={{ title: 'Detail Order' }}
    />
  </Stack.Navigator>
);

const VendorNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="ProfileVendor" screenOptions={screenOptions}>
        <Tab.Screen 
            name="ProfileVendor" 
            component={ProfileVendor} 
            options={{
                tabBarIcon: ({focused})=>{
                return (
                    <View style={{alignItems: "center", justifyContent: "center"}}> 
                    <Fontisto name="shopping-store" size={24} color={focused ? "#16247d": "#A4AFF3"} />
                    <Text style={{fontSize: 12, color: "#16247d"}}>Toko</Text>
                </View>
                )
                }
            }}
        />
        <Tab.Screen 
            name="menu-vendor" 
            component={MenuVendorStack} 
            options={{
                tabBarIcon: ({focused})=>{
                return (
                    <View style={{alignItems: "center", justifyContent: "center"}}> 
                    <MaterialIcons name="restaurant-menu" size={24} color={focused ? "#16247d": "#A4AFF3"} />
                    <Text style={{fontSize: 12, color: "#16247d"}}>Menu</Text>
                </View>
                )
                }
            }}
        />
        <Tab.Screen 
            name="order-vendor" 
            component={OrderVendorStack} 
            options={{
                tabBarIcon: ({focused})=>{
                return (
                    <View style={{alignItems: "center", justifyContent: "center"}}> 
                    <Foundation name="shopping-cart" size={24} color={focused ? "#16247d": "#A4AFF3"} />
                    <Text style={{fontSize: 12, color: "#16247d"}}>Pesanan</Text>
                </View>
                )
                }
            }}
        />
    </Tab.Navigator>
  );
};

export default VendorNavigator;
