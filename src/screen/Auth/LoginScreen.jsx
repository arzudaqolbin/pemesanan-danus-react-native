import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import Layout from '../../components/LayoutScreen';
import { Button, TextInput } from 'react-native-paper';
import axios from 'axios';
import { storeToken, storeRole, apiAuth, saveUserInfo, getUserInfo, getRole } from '../../authUtils';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import BASE_URL from '../../config';
import { ScrollView } from 'react-native-gesture-handler';


const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation()
  
  const handleLogin = async() => {
    console.log('Username:', username);
    console.log('Password:', password);

    try {
    const response = await axios.post(`${BASE_URL}/login`, {
      usernameId: username,
      password: password
    });

    await storeToken(response.data.accessToken);
    await storeRole(response.data.role);

    } catch (error) {
      Alert.alert(
        "Gagal",
        "Id atau Password Salah",
        [
        {
            text: "Ok"
        }])
      console.log("Error login: ", error);
    }
  };

  return (
    <Layout>
      <View style={{flexDirection: 'col', justifyContent: 'center', alignItems: 'center'}}>

      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'center', marginBottom: 10}}>
      <Image style={{width: 150, height: 150, borderRadius: 30}} source={require('../../asset/foodd.jpg')}/>
      </View>
      <Text style={styles.title}>Danus PKKMB Polstat STIS</Text>

      <TextInput 
        mode='outlined'
        label='Username'
        placeholder='Masukkan username Anda'
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
          marginBottom: 20
        }}
        onChangeText={(txt) => setPassword(txt)}
        value={password}
      />

      <TouchableOpacity style={{width: '100%', marginBottom: 15}} onPress={handleLogin}>
        <Button mode='contained'>
          <Text> Login </Text>
        </Button>
      </TouchableOpacity>

      <Text style={{flexDirection: 'row', textAlign: 'center'}}>Belum punya akun ?</Text>

      <TouchableOpacity style={{width: '100%', marginTop: 5}} onPress={() => navigation.navigate('Register')}>
        <Button mode='outlined'>
          Register
        </Button>
      </TouchableOpacity>

        </ScrollView>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default LoginScreen;
