import React, {Component} from 'react'
import {Text, TouchableOpacity, View} from "react-native";

class Tutorial2 extends Component {

    static navigationOptions = {}

    alertBox = () => {
        this.props.navigation.goBack()
    }

    render() {
        const {navigate} = this.props.navigation
        return (
            <View style={{flex: 1, marginTop: 20}}>
                <View style={{backgroundColor: '#00aaff', flex: 0.4, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontSize: 50}}>Okay!</Text>
                </View>
                <View style={{backgroundColor: '#0000ff', justifyContent: 'center', alignItems: 'center', flex: 0.2}}>
                    <Text style={{color: 'white', fontSize: 20, marginLeft: 20, marginRight: 20}}>
                        How do you use this app? 3 ways
                    </Text>
                </View>
                <View style={{
                    backgroundColor: '#009aff',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    paddingTop: 20
                }}>
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
                </View>
                <View style={{backgroundColor: '#0000ff', justifyContent: 'center', alignItems: 'center', flex: 0.4}}>
                    <Text style={{color: 'white', fontSize: 20, marginLeft: 20, marginRight: 20}}>
                        We use notifications to send you updates on opportunities, connections and messages
                    </Text>
                </View>
                <View style={{backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', flex: 0.2}}>
                    <TouchableOpacity onPress={this.alertBox}>
                        <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}> Notification Check </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Tutorial2