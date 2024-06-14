import axios from "axios";
const booking_api = 'http://localhost:8080/api/bookings';

export const Listbooking =()=> axios.get(booking_api); 

export const createbooking=(booking)=> axios.post(booking_api,booking);

export const getbyidbooking =(Bookingid)=> axios.get(booking_api+'/'+ Bookingid); 

export const updatebooking =(booking,Bookingid)=> axios.put(booking_api+'/'+ Bookingid,booking); 

export const deletebyidbooking =(Bookingid)=> axios.delete(booking_api+'/'+ Bookingid); 
