import React, {Component} from 'react'
import {Text, View} from "react-native";

class Home extends Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#f15000', alignItems: 'center'}}>
                <Text>This is home screen</Text>
            </View>
        )
    }
}

export default Home