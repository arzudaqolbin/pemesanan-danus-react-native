import React, { useEffect, useState } from 'react';
import Layout from '../../components/LayoutScreen';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { apiAuth, logout } from '../../authUtils';
import BASE_URL from '../../config';
import axios from 'axios';
import Greeting from '../../components/Greeting';
import SectionHeader from '../../components/SectionHeader';
import StatusBadge from '../../components/StatusBadge';
import { Alert } from 'react-native';

const ProfileVendor = () => {

    const [vendor, setVendor] = useState();
    const [riwayat, setRiwayat] = useState();
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async() => {
            try{
                await axios.get(`${BASE_URL}/vendor/1`, await apiAuth())
                .then( res => {
                    setVendor(res.data)
                })
            }catch (error) {
                console.log("Error login: ", error);
            }
        }
        fetchData();
    },[vendor])

    useEffect(() => {
        const fetchData = async() => {
            try{
                await axios.get(`${BASE_URL}/order`, await apiAuth())
                .then( res => {
                    setRiwayat(res.data._embedded.order)
                    // console.log("isi riwayat = ", riwayat)
                })
            }catch (error) {
                console.log("Error login: ", error);
            }
        }
        fetchData();
    },[riwayat])

    const countOrderByStatus = (status) => {
        // Pastikan riwayat tidak undefined dan memiliki nilai
        if (riwayat && riwayat.length > 0) {
        return riwayat.filter(order => order.status === status).length;
        } else {
        return 0; // Atau nilai default sesuai kebutuhan
        }
    };

    const handleLogout = async () => {
        // Lakukan proses logout
        await logout(navigation);

    };

    return(
        <Layout>
        <ScrollView showsVerticalScrollIndicator={false}>
            {/* Greeting */}
            <Greeting nama={vendor?.nama} greet={"Berikan pelayanan terbaikmu untuk Maba"} />

            {/* Link ke Menu */}
            <SectionHeader title={"Menu Makanan"} onViewAllPress={() => navigation.navigate('menu-vendor')}/>

            {/* Card Profile */}
            <View>
                <View
                style={{
                    borderRadius: 10,
                    backgroundColor: '#FFFFFF',
                    elevation: 10,
                    marginTop: 10,
                }}>
                <View
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={{
                        borderRadius: 10,
                        backgroundColor: '#018BF7'
                    }}
                >
                    <View style={{padding: 20, borderRadius: 10}}>
                    <View style={{flexDirection: 'row'}}>
                        <Image
                        source={require('../../../src/asset/toko.png')}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            borderColor: '#FFFFFF',
                            borderWidth: 2,
                        }}
                        />
                        <View
                        style={{flex: 1, marginLeft: 10, justifyContent: 'center'}}>
                        <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>
                            {vendor?.nama}
                        </Text>
                        <Text style={{color: '#f4f4f4'}}>Vendor Makanan</Text>
                        </View>
                    </View>

                    <View style={{marginTop: 20}}>
                        <View style={{flexDirection: 'row'}}>
                        <View
                            style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: '#FFFFFF', marginLeft: 10, marginBottom: 5, fontSize: 14}}>
                            {vendor?.penanggungJawab}
                            </Text>
                        </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                        <View
                            style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginLeft: 10}}>
                            <MaterialIcons name="smartphone" size={20} color="black" /> 
                            <Text style={{color: '#FFFFFF', marginLeft: 5}}>
                                {vendor?.nomorHp}
                            </Text>
                        </View>
                        </View>
                        <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                        }}>
                        <TouchableOpacity
                            // onPress={() => navigation.navigate('EditProfileMaba', {dataMaba: maba})}
                            style={{flexDirection: 'row', alignItems: 'center'}}
                        >
                            <Text>Edit Profile</Text>
                            <MaterialIcons name="navigate-next" size={24} color="black" />
                        </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                </View>
                </View>
            </View>

            {/* Ringkasan Pembelian */}
            <Text style={{fontSize: 22, fontWeight: 'bold', color: '#212121', marginTop: 15}}>
                Ringkasan Order
            </Text>

            {/* Link ke  Riwayat */}
            <SectionHeader title={"Riwayat Orderan"} onViewAllPress={() => navigation.navigate('order-vendor')}/>

            {/* Card total ringkasan */}
            <View style={{
                flexDirection: 'column',
                marginTop:7
            }}>
                <StatusBadge status={"Sedang Diproses"} count={countOrderByStatus("Sedang Diproses")} backgroundColor = '#018BF7' textColor = '#212121'  />
                <StatusBadge status={"Selesai"} count={countOrderByStatus("Selesai")} backgroundColor = '#C2C2C2' textColor = '#212121'  />
                <StatusBadge status={"Lunas"} count={countOrderByStatus("Lunas")} backgroundColor = '#7AE582' textColor = '#212121' />
                <StatusBadge status={"Refunded"} count={countOrderByStatus("Refunded")} backgroundColor = '#369696' textColor = '#212121'  />
                <StatusBadge status={"Cancel"} count={countOrderByStatus("Cancel")} backgroundColor = '#FF9B70' textColor = '#212121'  />
                <StatusBadge status={"Ditolak"} count={countOrderByStatus("Ditolak")} backgroundColor = '#ECDE6F' textColor = '#212121'  />
            </View>

            {/* Tombol Logout */}
            <TouchableOpacity style={{ margin: 20 }}>
                <TouchableHighlight
                    style={{
                    backgroundColor: '#F02D3A',
                    padding: 10,
                    borderRadius: 20,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    }}
                    onPress={() => 
                    Alert.alert(
                        "Konfirmasi",
                        "Anda yakin ingin keluar?",
                        [
                        {
                            text: "Tidak"
                        },
                        {
                            text: "Ya",
                            onPress: () => {handleLogout()}}])
                    }
                    underlayColor="#D37373" // Warna latar saat ditekan
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Keluar</Text>
                    <MaterialIcons style={{ marginLeft: 5 }} name="logout" size={16} color="black" />
                    </View>
                </TouchableHighlight>
            </TouchableOpacity>

            </ScrollView>
        </Layout>
    )
}

export default ProfileVendor;
