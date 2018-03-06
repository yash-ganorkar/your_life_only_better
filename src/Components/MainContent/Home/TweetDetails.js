import React from 'react'
import {Text, View} from 'react-native'
import Card from '../../Cards/Card'
import CardItem from '../../Cards/CardItem'

import Autolink from "react-native-autolink";
import {CachedImage} from "react-native-cached-image";

const TweetDetails = ({tweetDetails}) => {
    const {
        hashtags, sharedWithNetworks, sharedDate, network, sentToPartnerNetworks, field1
        , moneytags, media1, savedToProfile, networkOpportunity, sharedBy
        , score, responses, id, user, sharedWithUsers
    } = tweetDetails;

    console.log(sharedBy.profile.path);
    return (
        <Card>
            <CardItem>
                <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                    <View style={{flex: 0.2}}>
                        <CachedImage style={{width: 50, height: 50, borderRadius: 10}}
                                     source={{uri: sharedBy.profile.path}}/>
                    </View>
                    <View style={{flex: 0.3}}>
                        <Text style={{fontSize: 18}}>{sharedBy.fullName}</Text>
                    </View>
                    <View style={{flex: 0.6}}>
                        <Autolink
                            style={{fontSize: 18, textAlign: 'left'}}
                            text={'@' + sharedBy.shortname.key}
                            hashtag="instagram"
                            mention="twitter"/>
                    </View>
                </View>
            </CardItem>

            <CardItem>
                <Autolink
                    style={{textAlign: 'left'}}
                    text={field1}
                    hashtag="instagram"
                    mention="twitter"/>
            </CardItem>
        </Card>
    );


};

export default TweetDetails;