import {createStore} from 'redux'


const initialState = {
    username: "",
    access_token: "",
    password: ""
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USERNAMECHANGED':
            return Object.assign({}, state, {
                username: action.text
            })
        case 'PASSWORDCHANGED':
            return Object.assign({}, state, {
                password: action.text
            })
        case 'LOGINSUCCESSFUL':
            return Object.assign({}, state, {
                username: action.username,
                access_token: action.access_token,
                password: ""
            })
        default:
            return state
    }
}

const store = createStore(reducer);

export default store