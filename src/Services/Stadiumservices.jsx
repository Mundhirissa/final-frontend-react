import axios from "axios";
const stadium_api = 'http://localhost:8080/api/stadiums';

export const Liststadium =()=> axios.get(stadium_api); 

export const createstadium=(stadium)=> axios.post(stadium_api,stadium);

export const getbyidstadium =(stadiumid)=> axios.get(stadium_api+'/'+ stadiumid); 

export const updatestadium =(stadium,id)=> axios.put(stadium_api+'/'+ id,stadium); 

export const deletebyidstadium =(stadiumid)=> axios.delete(stadium_api+'/'+ stadiumid); 
