import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://api-test.yolobe.com/api1',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export const instance2 = axios.create({
    baseURL: 'https://api-test.yolobe.com/api1',
    headers: {
        'Accept': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
});