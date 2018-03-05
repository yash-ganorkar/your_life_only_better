import React, {Component} from 'react'
import {View} from "react-native";
import Autolink from "react-native-autolink";

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tweets: []
        }
    }

    componentWillMount() {
        console.log(this.props)
        //axios.defaults.headers.common['Authorization'] = 'Bearer '+this.props.access_token;
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#fff', alignItems: 'center'}}>
                <View style={{flex: 1, marginLeft: 20, marginRight: 20}}>
                    <Autolink
                        style={{textAlign: 'left'}}
                        text="My name is #yash Yash Ganorkar and I am @programmer"
                        hashtag="instagram"
                        mention="twitter"/>
                </View>
            </View>
        )
    }
}

export default Home