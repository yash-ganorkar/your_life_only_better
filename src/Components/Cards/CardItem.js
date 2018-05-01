import React from 'react'
import {View} from 'react-native'

const CardItem = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        borderColor: "#ddd",
        position: 'relative'
    }
};
export default CardItem