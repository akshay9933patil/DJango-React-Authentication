import axios from 'axios';
import React from 'react';

const url =  'http://127.0.0.1:8000/'

export const loginApi = (data) =>{
    return axios.post(`${url}auth/login/`, data);
}

export const accessTokenApi = (user) =>{
    return axios.post(`${url}auth/access/`,user,{headers:{'Content-Type': 'application/json'}},);

}

export const addSubjectApi = (subject) =>{
    return axios.post(`${url}subject/subject/`,subject, {headers:{'Content-Type':'application/json'}});
}

export const fetchSubjectsApi = () =>{
    return axios.get(`${url}subject/subject/`,{headers:{'Content-Type':'application/json'}});
}

export const fetchSubjectAPi = (id) =>{
    return axios.get(`${url}subject/subject/${id}/`);
}

export const updateSubjetApi = (data, id) =>{
    return axios.put(`${url}subject/subject/${id}/`,data)
}