import express from "express";
import EventsController from "../controllers/cars.js";

const router = express.Router();

router.get('/', EventsController.getCars);
router.get('/:carId', EventsController.getCarsbyId);
router.post('/', EventsController.createCars)
router.patch('/:id', EventsController.updateCar);
router.delete('/:id', EventsController.deleteCar);

export default router