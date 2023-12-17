import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const OrderDetail = (props) => {
    return(
        <>
            {/* Card info Orderan*/}
            <View 
                style={{
                    flexDirection: 'column', 
                    justifyContent:'center', 
                    alignItems: 'center', 
                    backgroundColor: '#FFE7C2',
                    paddingTop: 20,
                    borderRadius: 20,
                    marginHorizontal: 20
                }}
            >
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>
                    {props.order.nomorOrder}
                </Text>
                <Text style={{fontSize: 18, fontWeight: 500}}>
                    {"["+props.order.status+"]"}
                </Text>
                <Text style={{fontSize: 18, fontWeight: 500}}>
                    {"Rp "+props.order.total}
                </Text>
                <View 
                    style={{
                        flexDirection:'col', 
                        justifyContent: 'flex-start', 
                        alignItems: 'flex-start', 
                        backgroundColor: "#F7E8A4", 
                        width: '100%',
                        marginTop: 15,
                        paddingVertical: 15,
                        paddingHorizontal: 30,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <MaterialIcons name="date-range" size={24} color="black" />
                        <Text style={{fontWeight: '500', fontSize: 17}}> {props.formatDate}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <MaterialIcons name="shopping-bag" size={24} color="black" />
                        <Text style={{fontWeight: '500', fontSize: 17}}> {props.order.jumlah+" Porsi"}</Text>
                    </View>
                </View>
            </View>

            {/* Info Menu dan Pembeli */}
            <View 
                style={{
                    width: "100%", 
                    backgroundColor: '#0091AD', 
                    padding: 20,
                    borderRadius: 20
                }}
            >
                <View style={{widt: "100%", backgroundColor: "#2E294E", padding: 15, borderRadius: 10, flexDirection: 'column', marginVertical: 10}}>
                    <Text style={{fontWeight: 'bold', fontSize: 20, color: "#fff"}}>Menu Makanan</Text>
                    <Text style={{fontSize: 16, color: "#fff"}}>{"[ "+props.menu+" ]"}</Text>
                </View>
                <View style={{widt: "100%", backgroundColor: "#2E294E", padding: 15, borderRadius: 10, flexDirection: 'column',  marginVertical: 10}}>
                    <Text style={{fontWeight: 'bold', fontSize: 20, color: "#fff"}}>Detail Pemesan</Text>
                    <Text style={{fontSize: 16, color: "#fff"}}>
                        {"[ " + (props.maba && props.maba.nama ? props.maba.nama : "") + "]"} 
                        {" [ " + (props.maba && props.maba.nimb ? props.maba.nimb : "") + " ]"}
                    </Text>

                </View>
            </View>
        </>
    )
}

export default OrderDetail;