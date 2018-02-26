import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'

class Logo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{color: '#000', fontSize: 30, fontWeight: '800', zIndex: 100}}>YOLIBE</Text>
                <Text style={{color: '#000'}}> Opportunites, Jobs and
                    Community Connections </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Logo