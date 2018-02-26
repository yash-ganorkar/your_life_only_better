import React, {Component} from 'react'
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Logo from "../Login/Logo/Logo";
import Form from "./Form/Form";
import Footer from "../Footer/Footer";

class Login extends Component {
    static navigationOptions = {
        header: null
    }

    goToTutotials = () => {

        this.props.navigation.navigate("Tutorials")
    }
    render() {
        const {navigate} = this.props.navigation
        const offset = (Platform.OS === 'android') ? -70 : 0;
        return (
            <View style={{flex: 1}}>
                <View style={{backgroundColor: 'white', flex: 1.5, paddingTop: 20}}>
                    <Logo/>
                </View>
                <View style={{backgroundColor: 'white', flex: 2, paddingTop: 20}}>
                    <Form goToTutorials={this.goToTutotials}/>
                </View>
                <View style={{backgroundColor: 'white', flex: 0.5, paddingTop: 20}}>
                    <View style={styles.container}>
                        <Text>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigate('Register')} style={styles.button}>
                            <Text style={styles.signUpButton}> Create New </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{backgroundColor: 'black', flex: 0.2}}>
                    <Footer/>
                </View>
            </View>
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


export default Login;