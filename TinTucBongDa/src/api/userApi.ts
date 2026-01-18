import axiosClient from "./axiosClient";

const userApi = {
    login: (data: any) => {
        return axiosClient.post('/user/login', data);
    },

    register: (data: any) => {
        return axiosClient.post('/user/register', data);
    },

    toggleSaveArticle: (articleId: string) => {
        return axiosClient.post('/user/toggle-save', { articleId });
    },

    getSavedArticles: () => {
        return axiosClient.get('/user/saved-articles');
    }
};

export default userApi;