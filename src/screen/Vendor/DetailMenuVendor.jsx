import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import Layout from '../../components/LayoutScreen';
import { ScrollView } from 'react-native-gesture-handler';
import DetailMenu from '../../components/DetailMenu';
import format from 'date-fns/format';
import axios from 'axios';
import BASE_URL from '../../config';
import { apiAuth } from '../../authUtils';
import { Button } from 'react-native-paper';


const DetailMenuVendor = ({route}) => {

    const navigation = useNavigation()
    const {menu} = route.params;

    const [vendor, setVendor] =useState();
    const formatDate = format(new Date(menu.tanggalMenu), 'dd - MM - yyyy')

    // return(
    //     <>
    //         {/* Foto maem */}
    //         <View style={{flexDirection:'row', justifyContent:"center",alignItems: "center"}}>
    //             <Image style={{width: 300, height: 200, borderRadius: 15}} source={{uri: props.menu.tempatPengambilan}}/>
    //         </View>

    //         {/* Nama dan harga */}
    //         <View style={{flexDirection:'row', alignItems: "center", marginHorizontal: 20, marginVertical: 10}}>
    //             <Text style={{flex: 7, fontWeight: 'bold', fontSize: 25}}>
    //                 {props.menu.deskripsi}
    //             </Text>
    //             <Text style={{flex: 3, fontWeight: 500, fontSize: 18 }}>
    //                 {/* Rp 12.000 */}
    //                 {"Rp "+props.menu.harga}
    //             </Text>
    //         </View>

    //         {/* Tipe maem */}
    //         <View style={{flexDirection: 'row', marginBottom: 5}}>
    //             {
    //                 props.menu.nasi ? 
    //             <View style={{flexDirection:'row', justifyContent:"center",alignItems: "center", marginLeft: 20, backgroundColor: '#3EB0F9', paddingVertical: 5, paddingHorizontal: 12, borderRadius: 15}}> 
    //                 <MaterialCommunityIcons name="rice" size={16} color="black" />
    //                 <Text style={{fontSize: 16}}> Nasi</Text>
    //             </View> : null
    //             }

    //             <View style={{flexDirection:'row', justifyContent:"center",alignItems: "center", marginLeft: 10, backgroundColor: '#E1B63C', paddingVertical: 5, paddingHorizontal: 12, borderRadius: 15}}> 
    //                 <MaterialCommunityIcons name="silverware-fork-knife" size={16} color="black" />
    //                 <Text style={{fontSize: 16}}> {props.menu.tipe}</Text>
    //             </View>
    //         </View>

    //         {/* Deskripsi menu */}
    //         <View style={{ flexDirection: 'column', marginLeft: 22, marginTop: 10, marginBottom: 15 }}>
    //             <IconWithText iconType="MaterialIcons" iconName="corporate-fare" text={props.vendor} />
    //             <IconWithText iconType="MaterialIcons" iconName="date-range" text={props.formatDate} />
    //             <IconWithText iconType="MaterialIcons" iconName="update" text={props.menu.jamKetersediaan} />
    //             <IconWithText iconType="MaterialCommunityIcons" iconName="food-drumstick" text={props.menu.lauk} />
    //             <IconWithText iconType="MaterialCommunityIcons" iconName="fruit-watermelon" text={props.menu.buah} />
    //             <IconWithText iconType="FontAwesome5" iconName="carrot" text={props.menu.sayur} />
    //         </View>

    //         <Button 
    //             mode='contained' 
    //             style={{marginVertical: 15}} 
    //             onPress={() => navigation.navigate('EditMenu', {menu: props})}
    //         >
    //             Edit Menu
    //         </Button>
    //     </>
    // )

    useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/vendor/1`, await apiAuth());
            setVendor(response.data.nama);
        } catch (error) {
            console.log("Error : ", error);
        }
    };

    fetchData();
    }, [menu]);


    return(
        <Layout>
            <ScrollView showsVerticalScrollIndicator={false}>

            <DetailMenu menu={menu} formatDate={formatDate} vendor={vendor}/>

            <Button 
                mode='contained' 
                style={{marginVertical: 15}} 
                onPress={() => navigation.navigate('EditMenu', {menu: menu})}
            >
                Edit Menu
            </Button>

            </ScrollView>
        </Layout>
    )
}

export default DetailMenuVendor;