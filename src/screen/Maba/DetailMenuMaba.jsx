import React, { useEffect, useState } from 'react';
import Layout from '../../components/LayoutScreen';
import { Button, Text } from 'react-native-paper';
import { View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import BASE_URL from '../../config';
import { apiAuth, getUserInfo } from '../../authUtils';
import { format } from 'date-fns/esm';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DetailMenu from '../../components/DetailMenu';

const DetailMenuMaba = ({route}) => {
    const {menu} = route.params;
    const [jumlah, setJumlah] = useState(0);
    const [total, setTotal] = useState(0);
    const [vendor, setVendor] =useState();
    const navigation = useNavigation()
    const formatDate = format(new Date(menu.tanggalMenu), 'dd - MM - yyyy')

    useEffect(() => {
        setTotal(menu.harga * jumlah)
    }, [jumlah])

    useEffect(() => {
    const fetchData = async () => {
        try {
        const response = await axios.get(`${BASE_URL}/vendor/${menu.vendorId}`, await apiAuth());
        // console.log("vendor-nya === ", response.data.nama);
        setVendor(response.data.nama)
        } catch (error) {
        console.log("Error : ", error);
        }
    };

    fetchData();
    }, []);


    const order = async() => {
        console.log("api auth = ", await apiAuth())
        try{
            await axios.post(`${BASE_URL}/order/pesan`,{
                menuID: menu.id,
                mabaID: 1,
                metodeBayarID: 1,
                jumlah: jumlah,
                catatan: "lewat expo lurr",
                buktibayar: "buktilur.jpg"
            }, await apiAuth())
            .then((res) => {
                Alert.alert(
                "Sukses",
                `Berhasil membuat pesanan, kode: [${res.data.nomorOrder}]`,
                [
                    {
                    text: "OK",
                    onPress: () => navigation.navigate('StoreMaba')
                    }
                ]);
            })
        }catch(error){
            console.log("Error order: ", error)
            Alert.alert(
                "Gagal",
                `Gagal membuat pesanan`,
                [
                    {
                    text: "OK"
                    }
            ]);
        }
    }

    return(
        <Layout>
            <ScrollView showsVerticalScrollIndicator={false}>

            <DetailMenu menu={menu} formatDate={formatDate} vendor={vendor}/>

            {/* Action by Role */}
            <View style={{backgroundColor: "#D7C6EF", paddingVertical: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20}}>
                {/* Jumlah pesanan */}
                <View style={{flexDirection: 'row', marginLeft: 20, alignItems: 'center', justifyContent: 'space-evenly', marginBottom: 5}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                        Jumlah Order
                    </Text>

                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                        <TouchableOpacity 
                            style={{backgroundColor: '#FF5733', paddingVertical: 10,paddingHorizontal: 16, borderRadius: 30}}
                            onPress={() => setJumlah(jumlah - 1)}
                        >
                            <Text style={{fontWeight: 'bold'}}>-</Text>
                        </TouchableOpacity>

                        <Text style={{margin: 10, fontSize: 16}}>{jumlah}</Text>

                        <TouchableOpacity 
                            style={{backgroundColor: '#47EB5D', paddingVertical: 10,paddingHorizontal: 16, borderRadius: 30}}
                            onPress={() => setJumlah(jumlah + 1)}
                        >
                            <Text style={{fontWeight: 'bold'}}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                {/* Total Harga */}
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>Total = </Text>
                    <Text style={{fontSize: 16}}>Rp {total}</Text>
                </View>

                {/* Pesan */}
                <TouchableOpacity 
                    style={{marginHorizontal: 20, marginTop: 15}}
                    onPress={() => 
                        Alert.alert(
                            "Konfirmasi",
                            "Anda yakin ingin membuat pesanan?",
                            [
                            {
                                text: "Tidak"
                            },
                            {
                                text: "Ya",
                                onPress: () => {
                                    order()
                                }
                            }])
                        }
                >
                    <Button mode='contained' buttonColor='' textColor='#fff'>
                        Pesan
                    </Button>
                </TouchableOpacity>
            </View>

        </ScrollView>
        </Layout>
    )
}

export default DetailMenuMaba;
