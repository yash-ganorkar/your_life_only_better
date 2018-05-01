import React, {Component} from 'react'
import {ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

import {instance} from '../../../Services/Services'
import {connect} from 'react-redux'


class Form extends Component {

    performLogin = () => {
        const {loading, editable} = this.state;
        this.setState({
            loading: !loading,
            editable: !editable
        });

        console.log(this.props.username);
        console.log(this.props.password);

        let data = {
            username: this.props.username,
            password: this.props.password
        };

        instance.post('/login', data)
            .then(response => {

                this.props.onLoginSuccessful(response.data.username, response.data.access_token);
                this.setState({
                    loading: loading,
                    editable: editable
                });

                Alert.alert("Yolibe", "Login Successful",
                    [{text: 'OK', onPress: () => this.props.goToTutorials()}], {cancelable: false})
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    loading: loading,
                    editable: editable
                });

                Alert.alert("Yolibe", "Something went wrong!",
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}], {cancelable: false})


            })


    };

    constructor(props) {
        super(props);
        this.state = {
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
                               onChangeText={(username) => this.props.onUsernameChanged(username)}
                               placeholderTextColor="#fff"/>
                    <TextInput underlineColorAndroid="transparent"
                               style={styles.inputBox}
                               placeholder="Password"
                               ref={(input) => this.passwordInput = input}
                               secureTextEntry
                               returnKeyType="go"
                               editable={this.state.editable}
                               autoCapitalize="none"
                               onChangeText={(password) => this.props.onPasswordChanged(password)}
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

const mapStateToProps = (state) => {
    return {
        username: state.username,
        password: state.password,
        access_token: state.access_token
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUsernameChanged: (username) => {
            const action = {type: 'USERNAMECHANGED', text: username};
            dispatch(action)
        },
        onPasswordChanged: (password) => {
            const action = {type: 'PASSWORDCHANGED', text: password};
            dispatch(action)
        },
        onLoginSuccessful: (username, access_token) => {
            const action = {type: 'LOGINSUCCESSFUL', username: username, access_token: access_token};
            dispatch(action)
        }
    }
};

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


export default connect(mapStateToProps, mapDispatchToProps)(Form)