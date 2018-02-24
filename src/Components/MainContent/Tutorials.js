import React, {Component} from 'react'
import {StatusBar, StyleSheet, View} from 'react-native'
import {StackNavigator} from 'react-navigation'

import Tutorial1 from "./Tutorials/Tutorial1";
import Tutorial2 from "./Tutorials/Tutorial2";


const NavigationApp = StackNavigator({
    Tutorial1: {screen: Tutorial1},
    Tutorial2: {screen: Tutorial2},
}, {
    headerMode: 'none'
})


class Tutorials extends Component {

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar barStyle="dark-content" hidden={false}/>
                <NavigationApp/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Tutorials