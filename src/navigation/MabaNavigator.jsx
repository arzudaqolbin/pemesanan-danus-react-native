import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileMaba from '../screen/Maba/ProfileMaba';
import RiwayatMaba from '../screen/Maba/RiwayatMaba';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import StoreMaba from '../screen/Maba/StoreMaba';
import { createStackNavigator } from '@react-navigation/stack';
import EditProfileMaba from '../screen/Maba/EditProfileMaba';
import DetailMenuMaba from '../screen/Maba/DetailMenuMaba';
import DetailOrderMaba from '../screen/Maba/DetailOrderMaba';

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
    background: "#fff"
  }
}

const ProfileMabaStack = () => (
  <Stack.Navigator initialRouteName='ProfileMaba'>
    <Stack.Screen
      name="ProfileMaba"
      component={ProfileMaba}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="EditProfileMaba"
      component={EditProfileMaba}
      options={{ title: 'Edit Profile' }}
    />
  </Stack.Navigator>
);

const StoreMabaStack = () => {
  return (
    <Stack.Navigator initialRouteName='StoreMaba'>
      <Stack.Screen
        name="StoreMaba"
        component={StoreMaba}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailMenuMaba"
        component={DetailMenuMaba}
        options={{ title: 'Detail Menu' }}
      />
    </Stack.Navigator>
  );
};

const RiwayatMabaStack = () => {
  return (
    <Stack.Navigator initialRouteName='RiwayatMaba'>
      <Stack.Screen
        name="RiwayatMaba"
        component={RiwayatMaba}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailOrderMaba"
        component={DetailOrderMaba}
        options={{ title: 'Detail Pesanan' }}
      />
    </Stack.Navigator>
  );
};


const MabaNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="profile-maba" screenOptions={screenOptions}>    
        <Tab.Screen 
            name="profile-maba" 
            component={ProfileMabaStack} 
            options={{
                tabBarIcon: ({focused})=>{
                return (
                    <View style={{alignItems: "center", justifyContent: "center"}}> 
                    <MaterialCommunityIcons name="face-man-profile" size={24} color={focused ? "#16247d": "#A4AFF3"} />
                    <Text style={{fontSize: 12, color: "#16247d"}}>Profile</Text>
                </View>
                )
                }
            }}
        />
        <Tab.Screen 
            name="store-maba" 
            component={StoreMabaStack} 
            options={{
                tabBarIcon: ({focused})=>{
                return (
                    <View style={{alignItems: "center", justifyContent: "center"}}> 
                    <Entypo name="shop" size={24} color={focused ? "#16247d": "#A4AFF3"} />
                    <Text style={{fontSize: 12, color: "#16247d"}}>Toko</Text>
                </View>
                )
                }
            }}
        />
        <Tab.Screen 
            name="riwayat-maba" 
            component={RiwayatMabaStack} 
            options={{
                tabBarIcon: ({focused})=>{
                return (
                    <View style={{alignItems: "center", justifyContent: "center"}}> 
                    <Entypo name="shopping-cart" size={24} color={focused ? "#16247d": "#A4AFF3"} />
                    <Text style={{fontSize: 12, color: "#16247d"}}>Keranjang</Text>
                </View>
                )
                }
            }}
        />
        
    </Tab.Navigator>
  );
};

export default MabaNavigator;
