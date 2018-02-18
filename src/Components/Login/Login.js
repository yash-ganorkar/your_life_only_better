import React, {Component} from 'react'
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native'


import Logo from "../Login/Logo/Logo";
import Form from "./Form/Form";

class Login extends Component {
    render() {
        const offset = (Platform.OS === 'android') ? -70 : 0;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAvoidingView keyboardVerticalOffset={offset} behavior="padding">
                    <View>
                        <Logo/>
                        <Form/>
                        <View style={styles.signUpTextContent}>
                            <Text style={styles.signUpText}> Don't have an account?</Text>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.signUpButton}> Sign Up </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#455a64',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUpTextContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginVertical: 20
    },
    signUpText: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.3)'
    },
    signUpButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'rgba(255,255,255,0.9)'
    }
});


export default Login;