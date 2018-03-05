import React, {Component} from 'react'
import {StatusBar, StyleSheet, View} from 'react-native'
import {StackNavigator} from 'react-navigation'
import Tutorials from "./src/Components/MainContent/Tutorials";
import Login from "./src/Components/Login/Login";
import Register from "./src/Components/Register/Register";

const NavigationApp = StackNavigator({
    Login: {screen: Login},
    Register: {screen: Register},
    Tutorials: {screen: Tutorials},
}, {
    headerMode: 'none'
})


class App extends Component {
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

export default App