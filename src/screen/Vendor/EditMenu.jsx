import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Layout from '../../components/LayoutScreen';
import { Button, TextInput, HelperText } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import BASE_URL from '../../config';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { apiAuth } from '../../authUtils';

const EditMenu = ({route}) => {

    const {menu} = route.params

  const [nama, setNama] = useState(menu.deskripsi);
  const [harga, setHarga] = useState(menu.harga);
  const [jam, setJam] = useState(menu.jamKetersediaan);
  const [foto, setFoto] = useState(menu.tempatPengambilan);
  const navigation = useNavigation()

  const handleEdit = async () => {
    try {
      const res1 = await axios.patch(`${BASE_URL}/menu/${menu.id}`, {
        deskripsi: nama,
        harga: harga,
        jamKetersediaan: jam,
        tempatPengambilan: foto
      }, await apiAuth());

      console.log("Menu berubah:", res1.data);

      Alert.alert(
        "Sukses",
        "Berhasil mengedit menu",
        [
        {
            text: "Ok", 
            onPress: () => navigation.navigate('MenuVendor')
        }
      ])

    } catch (error) {
      console.error("Error:", error);
      Alert.alert(
        "Gagal",
        "Gagal mengedit menu",
        [
        {
            text: "Ok"
        }])
    }
  };

  const validateHarga = (value) => {
    if (!/^\d+$/.test(value)) {
      return 'Harga harus berupa angka, contoh: 12000';
    }
    return '';
  };

  return (
    <Layout>
    <ScrollView showsVerticalScrollIndicator={false}>

      <TextInput 
        mode='outlined'
        label='Nama Menu'
        placeholder='Masukkan Nama Menu'
        style={{
          width: '100%',
          marginBottom: 10
        }}
        onChangeText={(txt) => setNama(txt)}
        value={nama}
      />

      <TextInput 
        mode='outlined'
        label='Jam Ketersediaan'
        placeholder='Jam Makanan Tersedia'
        style={{
          width: '100%',
          marginBottom: 10
        }}
        onChangeText={(txt) => setJam(txt)}
        value={jam}
      />

      <TextInput 
        mode='outlined'
        label='URL Foto'
        placeholder='Masukkan link foto menu'
        style={{
          width: '100%',
          marginBottom: 10
        }}
        onChangeText={(txt) => setFoto(txt)}
        value={foto}
      />

    <TextInput 
        mode='outlined'
        label='Harga Menu'
        placeholder='Masukkan Harga Makanan'
        style={{
          width: '100%',
          marginBottom: 10
        }}
        onChangeText={(txt) => setHarga(txt)}
        value={harga.toString()}
        error={validateHarga(harga) !== ''}
      />
      <HelperText type="error" visible={validateHarga(harga) !== ''}>
          {validateHarga(harga)}
      </HelperText>


      <TouchableOpacity 
      onPress={() => {
          if (!validateHarga(harga)) {
            // handleRegister()
            Alert.alert(
              "Konfirmasi",
              "Anda yakin ingin edit menu ?",
              [
              {
                text: "Tidak"
              },
              {
                text: "Ya",
                onPress: () => {handleEdit()}}])
          }
        }}
      style={{marginVertical: 20}}
      >
        <Button mode='contained'>
          Simpan
        </Button>
      </TouchableOpacity>

    </ScrollView>
        
        
    </Layout>
  );
};

export default EditMenu;
