import React from 'react'
import {Image, Text, View} from 'react-native'
import Card from '../../Cards/Card'
import CardItem from '../../Cards/CardItem'
import Autolink from '../../../Linker/index';

const TweetDetails = ({tweetDetails}) => {
    const {
        hashtags, sharedWithNetworks, sharedDate, network, sentToPartnerNetworks, field1
        , moneytags, media1, savedToProfile, networkOpportunity, sharedBy
        , score, responses, id, user, sharedWithUsers
    } = tweetDetails;

    const clicked = (url, match) => {
        if (match.matchedText.includes('@')) {
            console.log('@')

        }
        else {
            console.log('#')
        }
    };

    return (
        <Card>
            <CardItem>
                <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                    <View style={{flex: 0.2}}>
                        <Image style={{width: 50, height: 50, borderRadius: 10}}
                               source={{uri: sharedBy.profile.path}}/>
                    </View>
                    <View style={{flex: 0.3}}>
                        <Text style={{fontSize: 18}}>{sharedBy.fullName}</Text>
                    </View>
                    <View style={{flex: 0.6}}>
                        <Autolink
                            onPress={clicked}
                            style={{fontSize: 18, textAlign: 'left'}}
                            text={'@' + sharedBy.shortname.key}
                            hashtag="twitter"
                            mention="twitter"/>
                    </View>
                </View>
            </CardItem>

            <CardItem>
                <Autolink
                    onPress={clicked}
                    style={{textAlign: 'left'}}
                    text={field1}
                    hashtag="twitter"
                    mention="twitter"/>
            </CardItem>
        </Card>
    );


};

export default TweetDetails;