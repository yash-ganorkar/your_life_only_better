import React, {Component} from 'react'
import {Text, TouchableOpacity, View} from "react-native";
import FadeInView from "../../Animations/FadeIn/FadeIn";
import {NavigationActions} from "react-navigation";


const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'Welcome'})],
});

class Tutorial2 extends Component {

    static navigationOptions = {}

    goToWelcomeScreen = () => {
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{backgroundColor: '#00aaff', flex: 0.4, justifyContent: 'center', alignItems: 'center'}}>
                    <FadeInView time={1000} delay={0}>
                        <Text style={{color: 'white', fontSize: 50}}>Okay!</Text>
                    </FadeInView>
                </View>
                <View style={{backgroundColor: '#0000ff', justifyContent: 'center', alignItems: 'center', flex: 0.5}}>
                    <FadeInView time={1000} delay={1000}>

                    <Text style={{color: 'white', fontSize: 20, marginLeft: 20, marginRight: 20}}>
                        How do you use this app? 3 ways
                    </Text>
                    </FadeInView>
                </View>
                <View style={{
                    backgroundColor: '#009aff',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1
                }}>
                    <FadeInView time={1000} delay={3000}>

                        <Text style={{color: 'white', fontSize: 20, marginLeft: 20, marginRight: 20}}>
                            See the latest stuff from all of your @networks on the feed
                        </Text>
                        <Text style={{color: 'white', fontSize: 20, marginLeft: 20, marginRight: 20}}>
                            Send group messages to all your @contacts using yolibe messaging
                        </Text>
                        <Text style={{color: 'white', fontSize: 20, marginLeft: 20, marginRight: 20}}>
                            Update and customize your profile with #interests and @networks to get better recommendations
                            from Yolibe
                        </Text>
                    </FadeInView>
                </View>
                <View style={{backgroundColor: '#0000ff', justifyContent: 'center', alignItems: 'center', flex: 0.4}}>
                    <FadeInView time={1000} delay={5000}>
                        <Text style={{color: 'white', fontSize: 20, marginLeft: 20, marginRight: 20}}>
                            We use notifications to send you updates on opportunities, connections and messages
                        </Text>
                    </FadeInView>
                </View>
                <View style={{backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', flex: 0.2}}>
                    <FadeInView time={1000} delay={7000}>
                        <TouchableOpacity onPress={this.goToWelcomeScreen}>
                        <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}> Notification Check </Text>
                    </TouchableOpacity>
                    </FadeInView>
                </View>
            </View>
        );
    }
}

export default Tutorial2