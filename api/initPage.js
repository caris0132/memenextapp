import axiosClient from "./axiosClient";
const initPage = {
    getTerm: () => {
        return axiosClient.get(`/term/all`);
    }
};
export default initPage;