import React, {Component} from 'react'
import {Text, View} from "react-native";

class Settings extends Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#f15000', alignItems: 'center'}}>
                <Text>This is Settings screen</Text>
            </View>
        )
    }
}

export default Settings