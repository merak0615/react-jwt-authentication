import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (firstName, lastName, email, password, allowExtraEmails) => {
    return axios.post(API_URL + "signup", {
        firstName,
        lastName,
        email,
        password,
        allowExtraEmails,
    });
};

const login = (email, password) => {
    return axios
        .post(API_URL + "signin", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const updatePassword = (token, password) => {
    return axios.patch(API_URL + `updatepassword/${token}`, {
        password,
    });
};

export default {
    register,
    login,
    logout,
    updatePassword,
};