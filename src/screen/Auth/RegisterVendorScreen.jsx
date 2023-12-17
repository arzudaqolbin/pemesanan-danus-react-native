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

const RegisterVendorScreen = ({  }) => {

  const [nama, setNama] = useState('');
  const [HP, setHP] = useState('');
  const [PJ, setPJ] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPW, setConfirmPW] = useState('');
  const navigation = useNavigation()

  const handleRegister = async () => {
    try {
      const res1 = await axios.post(`${BASE_URL}/register`, {
        usernameId: username,
        password: password,
        role: "Vendor"
      });

      console.log("User created:", res1.data);
      const userId = res1.data.id;

      const getToken = await axios.post(`${BASE_URL}/login`,{
        usernameId: username,
        password: password
      });
      const token = getToken.data.accessToken

      const res2 = await axios.post(`${BASE_URL}/vendor/create`, {
        userId: userId,
        nama: nama,
        penanggungJawab: PJ,
        nomorHp: HP
      },{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
      });

      console.log("Vendor created:", res2.data);
      Alert.alert(
        "Sukses",
        "Berhasil membuat akun Vendor",
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
        "Gagal membuat akun Vendor",
        [
        {
            text: "Ok"
        }])
    }
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
        placeholder='Masukkan Nama Vendor'
        style={{
          width: '100%',
          marginBottom: 10
        }}
        onChangeText={(txt) => setNama(txt)}
        value={nama}
      />

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
        label='PJ'
        placeholder='Masukkan nama Penanggung Jawab'
        style={{
          width: '100%',
          marginBottom: 10
        }}
        onChangeText={(txt) => setPJ(txt)}
        value={PJ}
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

    </ScrollView>


      <TouchableOpacity 
      onPress={() => {
          if (!validateConfirmPassword(confirmPW)) {
            Alert.alert(
              "Konfirmasi",
              "Anda yakin ingin register vendor?",
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

export default RegisterVendorScreen;
