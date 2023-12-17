import React, { useEffect, useState } from 'react';
import Layout from '../../components/LayoutScreen';
import { Text } from 'react-native-paper';
import { FlatList } from 'react-native';
import axios from 'axios';
import BASE_URL from '../../config';
import { apiAuth } from '../../authUtils';
import { useNavigation } from '@react-navigation/native';
import OrderItem from '../../components/OrderItem';

const OrderVendor = () => {
    const [orders, setOrders] = useState()
    const navigation = useNavigation()

    useEffect(() => {
        const fetchData = async() => {
            try{
                await axios.get(`${BASE_URL}/order`, await apiAuth())
                .then(res => {
                    setOrders(res.data._embedded.order)
                })
            }catch(error){
                console.log("Error = ", error)
            }
        }
        fetchData()
    },[orders])

    
    const handleItemPress = (item) => {
        console.log('Pressed Order di list :', item);
        navigation.navigate('OrderDetailVendor', { order: item });
    };


  return (
    <Layout>
    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Daftar Orderan</Text>

        <FlatList 
            vertical 
            showsVerticalScrollIndicator={false} 
            numColumns={1} 
            data={orders && orders} 
            renderItem={({ item }) => <OrderItem item={item} onPress={() => handleItemPress(item)} vendor={true} />}
            keyExtractor={(item, index) => `${item.id}_${index}`} 
            style={{ marginVertical: 20 }}
        />

    
    </Layout>
  );
}

export default OrderVendor;
