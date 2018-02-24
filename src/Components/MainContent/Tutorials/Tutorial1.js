import React, {Component} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

class Tutorial1 extends Component {

    static navigationOptions = {}

    render() {
        const {navigate} = this.props.navigation
        return (
            <View style={{flex: 1, marginTop: 20}}>
                <View style={{backgroundColor: '#00aaff', flex: 0.7, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontSize: 50}}>Hi!</Text>
                </View>
                <View style={{backgroundColor: '#0000ff', justifyContent: 'center', alignItems: 'center', flex: 1.2}}>
                    <Text style={{color: 'white', fontSize: 20, marginLeft: 20, marginRight: 20}}>Yolibe is a place
                        where you find opportunities based on your #interests.
                        Use #hashtags whenever you share and tap on #hashtags whenever you see one
                        you like to see more.
                    </Text>
                    <Text>image</Text>
                </View>
                <View style={{backgroundColor: '#009aff', flex: 1, paddingTop: 20}}>
                    <Text style={{color: 'white', fontSize: 20, marginLeft: 20, marginRight: 20}}>
                        We send you opportunities based on which @networks you've joined and @people you are connected
                        to. Networks are communities
                        and local groups who offer things for you to do.
                    </Text>
                </View>
                <View style={{backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', flex: 0.2}}>
                    <TouchableOpacity onPress={() => navigate('Tutorial2')}>
                        <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}> NEXT </Text>
                    </TouchableOpacity>
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


export default Tutorial1