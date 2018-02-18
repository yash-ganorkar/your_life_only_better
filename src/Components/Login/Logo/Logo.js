import React, {Component} from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'

import logo from './imagelogo.png'

class Logo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={{justifyContent: 'flex-end'}} source={logo}/>
                <Text style={{justifyContent: 'flex-start', color: '#fff', marginVertical: 0}}> Opportunites, Jobs and
                    Community Connections </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        marginTop: 30
    }
});

export default Logo