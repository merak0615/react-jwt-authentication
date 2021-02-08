import axios from "axios";

const API_URL = "http://localhost:8080/api/mail/";

const activation = (token) => {
    return axios.get(API_URL + "activation", {
        params: {
            token,
        }
    });
};

const sendEmail = (email) => {
    return axios.get(API_URL + "sendtoken", {
        params: {
            email,
        }
    });
};

export default {
    activation,
    sendEmail,
};