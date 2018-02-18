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

class Register extends Component {
    render() {
        const offset = (Platform.OS === 'android') ? -70 : 0;
        return (
            <KeyboardAvoidingView keyboardVerticalOffset={offset} behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.container}>
                        <Logo/>
                        <Form/>
                        <View style={styles.signUpTextContent}>
                            <Text style={styles.signUpText}> Already have an account?</Text>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.signUpButton}> Log In </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
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
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'row',
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


export default Register;