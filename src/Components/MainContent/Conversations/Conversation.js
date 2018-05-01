import React, {Component} from 'react'
import {Dimensions, Text, TouchableHighlight, View} from 'react-native'

import Card from '../../Cards/Card'
import CardItem from '../../Cards/CardItem'

class Conversation extends Component {

    clicked = (id, title) => {
        this.props._navigate(id, title);
    };

    constructor(props) {
        super(props);

        console.log(this.props.conversations);
    }

    render() {

        let memberSize = this.props.conversations.members.length;


        let text = this.props.conversations.last.text.length < 35 ? this.props.conversations.last.text : this.props.conversations.last.text.substring(0, 47) + "...";
        const {width} = Dimensions.get('window');

        return (
            <TouchableHighlight
                onPress={this.clicked.bind(this, this.props.conversations.id, this.props.conversations.title)}>
                <Card>
                    <CardItem>
                        <View
                            style={{flexDirection: 'column', width: width - 20, height: 100, flex: 1, marginLeft: 20}}>
                            <View style={{alignItems: 'flex-start', marginTop: 10}}>
                                <Text style={{fontSize: 16}}>{this.props.conversations.title}</Text>
                            </View>
                            <View style={{justifyContent: 'flex-end', marginTop: 10}}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 18
                                }}>{this.props.conversations.last.from.fullName}</Text>
                            </View>
                            <View style={{justifyContent: 'flex-end', marginTop: 10}}>
                                <Text>{text}</Text>
                            </View>
                        </View>
                    </CardItem>
                </Card>
            </TouchableHighlight>
        );

    }
}

export default Conversation;