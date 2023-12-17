import { Button } from "react-native-paper";
import Layout from "../../components/LayoutScreen";
import format from "date-fns/format";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiAuth, apiAuthForm } from "../../authUtils";
import BASE_URL from "../../config";
import { ScrollView } from "react-native-gesture-handler";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import OrderDetail from "../../components/OrderDetail";

const DetailOrderMaba = ({route}) => {
    const {order} = route.params
    const [maba, setMaba] = useState()
    const [menu, setMenu] = useState()
    const formatDate = format(new Date(order.waktuOrder), 'dd-MM-yyyy')
    const navigation = useNavigation()

    const isCancelDisabled = order.status !== "Sedang Diproses";
    const isAcceptDisabled = order.status !== "Lunas";

    useEffect(() => {
        const fetchMaba = async() => {
            try{
                await axios.get(`${BASE_URL}/mahasiswabaru/${order.mabaId}`, await apiAuth())
                .then(res => {
                    setMaba(res.data)
                    console.log(maba)
                })
            }catch(error){
                console.log("Error : ", error)
            }
        }
        fetchMaba()
    },[])

    useEffect(() => {
        const fetchMenu = async() => {
            try{
                await axios.get(`${BASE_URL}/menu/${order.menuId}`, await apiAuth())
                .then(res => {
                    setMenu(res.data.deskripsi)
                })
            }catch(error){
                console.log("Error : ", error)
            }
        }
        fetchMenu()
    },[])

    const handleCancel = async() => {
        try{
            await axios.patch(`${BASE_URL}/order/${order.id}/cancel`, {
                alasan: "hanya untuk uas hehe",
                norekRefund: "1238766124"
            }, await apiAuthForm())
            .then(() => {
                Alert.alert(
                "Sukses",
                "Orderan berhasil dicancel",
                [
                    {
                    text: "OK",
                    onPress: () => navigation.navigate('RiwayatMaba')
                    }
                ]);
            })
        }catch(error){
            console.log("Error : ", error)
            Alert.alert(
                "Gagal",
                "Orderan tidak bisa dicancel",
                [
                    {
                    text: "OK"
                    }
                ]);
        }
    }

    const handleClaim = async() => {
        console.log("id orderan = ", order.id)
        try{
            await axios.patch(`${BASE_URL}/order/${order.id}/claim`, {
                orderID: order.id
            }, await apiAuth())
            .then(() => {
                Alert.alert(
                "Sukses",
                "Orderan berhasil diclaim",
                [
                    {
                    text: "OK",
                    onPress: () => navigation.navigate('RiwayatMaba')
                    }
                ]);
            })
        }catch(error){
            console.log("Error : ", error)
            Alert.alert(
                "Gagal",
                "Orderan tidak bisa diclaim",
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

            <OrderDetail order={order} formatDate={formatDate} menu={menu} maba={maba}/>

            {/* Button cancel */}
            <Button 
                style={{marginVertical: 15}} 
                mode="outlined" 
                disabled={isCancelDisabled} 
                onPress={() => 
                    Alert.alert(
                        "Konfirmasi",
                        "Anda yakin ingin menyimpan perubahan?",
                        [
                        {
                            text: "Tidak"
                        },
                        {
                            text: "Ya",
                            onPress: () => {
                                handleCancel()
                            }
                        }])
                    }
            >
                Cancel
            </Button>

            {/* Button Claim */}
            <Button 
                style={{marginBottom: 15}} 
                mode="contained" 
                disabled={isAcceptDisabled} 
                onPress={() => Alert.alert(
                        "Konfirmasi",
                        "Anda yakin ingin terima pesanan?",
                        [
                        {
                            text: "Tidak"
                        },
                        {
                            text: "Ya",
                            onPress: () => {
                                handleClaim()
                            }
                        }])
                    }
            >
                Terima Pesanan
            </Button>

        </ScrollView>
        </Layout>
    )
}


export default DetailOrderMaba;