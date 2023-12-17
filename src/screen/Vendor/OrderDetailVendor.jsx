import { Button, Text } from "react-native-paper";
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

const OrderDetailVendor = ({route}) => {
    const { order } = route.params;
    console.log("========")
    console.log("isi order di detail : ", order)
    console.log("========")
    const [maba, setMaba] = useState()
    const [menu, setMenu] = useState()
    const [id, setId] = useState()
    const formatDate = format(new Date(order.waktuOrder), 'dd-MM-yyyy')
    const navigation = useNavigation()

    const isDisabled = order.status !== "Sedang Diproses";

    // useEffect(() => {
    //     const fetchMaba = async() => {
    //         try{
    //             await axios.get(`${order._links.maba.href}`, await apiAuth())
    //             .then(res => {
    //                 setMaba(res.data)
    //                 console.log(maba)
    //             })
    //         }catch(error){
    //             console.log("Error : ", error)
    //         }
    //     }
    //     fetchMaba()
    // },[])

    // useEffect(() => {
    //     const fetchMenu = async() => {
    //         try{
    //             await axios.get(`${order._links.menu.href}`, await apiAuth())
    //             .then(res => {
    //                 setMenu(res.data.deskripsi)
    //             })
    //         }catch(error){
    //             console.log("Error : ", error)
    //         }
    //     }
    //     fetchMenu()
    // },[])

    // useEffect(() => {
    //     const fetchMenu = async() => {
    //         try{
    //             await axios.get(`${order._links.self.href}`, await apiAuth())
    //             .then(res => {
    //                 setId(res.data.id)
    //             })
    //         }catch(error){
    //             console.log("Error : ", error)
    //         }
    //     }
    //     fetchMenu()
    // },[])

    useEffect(() => {
    const fetchData = async () => {
        try {
        const [mabaResponse, menuResponse] = await Promise.all([
            axios.get(`${order._links.maba.href}`, await apiAuth()),
            axios.get(`${order._links.menu.href}`, await apiAuth()),
        ]);

        setMaba(mabaResponse.data);
        setMenu(menuResponse.data.deskripsi);
        setId(getOrderIDFromURL(order._links.self.href));
        } catch (error) {
        console.log("Error fetching data:", error);
        }
    };

    fetchData();
    }, []);


    const handleReject = async() => {
        try{
            await axios.patch(`${BASE_URL}/order/${id}/reject`, {
                alasan: "hanya untuk uas hehe",
                orderID: id
            }, await apiAuthForm())
            .then(() => {
                Alert.alert(
                "Sukses",
                "Orderan berhasil ditolak",
                [
                    {
                    text: "OK",
                    onPress: () => navigation.navigate('OrderVendor')
                    }
                ]);
            })
        }catch(error){
            console.log("Error : ", error)
            Alert.alert(
                "Gagal",
                "Orderan tidak bisa ditolak",
                [
                    {
                    text: "OK"
                    }
                ]);
        }
    }

    const handleConfirm = async() => {
        console.log("id orderan = ", id)
        try{
            await axios.patch(`${BASE_URL}/order/${id}/confirm`, {
                orderID: id
            }, await apiAuth())
            .then(() => {
                Alert.alert(
                "Sukses",
                "Orderan berhasil diterima",
                [
                    {
                    text: "OK",
                    onPress: () => navigation.navigate('OrderVendor')
                    }
                ]);
            })
        }catch(error){
            console.log("Error : ", error)
            Alert.alert(
                "Gagal",
                "Orderan tidak bisa diterima",
                [
                    {
                    text: "OK"
                    }
                ]);
        }
    }

    const getOrderIDFromURL = (orderUrl) => {
        // Memisahkan URL dengan tanda "/"
        const urlParts = orderUrl.split('/');
        
        // Mengambil bagian terakhir dari URL, yang seharusnya berisi id order
        const orderId = urlParts[urlParts.length - 1];
        
        return orderId;
    };

    return(
        <Layout>
            <ScrollView showsVerticalScrollIndicator={false}>

            {order && (
                <OrderDetail order={order} formatDate={formatDate} menu={menu} maba={maba} />
            )}

            {/* Button reject */}
            <Button 
                style={{marginVertical: 15}} 
                mode="outlined" 
                disabled={isDisabled} 
                onPress={() => 
                    Alert.alert(
                        "Konfirmasi",
                        "Anda yakin ingin menolak pesanan?",
                        [
                        {
                            text: "Tidak"
                        },
                        {
                            text: "Ya",
                            onPress: () => {
                                handleReject()
                            }
                        }])
                    }
            >
                Cancel
            </Button>

            {/* Button Confirm */}
            <Button 
                style={{marginBottom: 15}} 
                mode="contained" 
                disabled={isDisabled} 
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
                                handleConfirm()
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


export default OrderDetailVendor;