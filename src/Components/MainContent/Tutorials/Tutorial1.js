import React, {Component} from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import FadeInView from "../../Animations/FadeIn/FadeIn";

import tweet1 from '../../../img/Tweet1.png'

class Tutorial1 extends Component {

    static navigationOptions = {}

    render() {
        const {navigate} = this.props.navigation

        return (
            <View style={{flex: 1}}>
                <View style={{backgroundColor: '#00aaff', flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                    <FadeInView time={1000} delay={0}>
                        <Text style={{color: 'white', fontSize: 50}}>Hi!</Text>
                    </FadeInView>
                </View>
                <View style={{backgroundColor: '#0000ff', justifyContent: 'center', alignItems: 'center', flex: 0.8}}>
                    <FadeInView time={1000} delay={1000}>
                        <Text style={{color: 'white', fontSize: 16, marginLeft: 20, marginRight: 20}}>Yolibe is a place
                            where you find opportunities based on your #interests.
                            Use #hashtags whenever you share and tap on #hashtags whenever you see one
                            you like to see more.
                        </Text>

                    </FadeInView>
                </View>

                <Image source={tweet1} style={{flex: 1.2, height: undefined, width: undefined}}/>

                <View style={{backgroundColor: '#009aff', flex: 0.8, justifyContent: 'center'}}>
                    <FadeInView time={1000} delay={3000}>
                        <Text style={{color: 'white', fontSize: 16, marginLeft: 20, marginRight: 20}}>
                        We send you opportunities based on which @networks you've joined and @people you are connected
                        to. Networks are communities
                        and local groups who offer things for you to do.
                    </Text>
                    </FadeInView>
                </View>
                <View style={{backgroundColor: '#000000', paddingTop: 10, alignItems: 'center', flex: 0.2}}>
                    <FadeInView time={1000} delay={5000}>
                        <TouchableOpacity style={styles.button} onPress={() => navigate('Tutorial2')}>
                        <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}> NEXT </Text>
                    </TouchableOpacity>
                    </FadeInView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center'
    }
})

export default Tutorial1