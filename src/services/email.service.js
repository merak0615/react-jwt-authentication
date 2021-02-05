import axios from "axios";

const API_URL = "http://localhost:8080/api/mail/";

const activation = (token) => {
    return axios.get(API_URL + "activation", {
        params: {
            token,
        }
    });
};

const emailSending = (email) => {
    return axios.get(API_URL + "sendtoken", {
        params: {
            email,
        }
    });
};

const passwordReset = (token, password) => {
    return axios.post(API_URL + "passwordreset", {
        token,
        password,
    });
};


export default {
    activation,
    emailSending,
    passwordReset,
};