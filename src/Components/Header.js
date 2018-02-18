import React from 'react'
import {View} from 'react-native'
import {NavTitle} from 'react-native-nav'

const Header = (props) => {
    const {textStyle, viewStyle} = styles;

    return (
        <View>
            <NavTitle style={props.style}>
                {props.title}
            </NavTitle>
        </View>
    );
};

const styles = {
    textStyle: {
        fontSize: 20,
        color: '#fff'
    },
    viewStyle: {
        backgroundColor: '#4A148C',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 15,
        shadowColor: '#fff',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8
    }
};

export default Header;