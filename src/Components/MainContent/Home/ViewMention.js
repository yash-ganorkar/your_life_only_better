import React, {Component} from 'react'
import {Image, StyleSheet, Text, TextInput, View} from 'react-native'
import axios from "../../../Services/Services";

import {connect} from "react-redux";

class ViewMention extends Component {

    static navigationOptions = ({navigation}) => {

        console.log(navigation.state);

        return {
            headerLeft: <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'white', paddingLeft: 20, marginTop: 5}} onPress={() => {
                    navigation.goBack()
                }}>Back</Text>
                <TextInput underlineColorAndroid="transparent"
                           style={{
                               marginLeft: 20,
                               width: 300,
                               height: 30,
                               fontSize: 16,
                               paddingHorizontal: 20,
                               backgroundColor: '#fff',
                               borderRadius: 5,
                               color: '#000'
                           }}
                           editable
                           placeholder={navigation.state.params.mention}
                           autoCapitalize="none"
                           keyboardType="email-address"
                           returnKeyType="search"
                           onChangeText={(mention) => navigation.state.params.mention = mention}
                           onSubmitEditing={navigation.state.params._submit}
                           autoCorrect={false}
                           placeholderTextColor="#000"/>

            </View>,
        }
    };
    _goBack = () => {
        this.props.navigation.goBack()
    };
    _submit = () => {
        console.log('submit...', this.props.navigation)
    };

    _fetchData = () => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.props.access_token;
        console.log(axios.defaults.headers.common['Authorization']);

        let mention = this.props.navigation.state.params.mention.split('@');

        axios.get('/handle/invoke/' + mention[1])
            .then(response => {
                let fullName = response.data.items.user.fullName;
                let profilePic = response.data.items.user.profile.path;
                let about = response.data.items.user.about;
                let interests = response.data.items.user.interests;

                console.log(fullName, profilePic, about, interests);

                this.setState({
                    profilePic: profilePic,
                    fullName: fullName,
                    about: about,
                    interests: interests
                });
            })
            .catch(error => {
                console.log(error);
            })
    };

    constructor(props) {
        super(props);
        console.log(this.props);

        this.state = {
            profilePic: '',
            fullName: '',
            about: '',
            interests: ''
        }
    }

    componentWillMount() {
        this._fetchData();
        this.props.navigation.setParams({_submit: this._submit});
    }
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Image
                        style={{width: 200, height: 200, marginTop: 20, borderRadius: 50}}
                        source={{uri: this.state.profilePic}}
                    />
                </View>
                <View style={{flex: 0.8, marginLeft: 10}}>
                    <Text style={{fontSize: 30}}>Name</Text>
                    <Text style={{marginTop: 5, fontSize: 15}}>{this.state.fullName}</Text>
                    <Text style={{marginTop: 10, fontSize: 30}}>Interests</Text>
                    <Text style={{marginTop: 5, fontSize: 15}}>{this.state.interests}</Text>
                    <Text style={{marginTop: 10, fontSize: 30}}>About</Text>
                    <Text style={{marginTop: 5, fontSize: 15}}>{this.state.about}</Text>
                </View>
                <View style={{flex: 0.2, flexDirection: 'row', marginTop: 30, marginLeft: 5}}>
                    <Text style={{color: 'blue', fontSize: 20}}> Achievements </Text>
                    <Text style={{color: 'blue', fontSize: 20, marginLeft: 10}}> Shares </Text>
                    <Text style={{color: 'blue', fontSize: 20, marginLeft: 10}}> Connections </Text>
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
};


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


export default connect(mapStateToProps)(ViewMention)