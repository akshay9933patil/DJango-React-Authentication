import axios from 'axios';
import React from 'react';

const url =  'http://127.0.0.1:8000/'

export const loginApi = (data) =>{
    return axios.post(`${url}auth/login/`, data)
}

export const accessTokenApi = (user) =>{
    return axios.post(`${url}auth/access/`,user,{headers:{'Content-Type': 'application/json'}},);

}