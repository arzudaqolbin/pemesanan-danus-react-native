import React from "react";
import { Text } from "react-native-paper";

const Greeting = (props) => {
    return(
        <>
        <Text style={{color: '#212121', fontSize: 16}}>Hello,</Text>
        <Text style={{fontSize: 22, fontWeight: 'bold', color: '#212121'}}>
            {props.nama && props.nama}👋
        </Text>
        <Text style={{color: '#212121', fontSize: 14, marginTop: 20, fontWeight: '300'}}>
            {props.greet}
        </Text>
        </>
    )
}

export default Greeting;