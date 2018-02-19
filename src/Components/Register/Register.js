import React, {Component} from 'react'
import {Keyboard, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native'
import Logo from "../Login/Logo/Logo";
import Form from "./Form/Form";
import Footer from "../Footer/Footer";

class Register extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        const {navigate} = this.props.navigation
        const offset = (Platform.OS === 'android') ? -70 : 0;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{flex: 1}}>
                    <View style={{backgroundColor: 'white', flex: 1, paddingTop: 20}}>
                        <Logo/>
                    </View>
                    <View style={{backgroundColor: 'white', flex: 2, paddingTop: 20}}>
                        <Form/>
                    </View>
                    <View style={{backgroundColor: 'white', flex: 0.2, paddingTop: 20}}>
                        <View style={styles.container}>
                            <Text>Have an account?</Text>
                            <TouchableOpacity onPress={() => navigate('Register')} style={styles.button}>
                                <Text style={styles.signUpButton}> Sign In </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{backgroundColor: 'black', flex: 0.2}}>
                        <Footer/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    signUpButton: {
        color: 'blue'
    }
})


export default Register;