import React, {Component} from 'react'
import {Image, Text, View} from 'react-native'

import Card from '../../Cards/Card'
import CardItem from '../../Cards/CardItem'

class Conversation extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <CardItem>
                    <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                        <View style={{flex: 0.2}}> {/* image */}
                            <Image style={{width: 50, height: 50, borderRadius: 10}}
                                   source={{uri: sharedBy.profile.path}}/>
                        </View>
                        <View style={{flex: 0.3}}> {/* name */}
                            <Text style={{fontSize: 18}}>{this.props.tweetDetails.sharedBy.fullName}</Text>
                        </View>
                        <View style={{flex: 0.6}}> {/* mention */}
                            <Text style={{fontSize: 18, textAlign: 'left'}}>{'@' + sharedBy.shortname.key}</Text>
                        </View>
                    </View>
                </CardItem>
                <CardItem>
                    <View style={{flex: 0.3}}> {/* conversation text */}
                        <Text style={{fontSize: 18}}>{this.props.tweetDetails.sharedBy.fullName}</Text>
                    </View>
                </CardItem>
            </Card>
        );

    }
}

export default Conversation;