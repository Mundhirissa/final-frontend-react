import axios from "axios";
const booking_api = 'http://localhost:8080/api/bookings';

export const Listbooking =()=> axios.get(booking_api); 

export const createbooking=(booking)=> axios.post(booking_api,booking);

export const getBookingById =(bookingId)=> axios.get(booking_api+'/'+ bookingId); 

export const updatebooking =(bookingId,booking)=> axios.put(booking_api+'/'+ bookingId,booking); 

export const deletebyidbooking =(bookingId)=> axios.delete(booking_api+'/'+ bookingId);

export const confirmBooking = (bookingId) => {
    return axios.put(`http://localhost:8080/api/bookings/${bookingId}/confirm`);
};

export const getConfirmedBookings = async () => {
    const response = await fetch('http://localhost:8080/api/bookings/confirmed');
    if (!response.ok) {
      throw new Error('Failed to fetch bookings');
    }
    return await response.json();
  };
