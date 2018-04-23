import React, {Component} from 'react'
import {Image, Text, View} from 'react-native'
import Card from '../../Cards/Card'
import CardItem from '../../Cards/CardItem'
import Autolink from '../../../Linker/index';

class TweetDetails extends Component {

    clicked = (url, match) => {
        console.log(match);
        this.props._navigate(match);
    };

    constructor(props) {
        super(props);
    }

    render() {

        const {
            hashtags, sharedWithNetworks, sharedDate, network, sentToPartnerNetworks, field1
            , moneytags, media1, savedToProfile, networkOpportunity, sharedBy
            , score, responses, id, user, sharedWithUsers
        } = this.props.tweetDetails;

        return (
            <Card>
                <CardItem>
                    <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                        <View style={{flex: 0.2}}>
                            <Image style={{width: 50, height: 50, borderRadius: 10}}
                                   source={{uri: sharedBy.profile.path}}/>
                        </View>
                        <View style={{flex: 0.3}}>
                            <Text style={{fontSize: 18}}>{this.props.tweetDetails.sharedBy.fullName}</Text>
                        </View>
                        <View style={{flex: 0.6}}>
                            <Autolink
                                onPress={this.clicked}
                                style={{fontSize: 18, textAlign: 'left'}}
                                text={'@' + sharedBy.shortname.key}
                                hashtag="twitter"
                                mention="twitter"/>
                        </View>
                    </View>
                </CardItem>

                <CardItem>
                    <Autolink
                        onPress={this.clicked}
                        style={{textAlign: 'left'}}
                        text={field1}
                        hashtag="twitter"
                        mention="twitter"/>
                </CardItem>
            </Card>
        );

    }
}

export default TweetDetails;