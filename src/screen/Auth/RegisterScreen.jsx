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

const RegisterScreen = ({  }) => {

  const [nama, setNama] = useState('');
  const [nimb, setNimb] = useState('');
  const [HP, setHP] = useState('');
  const [prodi, setProdi] = useState('');
  const [kelompok, setKelompok] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPW, setConfirmPW] = useState('');
  const navigation = useNavigation()

  const handleRegister = async () => {
    try {
      const res1 = await axios.post(`${BASE_URL}/register`, {
        usernameId: username,
        password: password,
        role: "Maba"
      });

      console.log("User created:", res1.data);
      const userId = res1.data.id;

      const getToken = await axios.post(`${BASE_URL}/login`,{
        usernameId: username,
        password: password
      });
      const token = getToken.data.accessToken

      const res2 = await axios.post(`${BASE_URL}/maba/create`, {
        userId: userId,
        nama: nama,
        nimb: nimb,
        prodi: prodi,
        kelompok: kelompok,
        nomorHp: HP
      },{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
      });

      console.log("Maba created:", res2.data);
      Alert.alert(
        "Sukses",
        "Berhasil membuat akun Maba",
        [
        {
            text: "Ok", 
            onPress: () => navigation.navigate('Login')
        }
      ])

    } catch (error) {
      console.error("Error:", error);
      Alert.alert(
        "Gagal",
        "Gagal membuat akun Maba",
        [
        {
            text: "Ok"
        }])
    }
  };

  const validateNimb = (value) => {
    if (!/^\d+$/.test(value)) {
      return 'NIMB harus berupa angka';
    }
    return '';
  };

  const validateConfirmPassword = (value) => {
    if (value !== password) {
      return 'Password tidak sesuai';
    }
    return '';
  };

  return (
    <Layout>
    <ScrollView showsVerticalScrollIndicator={false}>

      <TextInput 
        mode='outlined'
        label='Nama'
        placeholder='Masukkan Nama Lengkap'
        style={{
          width: '100%',
          marginBottom: 10
        }}
        onChangeText={(txt) => setNama(txt)}
        value={nama}
      />

      <TextInput 
        mode='outlined'
        label='NIMB'
        placeholder='Masukkan Nomor Maba'
        style={{
          width: '100%',
          marginBottom: 10
        }}
        onChangeText={(txt) => setNimb(txt)}
        value={nimb}
        error={validateNimb(nimb) !== ''}
      />
      <HelperText type="error" visible={validateNimb(nimb) !== ''}>
          {validateNimb(nimb)}
      </HelperText>

      <Text style={{fontSize: 16, fontWeight: 500}}>Program Studi</Text>
      <RadioButton.Group 
        onValueChange={(value) => setProdi(value)}
        value={prodi}
      >
        <RadioButton.Item label="D-IV Statistika" value="D-IV Statistika" />
        <RadioButton.Item label="D-IV Komputasi Statistik" value="D-IV Komputasi Statistik" />
        <RadioButton.Item label="D-III Statistika" value="D-III Statistika" />
      </RadioButton.Group>

      <TextInput 
        mode='outlined'
        label='Nomor HP'
        placeholder='Masukkan nomor Handphone'
        style={{
          width: '100%',
          marginBottom: 10
        }}
        onChangeText={(txt) => setHP(txt)}
        value={HP}
      />

      <TextInput 
        mode='outlined'
        label='Kelompok'
        placeholder='Masukkan nama kelompok PKKMB'
        style={{
          width: '100%',
          marginBottom: 10
        }}
        onChangeText={(txt) => setKelompok(txt)}
        value={kelompok}
      />

      <TextInput 
        mode='outlined'
        label='Username'
        placeholder='Masukkan Username ID'
        style={{
          width: '100%',
          marginBottom: 10
        }}
        onChangeText={(txt) => setUsername(txt)}
        value={username}
      />

      <TextInput 
        mode='outlined'
        label='Password'
        placeholder='Masukkan password Anda'
        secureTextEntry
        style={{
          width: '100%',
          marginBottom: 10
        }}
        onChangeText={(txt) => setPassword(txt)}
        value={password}
      />

      <TextInput 
        mode='outlined'
        label='Confirm Password'
        placeholder='Konfirmasi password'
        secureTextEntry
        style={{
          width: '100%',
          marginBottom: 10
        }}
        onChangeText={(txt) => setConfirmPW(txt)}
        value={confirmPW}
        error={validateConfirmPassword(confirmPW) !== ''}
      />
      <HelperText type="error" visible={validateConfirmPassword(confirmPW) !== ''}>
        {validateConfirmPassword(confirmPW)}
      </HelperText>

        {/* Linked ke Register Vendor */}
      <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'center'}}>
        <Text>Ingin daftar sebagai vendor? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('RegisterVendor')}  
        >
          <Button mode='text'>Daftar</Button>
        </TouchableOpacity>
      </View>

    </ScrollView>



      <TouchableOpacity 
      onPress={() => {
          if (!validateNimb(nimb) && !validateConfirmPassword(confirmPW)) {
            // handleRegister()
            Alert.alert(
              "Konfirmasi",
              "Anda yakin ingin register maba?",
              [
              {
                text: "Tidak"
              },
              {
                text: "Ya",
                onPress: () => {handleRegister()}}])
          }
        }}
      style={{marginTop: 10}}
      >
        <Button mode='contained'>
          Daftar
        </Button>
      </TouchableOpacity>
        
        
    </Layout>
  );
};

export default RegisterScreen;
