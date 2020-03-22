import axios from '../core/axios';

export const API = {
    // getTestRequest: async () => axios.get('/api/state'), //получение вссех тестов
    // getAllQestions: async () => axios.get('/api/list/Answer'),
    // getConcreteQestion: async (id) => axios.get(`/api/list/Condition/${id}`), //получение конкретного теста

    // checkResult: (data) => axios.post('/api/getResult/check', {data}), //получение правильных ответов

    // toRegister: (data) => axios.post('/api/register', data), 

    // checkLogin: (data) => axios.post('/api/checkLogin', data),

    // userProfile: () => axios.get('/user/profile', {
    //     headers: {
    //         // Authorization: 'Bearer ' + token //the token is a variable which holds the token
    //         Authorization: 'Bearer'
    //     }
    // }),
    processRequest: async (data) => axios.post('/api/processRequest', data), 
    getHistoryList: async () => axios.get('/api/getHistoryList'),
    addNewRequest: async (data) => axios.post('/api/addNewRequest', data),
    deleteRequest: async (data) => axios.post('/api/deleteRequest', data)
};