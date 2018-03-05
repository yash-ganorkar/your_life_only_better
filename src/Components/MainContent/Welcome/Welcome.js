import React, {Component} from 'react'
import {DrawerNavigator, StackNavigator} from "react-navigation";
import {BackHandler, Platform, StatusBar, Text, ToastAndroid, View} from "react-native";


import Home from "../Home/Home";
import Conversations from "../Conversations/Conversations";
import Settings from "../Settings/Settings";
import Management from "../Management/Management";


const DrawerStack = DrawerNavigator({
    Home: {screen: Home},
    Conversations: {screen: Conversations},
    Settings: {screen: Settings},
    Management: {screen: Management},
})

const DrawerNavigation = StackNavigator({
    DrawerStack: {screen: DrawerStack}
}, {
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
        headerStyle: {backgroundColor: '#800080'},
        headerLeft: <Text style={{color: 'white', paddingLeft: 20}} onPress={() => {
            navigation.navigate('DrawerOpen')
        }}>Menu</Text>
    })
})

class Welcome extends Component {

    componentDidMount() {
        // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        //SplashScreen.hide();

        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', () => {

                BackHandler.exitApp();
                ToastAndroid.show('Something happened :)', ToastAndroid.SHORT);
                return true;
            });
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar barStyle="light-content" hidden={false}/>
                <DrawerNavigation/>
            </View>
        )
    }
}


export default Welcome
