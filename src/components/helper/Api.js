import axios from "axios";
import {API_BASEURL} from '../config/constants'
const METHOD = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete"
};

// CHECK BELOW FOR SAMPLE DATA TO BE PASSED
class Api {
    isLoggedIn = false;
    userData = {};
    
    constructor() {
        this.baseURL = API_BASEURL;
        this.getAuthenticationInfo();
    }
    
    getAuthenticationInfo() {
        if (localStorage.getItem("state")) {
            this.isLoggedIn = true;
            this.userData = JSON.parse(localStorage.getItem("state"));
        }
    }
    
    // URL FOR API
    // REFER SAMPLE JSON AT BOTTOM FOR DATA VALUES
    get(url, data) {
        return new Promise((resolve, reject) => {
            this.api(METHOD.GET, url, data)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                console.log("🚀 ~ file: Api.js ~ line 37 ~ Api ~ returnnewPromise ~ error", error)
            });
        });
    }
    
    post(url, data) {
        //console.log('API HANDLER', data)
        return new Promise((resolve, reject) => {
            this.api(METHOD.POST, url, data)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                console.log("🚀 ~ file: Api.js ~ line 50 ~ Api ~ returnnewPromise ~ error", error)
            });
        });
    }
    
    put(url, data) {
        return new Promise((resolve, reject) => {
            this.api(METHOD.PUT, url, data)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                console.log("🚀 ~ file: Api.js ~ line 62 ~ Api ~ returnnewPromise ~ error", error)
            });
        });
    }
    
    delete(url, data) {
        return new Promise((resolve, reject) => {
            this.api(METHOD.DELETE, url, data)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                console.log("🚀 ~ file: Api.js ~ line 74 ~ Api ~ returnnewPromise ~ error", error)
            });
        });
    }
    
    api(method, url, data) {
        return new Promise((resolve, reject) => {
            let axiosConfig = {};
            axiosConfig.method = method;
            axiosConfig.url = this.baseURL + url;
            axiosConfig.headers =  this.setHeaders(data);
            if (data) {
                // if (data.data) axiosConfig.data = {"data":convertPlantextToEncrypted(data.data)};
                // if (data.data) axiosConfig.data = {"data":data.data};
                if (data.params) axiosConfig.params = data.params;
                if (data.data) axiosConfig.data = data.data;
            }
            axios(axiosConfig)
            .then(response => {
                let obj = {
                    // 'data': (response.data.data ? convertEncryptedToPlantext(response.data.data) : {}),
                    'status': response.data.status,
                    'success': response.data.success,
                    'message': response.data.message,
                    'data': (response.data.data ? (response.data.data) : {} ),
                };
                resolve(obj);
            })
            .catch(error => {
                if(error.response && error.response.data){
                    let obj = {
                        // 'data': convertEncryptedToPlantext(error.response.data.data),
                        'data': (error.response.data.data),
                        'status': error.response.status
                    };
                    resolve(obj);
                }
            });
        });
    }
    
    setHeaders(data) {
        let headers = {};
        headers["accept-language"] = "en";
        if (data) {
            if (data.headers)
            for (var key in data.headers)
            if (data.headers.hasOwnProperty(key))
            headers[key] = data.headers[key];
        }
        return headers;
    }
}

export default Api;