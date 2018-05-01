import React, {Component} from 'react'
import {ListView, RefreshControl, Text, View} from "react-native";
import {connect} from "react-redux";
import update from 'immutability-helper';


import {instance} from '../../../Services/Services';
import TweetDetails from "./TweetDetails";
import Footer from './Footer'
import Icon from "react-native-ionicons";
import Loader from "../../ActivityIndicator/Loader";

class Home extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerRight: <Icon name="create" size={30}
                               color="#fff" style={{marginRight: 10}} onPress={() => {
                navigation.navigate('Tweet', {animated: true, animationType: 'fade', title: 'New Share'})
            }}/>,
            headerTitle: <Text style={{color: 'white', paddingRight: 20}}>Home</Text>
        }
    };
    getInitialState = () => {
        const initialState = {
            tweets: [],
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            // Used for RefreshControl
            isRefreshing: false,
            from: 0,
            size: 9,
            isDataPresent: false
        };
        return initialState;
    };
    _onRefresh = () => {
        this.state = this.getInitialState();
        this._fetchData('onpull');
    };


    _navigate = (match) => {
        console.log(match.matchedText);

        if (match.matchedText.includes('@'))
            this.props.navigation.navigate('ViewMention', {mention: match.matchedText});
        else if (match.matchedText.includes('#'))
            this.props.navigation.navigate('ViewHashtags', {hashtag: match.matchedText})
    };

    _fetchData = (type) => {
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + this.props.access_token;
        console.log(instance.defaults.headers.common['Authorization']);

        let from = this.state.from;
        let size = this.state.size;
        instance.get('/share/feed?from=' + from + '&size=' + size)
            .then(response => {

                if (type === 'onpull') {
                    this.setState({
                        isRefreshing: true,
                        tweets: response.data.items.hits,
                        dataSource: this.state.dataSource.cloneWithRows(response.data.items.hits),
                        isRefreshing: false,
                        from: from + size,
                        size: size
                    })
                }
                else if (type === 'onload') {
                    this.setState({
                        isRefreshing: true,
                        tweets: response.data.items.hits,
                        dataSource: this.state.dataSource.cloneWithRows(response.data.items.hits),
                        isRefreshing: false,
                        from: from + size,
                        size: size,
                        isDataPresent: true
                    })
                }

                else if (type === 'onloadclicked') {
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

    constructor(props) {
        super(props);

        this.state = this.getInitialState()
    }

    componentWillMount() {
        this._fetchData('onload');
    }

    render() {
        let view;
        if (this.state.isDataPresent) {
            if (this.state.tweets.length === 0) {
                view = <Text>New Account? Share something to get things started :)</Text>
            }
            else {

                view = <ListView dataSource={this.state.dataSource} renderRow={this._renderRow}
                                 renderFooter={() => <Footer fetchData={this._fetchData.bind(this, 'onloadclicked')}/>}
                                 refreshControl={
                                     <RefreshControl
                                         refreshing={this.state.isRefreshing}
                                         onRefresh={this._onRefresh.bind(this)}
                                     />
                                 }/>
            }
        }
        else {
            view = <Loader
                loading={true}/>
        }
        return (

            <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#fff', alignItems: 'center'}}>
                {view}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.username,
        access_token: state.access_token
    }
};


export default connect(mapStateToProps)(Home)