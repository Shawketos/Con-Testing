import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const handleApiError = (error) => {
    if (error.response?.data?.msg) {
        return error.response.data.msg;
    }
    if (error.response?.data?.error) {
        return error.response.data.error;
    }
    return "Something went wrong. Please try again.";
};

