import React, {Component} from 'react'
import {ListView, View} from "react-native";
import update from "immutability-helper/index";
import {connect} from "react-redux";

import axios from "../../../Services/Services";
import Conversation from "./Conversation";
import Footer from "../Home/Footer";

class Conversations extends Component {

    _navigate = (match) => {
        console.log(match.matchedText);

        if (match.matchedText.includes('@'))
            this.props.navigation.navigate('ViewMention', {mention: match.matchedText});
        else if (match.matchedText.includes('#'))
            this.props.navigation.navigate('ViewHashtags', {hashtag: match.matchedText})
    };

    _fetchData = () => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.props.access_token;
        console.log(axios.defaults.headers.common['Authorization']);

        let size = this.state.size;
        let epochTimeStamp = new Date().getTime();

        axios.get('/threads?before=' + epochTimeStamp + '&max=' + size)
            .then(response => {

                if (this.state.tweets.length === 0) {
                    this.setState({
                        isRefreshing: true,
                        tweets: response.data.items,
                        dataSource: this.state.dataSource.cloneWithRows(response.data.items),
                        isRefreshing: false
                    })
                }

                else {
                    let tweets = this.state.tweets;
                    let newTweets = update(tweets, {$push: response.data.items});

                    this.setState({
                        isRefreshing: true,
                        tweets: newTweets,
                        dataSource: this.state.dataSource.cloneWithRows(newTweets),
                        isRefreshing: false
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
            <Conversation key={Math.random()} _navigate={this._navigate} tweetDetails={tweet}/>
        )
    };

    constructor(props) {
        super(props);

        this.state = {
            tweets: [],
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            // Used for RefreshControl
            isRefreshing: false,
            size: 30
        };
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

const mapStateToProps = (state) => {
    return {
        username: state.username,
        access_token: state.access_token
    }
};


export default connect(mapStateToProps)(Conversations)