import axios from 'axios';
const apiUrl = 'http://cform.shobhitagarwal.me';
export class API {
    constructor() {

    }

    loginInfoconnect(req){
        const url = `${apiUrl}/api/oauth/login/infoconnect`;
        var headers = {
            "Content-Type": "application/json",
            'crossDomain': true
        };
        var options = headers;
        return axios.post(url, req, options);
    }

    loginGoogle(req){
        const url = `${apiUrl}/api/oauth/login/google`;
        return axios.post(url, req);
    }

    createForm(req){
        const url = `${apiUrl}/api/form/createForm`;
        var headers = {
            "content-type": "application/json",
            "username": localStorage.getItem('username'),
            "token": localStorage.getItem('token'),
            "x-auth": localStorage.getItem('x-auth')
        };
        var options = {
            headers
        };
        return axios.post(url, req, options);
    }
 
    getMyForms() {
        const url = `${apiUrl}/api/form/myforms`;
        var headers = {
            "Content-Type": "application/json",
            "username": localStorage.getItem('username'),
            "token": localStorage.getItem('token'),
            "x-auth": localStorage.getItem('x-auth'),
            "crossDomain": true
        };
        var options = {
            headers
        };
        return axios.get(url, options);
    }
}