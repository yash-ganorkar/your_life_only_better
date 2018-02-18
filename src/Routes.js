import React, {Component} from 'react'
import {Router, Scene, Stack} from 'react-native-router-flux';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';


class Routes extends Component {
    render() {
        return (
            <Router>
                <Stack key="root" hideNavBar={true}>
                    <Scene key="login" component={Login} title="Login" initial={true}/>
                    <Scene key="register" component={Register} title="Register"/>
                </Stack>
            </Router>
        )
    }
}

export default Routes