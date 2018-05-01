import React, {Component} from 'react'
import {Dimensions, Image, Text, View} from 'react-native'
import Card from '../../Cards/Card'
import CardItem from '../../Cards/CardItem'
import Autolink from '../../../Linker/index';

class TweetDetails extends Component {

    clicked = (url, match) => {
        console.log(match);
        this.props._navigate(match);
    };

    getDate = (epochTime) => {
        let today, dd, mm, yyyy;
        if (epochTime === undefined) {
            today = new Date();
            dd = today.getDate();
            mm = today.getMonth(); //January is 0!
            yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
        }
        else {
            today = new Date(epochTime);
            dd = today.getDate();
            mm = today.getMonth(); //January is 0!
            yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }

        }
        return new Date(yyyy, mm, dd);
    };

    getSharedDays = (sharedDate) => {
        let date1 = this.getDate(sharedDate);
        console.log(date1);
        let date2 = this.getDate();
        console.log(date2);
        return (date2 - date1) / (1000 * 60 * 60 * 24);
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

        let view;

        const {height, width} = Dimensions.get('window');

        console.log(this.getSharedDays(sharedDate));

        if (media1 === null) {
            view =
                <Autolink
                    onPress={this.clicked}
                    style={{textAlign: 'left', margin: 10}}
                    text={field1}
                    hashtag="twitter"
                    mention="twitter"/>
        }
        else {
            view =
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <Autolink
                        onPress={this.clicked}
                        style={{textAlign: 'left', margin: 10}}
                        text={field1}
                        hashtag="twitter"
                        mention="twitter"/>
                    <Image style={{
                        width: width - 12,
                        height: height - 300,
                        borderRadius: 20,
                        marginTop: 5,
                        marginBottom: 5
                    }}
                           source={{uri: media1.path}}/>
                </View>
        }

        let sharedBefore = this.getSharedDays(sharedDate);
        let date;
        if (sharedBefore < 1) {
            date = <Text style={{fontSize: 10}}>Shared today</Text>
        }
        else if (sharedBefore >= 1 && sharedBefore < 2) {
            date = <Text style={{fontSize: 10}}>Shared 1 day ago </Text>
        }

        else {
            date = <Text style={{fontSize: 10}}>Shared {sharedBefore} days ago </Text>
        }

        return (
            <Card>
                <CardItem>
                    <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                        <View style={{flex: 0.2, margin: 10}}>
                            <Image style={{width: 50, height: 50, borderRadius: 25}}
                                   source={{uri: sharedBy.profile.path}}/>
                        </View>
                        <View style={{flex: 0.4, flexDirection: 'column'}}>
                            <View style={{flex: 0.5, justifyContent: 'flex-end'}}>
                                <Text style={{fontSize: 18}}>{sharedBy.fullName}</Text>
                            </View>
                            <View style={{flex: 0.4}}>
                                {date}
                            </View>
                        </View>
                        <View style={{flex: 0.5, alignItems: 'flex-start'}}>
                            <Autolink
                                onPress={this.clicked}
                                style={{fontSize: 18, textAlign: 'left'}}
                                text={'@' + sharedBy.shortname.key}
                                hashtag="twitter"
                                mention="twitter"/>
                        </View>
                    </View>
                    {view}
                </CardItem>
            </Card>
        );

    }
}

export default TweetDetails;