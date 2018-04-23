import React, {Component} from 'react'
import {Button, View} from 'react-native'

export default class ViewUsers extends Component {

    goBack = () => {
        this.props.navigation.goBack();
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Button
                    onPress={() => this.goBack}/>
            </View>
        )
    }
}