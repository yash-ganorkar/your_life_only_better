import React, {Component} from 'react'
import {StatusBar, View} from 'react-native'
import {StackNavigator} from 'react-navigation'

import Tutorial1 from "./Tutorials/Tutorial1";
import Tutorial2 from "./Tutorials/Tutorial2";
import Welcome from "./Welcome/Welcome";


const NavigationApp = StackNavigator({
    Tutorial1: {screen: Tutorial1},
    Tutorial2: {screen: Tutorial2},
    Welcome: {screen: Welcome}
}, {
    headerMode: 'none'
})


class Tutorials extends Component {

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar barStyle="light-content" hidden={false}/>
                <NavigationApp/>
            </View>
        );
    }
}

export default Tutorials