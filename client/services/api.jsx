
import { request } from './apiReq'

const cars = 'http://localhost:3001/cars'

const getAllCars = () => request('GET', cars);
const getCarsById = (id) => request('GET', `${cars}/${id}`);
const createCars = (car) => request('POST', cars, car);
const updateCars  = (id,car) => request('PATCH', `${cars}/${id}`, car);
const deleteCars = (id) => request('DELETE', `${cars}/${id}`);

export default {
    getAllCars,
    getCarsById,
    createCars,
    updateCars,
    deleteCars
}