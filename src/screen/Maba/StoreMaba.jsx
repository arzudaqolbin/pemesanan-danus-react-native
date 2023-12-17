import React, { useEffect, useState } from 'react';
import { Text, View, TouchableHighlight, Image, StyleSheet, Dimensions, FlatList } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import BASE_URL from '../../config';
import { apiAuth } from '../../authUtils';


const StoreMaba = () => {
    const navigation = useNavigation()
    const [menu, setMenu] = useState();

    useEffect(() => {
      const fetchData = async () => {
        try{
            await axios.get(`${BASE_URL}/menu/semuaMenu`, await apiAuth())
            .then( res => {
                setMenu(res.data)
            })
        }catch (error) {
            console.log("Error login: ", error);
        }
      }

      fetchData();
    }, []);


    const renderMenus = ({ item }) => (
      <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => navigation.navigate('DetailMenuMaba', {menu: item})}>
        <View style={styles.container}>
          <Image style={styles.photo} source={{ uri: item.tempatPengambilan }} />
          <Text style={styles.title}>{item.deskripsi}</Text>
          <Text style={styles.category}>{item.harga}</Text>
        </View>
      </TouchableHighlight>
    );

    return(
        <SafeAreaView>
        <View style={{marginTop:30, marginBottom:100}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginBottom: 10}}>Daftar Menu Makanan</Text>
              <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={menu && menu} renderItem={renderMenus} keyExtractor={(item) => `${item.id}`} />
        </View>
        </SafeAreaView>
    )
}


export default StoreMaba;

// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: RECIPE_ITEM_MARGIN,
    marginTop: 20,
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT + 75,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 15
  },
  photo: {
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444444',
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
  },
  category: {
    marginTop: 5,
    marginBottom: 5
  }
});
