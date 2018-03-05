import React, {Component} from 'react'
import {View} from "react-native";
import {connect} from "react-redux";

import axios from '../../../Services/Services'
import TweetDetails from "./TweetDetails";

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tweets: []
        }
    }

    componentWillMount() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.props.access_token;

        axios.get('/share/feed?from=0&size=10')
            .then(response => {
                this.setState({
                    tweets: response.data.items.hits
                })

                console.log(this.state.tweets[0])
            })
            .catch(error => {
                console.log(error);
            })
    }

    renderTweets() {
        return this.state.tweets.map(tweet =>
            <TweetDetails key={tweet.id} tweetDetails={tweet}/>
        )
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#fff', alignItems: 'center'}}>
                <View style={{flex: 1}}>
                    {this.renderTweets()}
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.username,
        access_token: state.access_token
    }
}


export default connect(mapStateToProps)(Home)