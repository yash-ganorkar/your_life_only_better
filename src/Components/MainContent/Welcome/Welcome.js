import React, {Component} from 'react'
import {DrawerNavigator, StackNavigator} from "react-navigation";
import {BackHandler, Platform, StatusBar, ToastAndroid, View} from "react-native";


import Home from "../Home/Home";
import Conversations from "../Conversations/Conversations";
import Settings from "../Settings/Settings";
import Management from "../Management/Management";
import {Provider} from "react-redux";
import store from "../../../store";
import ViewMention from "../Home/ViewMention";
import ViewHashtags from "../Home/ViewHashtags";
import Tweet from "../Home/Tweet";
import Icon from "react-native-ionicons";
import NewConversation from "../Conversations/NewConversation";


const DrawerStack = DrawerNavigator({
    Home: {screen: Home},
    Conversations: {screen: Conversations},
    Settings: {screen: Settings},
    Management: {screen: Management}
});

const DrawerNavigation = StackNavigator({
    DrawerStack: {screen: DrawerStack},
    ViewMention: {screen: ViewMention},
    ViewHashtags: {screen: ViewHashtags},
    Tweet: {screen: Tweet},
    NewConversation: {screen: NewConversation}
}, {
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
        headerStyle: {backgroundColor: '#800080'},
        headerLeft: <Icon name="menu" size={30}
                          color="#fff" style={{marginLeft: 10}} onPress={() => navigation.navigate('DrawerOpen')}/>
    })
});

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
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <StatusBar barStyle="light-content" hidden={false}/>
                    <DrawerNavigation/>
                </View>
            </Provider>
        )
    }
}


export default Welcome
