import React, {Component} from 'react'
import {ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

import axios from '../../../Services/Services'

class Form extends Component {

    performLogin = () => {

        let editable = false
        let loading = true

        this.setState({
            loading: loading,
            editable: editable
        })

        let data = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post('/login', data)
            .then(response => {
                console.log(response.data);
                this.setState({
                    username: response.data.username,
                    access_token: response.data.access_token,
                    loading: !loading,
                    editable: !editable
                });

                Alert.alert("Yolibe", "Login Successful",
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}], {cancelable: false})


            })
            .catch(error => {
                console.log(error);

                this.setState({
                    loading: !loading,
                    editable: !editable
                });

                Alert.alert("Yolibe", "Something went wrong!",
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}], {cancelable: false})


            })


    }

    constructor() {
        super();

        this.state = {
            username: "",
            password: "",
            loading: false,
            editable: true
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    style={{backgroundColor: '#fff'}}
                    resetScrollToCoords={{x: 0, y: 0}}
                    contentContainerStyle={styles.container}
                    scrollEnabled={true}
                >
                    <TextInput underlineColorAndroid="transparent"
                               style={styles.inputBox}
                               placeholder="Email"
                               autoCapitalize="none"
                               keyboardType="email-address"
                               returnKeyType="next"
                               onSubmitEditing={() => this.passwordInput.focus()}
                               autoCorrect={false}
                               editable={this.state.editable}
                               onChangeText={(username) => this.setState({username: username})}
                               placeholderTextColor="#fff"/>
                    <TextInput underlineColorAndroid="transparent"
                               style={styles.inputBox}
                               placeholder="Password"
                               ref={(input) => this.passwordInput = input}
                               secureTextEntry
                               returnKeyType="go"
                               editable={this.state.editable}
                               autoCapitalize="none"
                               onChangeText={(password) => this.setState({password: password})}
                               autoCorrect={false}
                               placeholderTextColor="#fff"/>

                    <TouchableOpacity onPress={this.performLogin} style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <ActivityIndicator size="large" color="#0000ff" style={{opacity: this.state.loading ? 1.0 : 0.0}}
                                       animating={true}/>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    inputBox: {
        width: 300,
        height: 50,
        fontSize: 16,
        marginVertical: 10,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 20,
        paddingHorizontal: 20,
        color: '#fff'
    },
    button: {
        width: 300,
        height: 50,
        marginVertical: 10,
        backgroundColor: '#1c313a',
        borderRadius: 20,
        justifyContent: 'center'
    },

    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center'
    },
    signUpText: {
        fontSize: 16,
        color: 'rgba(0,0,0,0.3)'
    },
    signUpButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'rgba(255,255,255,0.9)'
    }
});

export default Form