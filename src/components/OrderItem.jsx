import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Card } from 'react-native-paper';
import axios from 'axios';
import { apiAuth } from '../authUtils';
import BASE_URL from '../config';

const OrderItem = ({ item, onPress, vendor }) => {
    const [menu, setMenu] = useState()

    if(vendor){
      useEffect(() => {
          const fetchMenu =  async() => {
              try{
                  // await axios.get(`${item._links.menu.href}`, await apiAuth())
                  await axios.get(`${item._links.menu.href}`, await apiAuth())
                  .then(res => {
                      setMenu(res.data.deskripsi)
                  })
              }catch(error){
                  console.log("Error : ", error )
              }
          }
          fetchMenu()
      },[])
    }
    else{
      useEffect(() => {
          const fetchMenu =  async() => {
              try{
                  // await axios.get(`${item._links.menu.href}`, await apiAuth())
                  await axios.get(`${BASE_URL}/menu/${item.menuId}`, await apiAuth())
                  .then(res => {
                      setMenu(res.data.deskripsi)
                  })
              }catch(error){
                  console.log("Error : ", error )
              }
          }
          fetchMenu()
      },[])
    }


  let leftIcon;

  if (item.status === 'Lunas' || item.status === 'Selesai' || item.status === 'Refunded') {
    leftIcon = <Ionicons name="checkmark-done-circle" size={40} color="green" />;
  } else if (item.status === 'Sedang Diproses') {
    leftIcon = <MaterialIcons name="pending-actions" size={40} color="blue" />;
  } else {
    leftIcon = <MaterialIcons name="sms-failed" size={40} color="orange" />;
  }

  return (
    <View style={{ backgroundColor: "#D7C6EF", borderRadius: 15, marginBottom: 10 }}>
      <Card.Title
        title={item.nomorOrder + " [" + item.status + "]"}
        subtitle={(menu && menu ? menu : "") + " x " + item.jumlah}
        titleStyle={{ fontSize: 18, fontWeight: 'bold', color: '#266969' }}
        subtitleStyle={{ fontSize: 15, fontWeight: 'bold' }}
        left={() => leftIcon} // Change this line
        right={() => (
          <MaterialIcons
            style={{ marginRight: 10 }}
            name="navigate-next"
            size={40}
            color="black"
            onPress={onPress}
          />
        )}
      />
    </View>
  );
};

export default OrderItem;
