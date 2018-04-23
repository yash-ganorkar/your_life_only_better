import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        borderColor: '#8E8E8E',
        borderWidth: StyleSheet.hairlineWidth,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    text: {
        color: '#8E8E8E',
    },
});

class Footer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={this.props.fetchData}>
                    <Text style={styles.text}>Load More</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Footer