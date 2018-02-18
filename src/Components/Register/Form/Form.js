import React, {Component} from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'

class Form extends Component {
    render() {
        return (

            <View style={styles.container}>
                <TextInput underlineColorAndroid="transparent"
                           style={styles.inputBox}
                           placeholder="Email"
                           autoCapitalize="none"
                           keyboardType="email-address"
                           returnKeyType="next"
                           onSubmitEditing={() => this.nameInput.focus()}
                           autoCorrect={false}
                           placeholderTextColor="#fff"/>
                <TextInput underlineColorAndroid="transparent"
                           ref={(input) => this.nameInput = input}
                           style={styles.inputBox}
                           placeholder="Name"
                           autoCapitalize="words"
                           keyboardType="default"
                           returnKeyType="next"
                           onSubmitEditing={() => this.passwordInput.focus()}
                           autoCorrect={false}
                           placeholderTextColor="#fff"/>
                <TextInput underlineColorAndroid="transparent"
                           style={styles.inputBox}
                           placeholder="Password"
                           ref={(input) => this.passwordInput = input}
                           secureTextEntry
                           returnKeyType="next"
                           onSubmitEditing={() => this.phoneInput.focus()}
                           autoCapitalize="none"
                           autoCorrect={false}
                           placeholderTextColor="#fff"/>
                <TextInput underlineColorAndroid="transparent"
                           ref={(input) => this.phoneInput = input}
                           style={styles.inputBox}
                           placeholder="Phone"
                           keyboardType="phone-pad"
                           placeholderTextColor="#fff"/>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBox: {
        width: 300,
        height: 50,
        fontSize: 16,
        marginVertical: 10,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 20,
        paddingHorizontal: 20
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
    }
});

export default Form