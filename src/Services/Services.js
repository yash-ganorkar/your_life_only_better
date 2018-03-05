import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api-test.yolobe.com/api1',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': ''
    }
});

export default instance