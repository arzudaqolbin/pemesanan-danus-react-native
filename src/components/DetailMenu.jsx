import React from 'react';
import { View, Text, Image } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'; // Import the necessary icons


const IconWithText = ({ iconType, iconName, text }) => {
  let IconComponent = null;

  // Menentukan tipe ikon berdasarkan properti 'iconType'
  switch (iconType) {
    case 'MaterialIcons':
      IconComponent = MaterialIcons;
      break;
    case 'MaterialCommunityIcons':
      IconComponent = MaterialCommunityIcons;
      break;
    case 'FontAwesome5':
      IconComponent = FontAwesome5;
      break;
    default:
      // Default: Gunakan MaterialIcons jika tipe tidak valid
      IconComponent = MaterialIcons;
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
      <IconComponent name={iconName} size={22} color="black" />
      <Text style={{ fontSize: 16, marginLeft: 10 }}>{text}</Text>
    </View>
  );
};

const DetailMenu = (props) => {
    return(
        <>
            {/* Foto maem */}
            <View style={{flexDirection:'row', justifyContent:"center",alignItems: "center"}}>
                <Image style={{width: 300, height: 200, borderRadius: 15}} source={{uri: props.menu.tempatPengambilan}}/>
            </View>

            {/* Nama dan harga */}
            <View style={{flexDirection:'row', alignItems: "center", marginHorizontal: 20, marginVertical: 10}}>
                <Text style={{flex: 7, fontWeight: 'bold', fontSize: 25}}>
                    {props.menu.deskripsi}
                </Text>
                <Text style={{flex: 3, fontWeight: 500, fontSize: 18 }}>
                    {/* Rp 12.000 */}
                    {"Rp "+props.menu.harga}
                </Text>
            </View>

            {/* Tipe maem */}
            <View style={{flexDirection: 'row', marginBottom: 5}}>
                {
                    props.menu.nasi ? 
                <View style={{flexDirection:'row', justifyContent:"center",alignItems: "center", marginLeft: 20, backgroundColor: '#3EB0F9', paddingVertical: 5, paddingHorizontal: 12, borderRadius: 15}}> 
                    <MaterialCommunityIcons name="rice" size={16} color="black" />
                    <Text style={{fontSize: 16}}> Nasi</Text>
                </View> : null
                }

                <View style={{flexDirection:'row', justifyContent:"center",alignItems: "center", marginLeft: 10, backgroundColor: '#E1B63C', paddingVertical: 5, paddingHorizontal: 12, borderRadius: 15}}> 
                    <MaterialCommunityIcons name="silverware-fork-knife" size={16} color="black" />
                    <Text style={{fontSize: 16}}> {props.menu.tipe}</Text>
                </View>
            </View>

            {/* Deskripsi menu */}
            <View style={{ flexDirection: 'column', marginLeft: 22, marginTop: 10, marginBottom: 15 }}>
                <IconWithText iconType="MaterialIcons" iconName="corporate-fare" text={props.vendor} />
                <IconWithText iconType="MaterialIcons" iconName="date-range" text={props.formatDate} />
                <IconWithText iconType="MaterialIcons" iconName="update" text={props.menu.jamKetersediaan} />
                <IconWithText iconType="MaterialCommunityIcons" iconName="food-drumstick" text={props.menu.lauk} />
                <IconWithText iconType="MaterialCommunityIcons" iconName="fruit-watermelon" text={props.menu.buah} />
                <IconWithText iconType="FontAwesome5" iconName="carrot" text={props.menu.sayur} />
            </View>
        </>
    )
}

export default DetailMenu;