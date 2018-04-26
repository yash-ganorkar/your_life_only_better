import React, {Component} from 'react'
import {Alert, Animated, Keyboard, StyleSheet, Text, TextInput, View} from 'react-native'
import axios from "../../../Services/Services";
import {connect} from "react-redux";
import Icon from 'react-native-vector-icons/Ionicons';

class Tweet extends Component {


    static navigationOptions = ({navigation}) => {
        console.log(navigation);
        return {
            headerLeft: <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: 'white', paddingLeft: 20, marginTop: 5}} onPress={() => {
                    navigation.goBack()
                }}>Back</Text>
            </View>,
            headerTitle: <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: 'white'}}>{navigation.state.params.title}</Text>
            </View>
        }
    };
    keyboardWillShow = (event) => {
        console.log("keyboardWillShow");
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: event.endCoordinates.height,
            })
        ]).start();
    };
    keyboardWillHide = (event) => {
        console.log("keyboardWillHide");
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: 0,
            })
        ]).start();
    };
    _submit = () => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.props.access_token;
        console.log(axios.defaults.headers.common['Authorization']);

        let data = {
            media1: {},
            field1: this.state.message
        };
        axios.post('/share/create', data)
            .then(response => {

                Alert.alert("Yolibe", "Tweet Shared Successfully",
                    [{text: 'OK', onPress: () => this.props.navigation.goBack()}], {cancelable: false})
            })
            .catch(error => {
                console.log(error);
                Alert.alert("Yolibe", "Something went wrong!",
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}], {cancelable: false})


            })


    };

    constructor(props) {
        super(props);

        this.state = {
            message: ''
        };

        this.keyboardHeight = new Animated.Value(0);
    }

    componentWillMount() {
        console.log("Keyboard componentWillMount");
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }

    componentWillUnmount() {
        console.log("Keyboard componentWillUnmount");
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    render() {
        return (
            <Animated.View style={[styles.container, {paddingBottom: this.keyboardHeight}]}>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        value={this.state.message}
                        multiline
                        onChangeText={message => this.setState({message})}
                        ref={ref => {
                            this._emailInput = ref
                        }}
                        placeholder="Type your share"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="send"
                        keyboardType="email-address"
                        onSubmitEditing={this._submit}
                        blurOnSubmit={true}
                    />
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <Icon name="ios-camera" size={30} color="#4F8EF7"/>
                    </View>
                </View>

            </Animated.View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    header: {
        paddingTop: 20 + 20,
        padding: 20,
        backgroundColor: '#336699',
    },
    description: {
        fontSize: 14,
        color: 'white',
    },
    input: {
        flex: 1,
        margin: 20,
        marginBottom: 0,
        paddingHorizontal: 10,
        borderRadius: 4,
        borderColor: '#ccc',
        fontSize: 16,
    },
    legal: {
        margin: 10,
        color: '#333',
        fontSize: 12,
        textAlign: 'center',
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
    },
});

const mapStateToProps = (state) => {
    return {
        username: state.username,
        access_token: state.access_token
    }
};


export default connect(mapStateToProps)(Tweet)
