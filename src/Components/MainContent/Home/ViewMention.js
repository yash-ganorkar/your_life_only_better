import React, {Component} from 'react'
import {StyleSheet, Text, TextInput, View} from 'react-native'

class ViewMention extends Component {

    static navigationOptions = ({navigation}) => {

        console.log(navigation.state);

        return {
            headerLeft: <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'white', paddingLeft: 20, marginTop: 5}} onPress={() => {
                    navigation.goBack()
                }}>Back</Text>
                <TextInput underlineColorAndroid="transparent"
                           style={{
                               marginLeft: 20,
                               width: 300,
                               height: 30,
                               fontSize: 16,
                               paddingHorizontal: 20,
                               backgroundColor: '#fff',
                               borderRadius: 5,
                               color: '#000'
                           }}
                           editable
                           placeholder={navigation.state.params.mention}
                           autoCapitalize="none"
                           keyboardType="email-address"
                           returnKeyType="search"
                           onChangeText={(mention) => navigation.state.params.mention = mention}
                           onSubmitEditing={navigation.state.params._submit}
                           autoCorrect={false}
                           placeholderTextColor="#000"/>

            </View>,
        }
    };
    _goBack = () => {
        this.props.navigation.goBack()
    };
    _submit = () => {
        console.log('submit...', this.props.navigation)
    };

    constructor(props) {
        super(props);
        console.log(this.props);
    }

    componentWillMount() {
        this.props.navigation.setParams({_submit: this._submit});
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Text>Mentions</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    inputBox: {
        marginLeft: 20,
        height: 50,
        fontSize: 16,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 5,
        color: '#fff'
    }
});


export default ViewMention