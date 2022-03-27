import axios from 'axios';

export const signUp = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}/signup`, data);
}

export const login = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}/login`, data);
}

export const addTask = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}/api/add-task`, data);
}

export const getTaskList = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}/api/get-task-list`, data)
}

export const updateTask = (data) => {
    return axios.put(`${process.env.REACT_APP_BACKEND}/api/update-task`, data);
}

export const deleteTask = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}/api/delete-task`, data);
}