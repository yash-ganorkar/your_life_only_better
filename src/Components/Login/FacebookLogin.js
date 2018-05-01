import React, {Component} from 'react'
import {View} from 'react-native'
import FBSDK from 'react-native-fbsdk';

class FacebookLogin extends Component {


    render() {
        const {LoginButton} = FBSDK;

        return (
            <View>
                <LoginButton
                    publishPermissions={["publish_actions"]}
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                alert("Login failed with error: " + result.error);
                            } else if (result.isCancelled) {
                                alert("Login was cancelled");
                            } else {
                                console.log(result);
                                alert("Login was successful with permissions: " + result.grantedPermissions)
                            }
                        }
                    }
                    onLogoutFinished={() => alert("User logged out")}/>
            </View>
        );
    }

}

export default FacebookLogin