import React, {Component} from 'react'
import {ListView, View} from "react-native";
import {connect} from "react-redux";
import update from 'immutability-helper';


import axios from '../../../Services/Services';
import TweetDetails from "./TweetDetails";
import Footer from './Footer'

class Home extends Component {

    _fetchData = () => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.props.access_token;
        console.log(axios.defaults.headers.common['Authorization']);

        let from = this.state.from;
        let size = this.state.size;
        axios.get('/share/feed?from=' + from + '&size=' + size)
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
            <TweetDetails key={Math.random()} tweetDetails={tweet}/>
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
            from: 0,
            size: 9
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


export default connect(mapStateToProps)(Home)