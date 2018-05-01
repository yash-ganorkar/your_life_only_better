import React, {Component} from 'react'
import {ListView, Text, View} from 'react-native'
import {instance} from "../../../Services/Services";
import {connect} from "react-redux";
import Icon from "react-native-ionicons";

class NewConversation extends Component {

    static navigationOptions = ({navigation}) => {
        console.log(navigation.state);

        return {
            headerLeft: <Icon name="arrow-round-back" size={30}
                              style={{marginLeft: 10}} color="#fff" onPress={() => navigation.goBack()}/>,
            headerTitle: <Text style={{color: 'white', paddingRight: 20}}>{navigation.state.params.title}</Text>
        }
    };

    _renderRow = (chat) => {
        const {text} = chat;
        return (
            <View style={{marginLeft: 5, marginRight: 5, marginTop: 5}}>
                <View style={{
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderBottomWidth: 0,
                    borderRadius: 10,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    elevation: 1,
                    marginLeft: 5,
                    marginRight: 5
                }}>
                    <View style={{
                        borderBottomWidth: 1,
                        backgroundColor: '#673AB7',
                        justifyContent: 'flex-start',
                        borderRadius: 10,
                        flexDirection: 'column',
                        height: 50,
                        borderColor: "#ddd",
                        position: 'relative'
                    }}>
                        <View style={{flex: 1}}>
                            <Text style={{fontSize: 15, textAlign: 'right', color: '#fff'}}>{text}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    };

    _fetchData = () => {
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + this.props.access_token;

        let size = this.state.size;
        let epochTimeStamp = new Date().getTime();

        instance.get('/messaging/' + this.props.navigation.state.params.id + '?before=' + epochTimeStamp + '&max=' + size)
            .then(response => {
                console.log("response ->", response.data);

                if (this.state.chats.length === 0) {
                    this.setState({
                        isRefreshing: true,
                        chats: response.data.items,
                        dataSource: this.state.dataSource.cloneWithRows(response.data.items),
                        isRefreshing: false
                    })
                }

                else {
                    let tweets = this.state.conversations;
                    let newTweets = update(tweets, {$push: response.data.items});

                    this.setState({
                        isRefreshing: true,
                        chats: newTweets,
                        dataSource: this.state.dataSource.cloneWithRows(newTweets),
                        isRefreshing: false
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    };

    constructor(props) {
        super(props);

        this.state = {
            chats: [],
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            size: 10
        };

    }

    componentWillMount() {
        this._fetchData();
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-end', backgroundColor: '#fff', alignItems: 'flex-end'}}>
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

export default connect(mapStateToProps)(NewConversation)