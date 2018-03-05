import React from 'react'
import {Text, View} from 'react-native'
import Card from '../../Cards/Card'
import CardItem from '../../Cards/CardItem'

const TweetDetails = ({tweetDetails}) => {
    const {
        hashtags, sharedWithNetworks, sharedDate, network, sentToPartnerNetworks, field1
        , moneytags, media1, savedToProfile, networkOpportunity, sharedBy
        , fullName, score, shortname, responses, id, user, sharedWithUsers
    } = tweetDetails

    return (
        <Card>
            <CardItem>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>
                        {field1}
                    </Text>
                </View>
            </CardItem>
        </Card>
    );


}

export default TweetDetails;