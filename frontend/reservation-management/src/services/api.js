import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8081/api',
});

export const saveGuest = (guestData) => api.post('/v1/guest/saveguest', guestData);
export const saveReservation = (reservationData) => api.post('/reservations', reservationData);
export const findGuestByPhoneNumber = (phoneNumber) => api.get(`/v1/guest/findGuestByPhoneNumber/${phoneNumber}`);

export default api;
