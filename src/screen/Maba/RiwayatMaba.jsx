import React, { useEffect, useState } from 'react';
import Layout from '../../components/LayoutScreen';
import { Text } from 'react-native-paper';
import { FlatList } from 'react-native';
import axios from 'axios';
import BASE_URL from '../../config';
import { apiAuth, getUserInfo } from '../../authUtils';
import { useNavigation } from '@react-navigation/native';
import OrderItem from '../../components/OrderItem';

const RiwayatMaba = () => {
    const [riwayat, setRiwayat] = useState()
    const navigation = useNavigation()

    useEffect(() => {
        const fetchData = async() => {
            const id = await getUserInfo()
            try{
                await axios.get(`${BASE_URL}/order/riwayat/1`, await apiAuth())
                .then(res => {
                    setRiwayat(res.data)
                })
            }catch(error){
                console.log("Error = ", error)
            }
        }
        fetchData()
    },[riwayat])

    
    const handleItemPress = (item) => {
        navigation.navigate('DetailOrderMaba', { order: item });
    };


  return (
    <Layout>
        <Text style={{fontSize:20, fontWeight: 'bold'}}>Daftar Riwayat Pembelian</Text>

        <FlatList 
            vertical 
            showsVerticalScrollIndicator={false} 
            numColumns={1} 
            data={riwayat && riwayat} 
            renderItem={({ item }) => <OrderItem item={item} onPress={() => handleItemPress(item)} />}
            keyExtractor={(item, index) => `${item.id}_${index}`} 
            style={{marginVertical: 20}}
        />

    
    </Layout>
  );
}

export default RiwayatMaba;
