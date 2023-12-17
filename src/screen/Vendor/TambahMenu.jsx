import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Layout from '../../components/LayoutScreen';
import { Button, TextInput, HelperText } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import {RadioButton} from 'react-native-paper';
import BASE_URL from '../../config';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import DatePicker from '../../components/DatePicker';
import { apiAuth, apiAuthForm } from '../../authUtils';

const TambahMenu = ({  }) => {

  const [nama, setNama] = useState();
  const [tanggal, setTanggal] = useState(new Date());
  const [tipe, setTipe] = useState();
  const [nasi, setNasi] = useState();
  const [lauk, setLauk] = useState();
  const [sayur, setSayur] = useState();
  const [buah, setBuah] = useState();
  const [harga, setHarga] = useState();
  const [jam, setJam] = useState();
  const [foto, setFoto] = useState();
  const navigation = useNavigation()

  const handleTambah = async () => {
    try {
      const res1 = await axios.post(`${BASE_URL}/menu/buatMenu`, {
        vendorID: 1,
        tanggalMenu: tanggal,
        tipe: tipe,
        nasi: nasi,
        lauk: lauk,
        sayur: sayur,
        buah: buah,
        deskripsi: nama,
        harga: harga,
        jamKetersediaan: jam,
        tempatPengambilan: foto
      }, await apiAuthForm());

      console.log("Menu created:", res1.data);

      Alert.alert(
        "Sukses",
        "Berhasil membuat Menu Makanan",
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
        "Gagal membuat Menu Makanan",
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

  const handleDateChange = (newDate) => {
    setTanggal(newDate); // Mengatur state tanggal dengan nilai yang diteruskan dari DatePicker
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
        label='Lauk'
        placeholder='Masukkan isi lauk'
        style={{
          width: '100%',
          marginBottom: 10
        }}
        onChangeText={(txt) => setLauk(txt)}
        value={lauk}
      />

      <TextInput 
        mode='outlined'
        label='Sayur'
        placeholder='Masukkan isi sayur'
        style={{
          width: '100%',
          marginBottom: 10
        }}
        onChangeText={(txt) => setSayur(txt)}
        value={sayur}
      />

      <TextInput 
        mode='outlined'
        label='Buah'
        placeholder='Masukkan isi buah'
        style={{
          width: '100%',
          marginBottom: 10
        }}
        onChangeText={(txt) => setBuah(txt)}
        value={buah}
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
        value={harga}
        error={validateHarga(harga) !== ''}
      />
      <HelperText type="error" visible={validateHarga(harga) !== ''}>
          {validateHarga(harga)}
      </HelperText>

    <Text style={{fontSize: 16, fontWeight: 500}}>Tipe Makanan</Text>
      <RadioButton.Group 
        onValueChange={(value) => setTipe(value)}
        value={tipe}
      >
        <RadioButton.Item label="Sarapan" value="Sarapan" />
        <RadioButton.Item label="Makan Siang" value="Makan Siang" />
      </RadioButton.Group>

      <Text style={{fontSize: 16, fontWeight: 500}}>Termasuk Nasi ?</Text>
      <RadioButton.Group 
        onValueChange={(value) => setNasi(value)}
        value={nasi}
      >
        <RadioButton.Item label="Ya" value="1" />
        <RadioButton.Item label="Tidak" value="0" />
      </RadioButton.Group>

        <DatePicker onDateChange={handleDateChange} />

      <TouchableOpacity 
      onPress={() => {
          if (!validateHarga(harga)) {
            // handleRegister()
            Alert.alert(
              "Konfirmasi",
              "Anda yakin ingin tambah menu ?",
              [
              {
                text: "Tidak"
              },
              {
                text: "Ya",
                onPress: () => {handleTambah()}}])
          }
        }}
      style={{marginVertical: 20}}
      >
        <Button mode='contained'>
          Tambah Menu
        </Button>
      </TouchableOpacity>

    </ScrollView>
        
        
    </Layout>
  );
};

export default TambahMenu;
