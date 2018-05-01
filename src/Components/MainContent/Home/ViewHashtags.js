import React, {Component} from 'react'
import {Dimensions, ListView, Platform, StyleSheet, TextInput, View} from 'react-native'
import {instance} from "../../../Services/Services";
import update from "immutability-helper/index";
import {connect} from "react-redux";
import TweetDetails from "./TweetDetails";
import Footer from './Footer'
import Icon from "react-native-ionicons";

class ViewHashtags extends Component {

    static navigationOptions = ({navigation}) => {

        const {width} = Dimensions.get('window');

        let view;
        if (Platform.OS === 'android') {
            view = <TextInput underlineColorAndroid="transparent"
                              style={{
                                  marginLeft: 20,
                                  width: width / 1.5,
                                  height: 40,
                                  fontSize: 16,
                                  paddingHorizontal: 20,
                                  backgroundColor: '#fff',
                                  borderRadius: 5,
                                  color: '#000'
                              }}
                              editable
                              placeholder={navigation.state.params.hashtag}
                              autoCapitalize="none"
                              keyboardType="email-address"
                              returnKeyType="search"
                              onChangeText={(hashtag) => navigation.state.params.hashtag = hashtag}
                              onSubmitEditing={navigation.state.params._submit}
                              autoCorrect={false}
                              placeholderTextColor="#000"/>

        }
        else {
            view = <TextInput underlineColorAndroid="transparent"
                              style={{
                                  marginLeft: 20,
                                  width: width / 1.5,
                                  height: 30,
                                  fontSize: 16,
                                  paddingHorizontal: 20,
                                  backgroundColor: '#fff',
                                  borderRadius: 5,
                                  color: '#000'
                              }}
                              editable
                              placeholder={navigation.state.params.hashtag}
                              autoCapitalize="none"
                              keyboardType="email-address"
                              returnKeyType="search"
                              onChangeText={(hashtag) => navigation.state.params.hashtag = hashtag}
                              onSubmitEditing={navigation.state.params._submit}
                              autoCorrect={false}
                              placeholderTextColor="#000"/>

        }

        return {
            headerLeft: <View style={{flexDirection: 'row'}}>
                <Icon name="arrow-round-back" size={30}
                      style={{marginLeft: 10}} color="#fff" onPress={() => navigation.goBack()}/>
                {view}
            </View>,
        }
    };

    _fetchData = () => {
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + this.props.access_token;
        console.log(instance.defaults.headers.common['Authorization']);

        let from = this.state.from;
        let size = this.state.size;

        let searchTerm = this.props.navigation.state.params.hashtag.split('#');

        instance.get('/share/search?from=' + from + '&size=' + size + '&term=' + searchTerm[1])
            .then(response => {

                if (this.state.tweets.length === 0) {
                    this.setState({
                        isRefreshing: true,
                        tweets: response.data.items.hits,
                        dataSource: this.state.dataSource.cloneWithRows(response.data.items.hits),
                        isRefreshing: false,
                        from: from + size,
                        size: size
                    })
                }

                else {
                    let tweets = this.state.tweets;
                    let newTweets = update(tweets, {$push: response.data.items.hits});

                    this.setState({
                        isRefreshing: true,
                        tweets: newTweets,
                        dataSource: this.state.dataSource.cloneWithRows(newTweets),
                        isRefreshing: false,
                        from: from + size,
                        size: size
                    });
                    console.log(newTweets)
                }

            })
            .catch(error => {
                console.log(error);
            })
    };
    _renderRow = (tweet) => {
        return (
            <TweetDetails key={Math.random()} _navigate={this._navigate} tweetDetails={tweet}/>
        )
    };
    _submit = () => {
        console.log('submit...', this.props.navigation)
    };

    _navigate = (match) => {
        if (match.matchedText.includes('@'))
            this.props.navigation.navigate('ViewMention', {mention: match.matchedText});
        else if (match.matchedText.includes('#'))
            this.props.navigation.navigate('ViewHashtags', {hashtag: match.matchedText})

    };

    constructor(props) {
        super(props);
        console.log(this.props);

        this.state = {
            tweets: [],
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            // Used for RefreshControl
            isRefreshing: false,
            from: 0,
            size: 9
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({_submit: this._submit});
    }

    componentWillMount() {
        this._fetchData()
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#fff', alignItems: 'center'}}>
                <ListView dataSource={this.state.dataSource} renderRow={this._renderRow}
                          renderFooter={() => <Footer fetchData={this._fetchData.bind(this)}/>}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputBox: {
        marginLeft: 20,
        height: 50,
        fontSize: 16,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 5,
        color: '#fff'
    }
});


const mapStateToProps = (state) => {
    return {
        username: state.username,
        access_token: state.access_token
    }
};


export default connect(mapStateToProps)(ViewHashtags)