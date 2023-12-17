import React from "react";
import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

const Layout = (props) => {
    return(
    <View style={
        {flex: 1,
        justifyContent: `${props.justifyContent}`,
        alignItems: `${props.alignItems}`,
        paddingHorizontal: 20,    
        paddingTop: 20,
        marginBottom: 60
    }}>
        <SafeAreaView>
            {props.children}
        </SafeAreaView>
    </View>
    )
}

export default Layout;