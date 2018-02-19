import React, {Component} from 'react'
import {StyleSheet} from 'react-native'
import Register from "./src/Components/Register/Register";

import {StackNavigator} from 'react-navigation'
import Login from "./src/Components/Login/Login";

const NavigationApp = StackNavigator({
    Login: {screen: Login},
    Register: {screen: Register},
}, {
    headerMode: 'screen'
})


class App extends Component {
    render() {
        return (

            <NavigationApp/>
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

export default App