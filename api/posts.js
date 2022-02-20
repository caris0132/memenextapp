import axiosClient from "./axiosClient";
const posts = {
    featured: (params) => {
        return axiosClient.get('/post/featured', { params });
    },
    all: (params) => {
        return axiosClient.get('/post', { params });
    },
}
export default posts;