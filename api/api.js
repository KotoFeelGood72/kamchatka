import axios from 'axios';

let API_URL = 'https://enjoykamchatka.ru/api/v1/pages/';
let API_URL_BASE = 'https://enjoykamchatka.ru/api/v1/';
// let API_URL = 'https://test.enjoykamchatka.ru/api/v1/pages/';
// let API_URL_BASE = 'https://test.enjoykamchatka.ru/api/v1/';

const AUTH_USERNAME = 'test';
const AUTH_PASSWORD = 'JtMP4yaX4eBxqQFW';

const instance = axios.create({
    headers: {
        common: {        // can be common or any other method
            // Authorization: 'Basic ' + Buffer.from(AUTH_USERNAME + ':' + AUTH_PASSWORD).toString('base64')
        }
    }
})

export const Api = {
    get(path) {
        let url = API_URL + path;
        return instance.get(url);
    },

    post(path, data) {
        let url = API_URL + path;
        return instance.post(url, data);
    },
    getBase(path) {
        let url = API_URL_BASE + path;
        return instance.get(url);
    },
    postBase(path, data) {
        let url = API_URL_BASE + path;
        return instance.post(url, data);
    }
};
