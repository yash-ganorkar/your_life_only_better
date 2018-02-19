import React from 'react'
import {StyleSheet, Text, View} from "react-native";

const Footer = () => {

    return (
        <View style={styles.container}>
            <Text style={{color: 'white'}}>A React Native Project</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Footer;