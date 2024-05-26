import axios from "axios";
const category_api = 'http://localhost:8080/api/categories';

export const Listcategory =()=> axios.get(category_api); 

export const createcategory=(category)=> axios.post(category_api,category);

export const getbyidcategory =(Categoryid)=> axios.get(category_api+'/'+ Categoryid); 

export const updatecategory =(category,Categoryid)=> axios.put(category_api+'/'+ Categoryid,category); 

export const deletebyidcategory =(Categoryid)=> axios.delete(category_api+'/'+ Categoryid); 
