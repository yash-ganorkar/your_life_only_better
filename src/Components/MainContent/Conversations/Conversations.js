import React, {Component} from 'react'
import {ListView, Text, View} from "react-native";
import update from "immutability-helper/index";
import {connect} from "react-redux";

import {instance} from "../../../Services/Services";
import Conversation from "./Conversation";
import NewConversation from "./NewConversation";

class Conversations extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Text style={{color: 'white', paddingRight: 20}}>Chats</Text>
        }
    };

    _navigate = (match, title) => {
        this.props.navigation.navigate('NewConversation', {
            animated: true,
            animationType: 'fade',
            title: title,
            id: match
        })
    };

    _fetchData = () => {
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + this.props.access_token;

        let size = this.state.size;
        let epochTimeStamp = new Date().getTime();

        console.log(size);

        instance.get('/threads?before=' + epochTimeStamp + '&max=' + size)
            .then(response => {

                if (this.state.conversations.length === 0) {
                    this.setState({
                        isRefreshing: true,
                        conversations: response.data.items,
                        dataSource: this.state.dataSource.cloneWithRows(response.data.items),
                        isRefreshing: false
                    })
                }

                else {
                    let tweets = this.state.conversations;
                    let newTweets = update(tweets, {$push: response.data.items});

                    this.setState({
                        isRefreshing: true,
                        conversations: newTweets,
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
    _renderRow = (conversation) => {
        return (
            <Conversation key={Math.random()} _navigate={this._navigate} conversations={conversation}/>
        )
    };

    constructor(props) {
        super(props);

        this.state = {
            conversations: [],
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
                <ListView dataSource={this.state.dataSource} renderRow={this._renderRow}/>
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