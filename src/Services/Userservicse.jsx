
import axios from "axios";
const api_rest_full = 'http://localhost:8080/api/users';

export const Listusers =()=> axios.get(api_rest_full); 

export const createuser=(user)=> axios.post(api_rest_full,user);

export const getbyiduser =(id)=> axios.get(api_rest_full+'/'+ id); 

export const updateuser =(user,id)=> axios.put(api_rest_full+'/'+ id,user); 

export const deletebyiduser =(id)=> axios.delete(api_rest_full+'/'+ id); 

export const searchUsers = (keyword) => {
    return axios.get(`${api_rest_full}/search`, { params: { keyword } });
};

