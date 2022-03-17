import axios from 'axios';
import queryString from 'query-string';
const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + `/api`,
    headers: {
        'content-type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify(params),
});
// Handle token
axiosClient.interceptors.request.use(async(config) => {
    // Do something before request is sent
    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    throw error;
});

export default axiosClient;