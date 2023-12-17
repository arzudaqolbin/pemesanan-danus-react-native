import React, { useState } from 'react';
import Layout from '../../components/LayoutScreen';
import { TextInput, Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import BASE_URL from '../../config';
import { apiAuth, getUserInfo } from '../../authUtils';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import ErrorAlert from '../../components/ErrorAlert';

const EditProfileMaba = ({route}) => {
    const {dataMaba} = route.params;
    const navigation = useNavigation()
    const [nama, setNama] = useState(dataMaba.nama);
    const [hp, setHP] = useState(dataMaba.nomorHp);
    const [kelompok, setKelompok] = useState(dataMaba.kelompok);
    const [himada, setHimada] = useState(dataMaba.himada);

    const editProfile = async() => {
        console.log("perubahan nama: ", nama)
        const id = await getUserInfo()
        try{
            await axios.patch(`${BASE_URL}/mahasiswabaru/1`,{
                nama: nama,
                nomorHp: hp,
                kelompok: kelompok,
                himada: himada
            }, await apiAuth())
            .then(() => {
                console.log("data berubah")
                Alert.alert(
                "Sukses",
                "Profil berhasil diperbarui",
                [
                    {
                    text: "OK",
                    onPress: () => navigation.navigate('ProfileMaba')
                    }
                ]);
            })
        }catch(error){
            console.log("Error :", error)
            ErrorAlert(error)
        }
    }

    return(
        <Layout>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TextInput 
                    mode='outlined'
                    label='Nama Lengkap'
                    placeholder='Masukkan Nama Anda'
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
                    placeholder='Masukkan Nomor Maba Anda'
                    style={{
                    width: '100%',
                    backgroundColor: '#D8E4EE',
                    marginBottom: 10
                    }}
                    // onChangeText={(txt) => setUsername(txt)}
                    editable={false}
                    value={dataMaba.nimb}
                />
                <TextInput 
                    mode='outlined'
                    label='Program Studi'
                    placeholder='Masukkan No HP mu'
                    style={{
                    width: '100%',
                    backgroundColor: '#D8E4EE',
                    marginBottom: 10
                    }}
                    // onChangeText={(txt) => setUsername(txt)}
                    value={dataMaba.prodi}
                    editable={false}
                />
                <TextInput 
                    mode='outlined'
                    label='Nomor HP'
                    placeholder='Masukkan No HP mu'
                    style={{
                    width: '100%',
                    marginBottom: 10
                    }}
                    onChangeText={(txt) => setHP(txt)}
                    value={hp}
                />
                <TextInput 
                    mode='outlined'
                    label='Kelompok'
                    placeholder='Masukkan nama kelompok PPKMB'
                    style={{
                    width: '100%',
                    marginBottom: 10
                    }}
                    onChangeText={(txt) => setKelompok(txt)}
                    value={kelompok}
                />
                <TextInput 
                    mode='outlined'
                    label='Himada'
                    placeholder='Masukkan nama Himada'
                    style={{
                    width: '100%',
                    marginBottom: 10
                    }}
                    onChangeText={(txt) => setHimada(txt)}
                    value={himada}
                />
                <Button style={{margin: 15}} mode='contained' onPress={() => 
                    Alert.alert(
                        "Konfirmasi",
                        "Anda yakin ingin menyimpan perubahan?",
                        [
                        {
                            text: "Tidak",
                            onPress: () => {
                            console.log("Perubahan dibatalkan");
                            },
                            style: "cancel"
                        },
                        {
                            text: "Ya",
                            onPress: () => {editProfile()}}])
                    }>
                    Simpan
                </Button>
            </ScrollView>
        </Layout>
    )
}

export default EditProfileMaba;
