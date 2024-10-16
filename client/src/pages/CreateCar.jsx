import React, { useState, useEffect } from 'react';
import '../App.css';
import Colors from '../components/Colors';
import Roof from '../components/Roof';
import Wheels from '../components/Wheels';
import Interior from '../components/Interior';
import Car from '../components/Car';
import carsAPI from '../../services/api';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const CreateCar = () => {
    const [elements, setElements] = useState(1);
    const [carName, setCarName] = useState('');
    const updateCarName = useStoreActions((state) => state.updateName);
    const car = useStoreState((state) => state.car);
    const reset = useStoreActions((state) => state.resetCar);
    const navigate = useNavigate(); // Declara navigate

    useEffect(() => {
        updateCarName(carName);
    }, [carName]);

    const createCar = async (event) => {
        event.preventDefault();
        if (car.roof !== "Hardtop" && car.wheels !== "Dunlop") {
            try {
                console.log("Creating car...");
                await carsAPI.createCars(car);
                reset(); 
                navigate('/cars'); 
            } catch (error) {
                console.error("Error creating car:", error.message);
            }
        } else {
            reset();
            alert("Combo not possible!");
        }
    };

    return (
        <>
            <div className="create-car">
                <div className="create-car-options">
                    <div id="customization-options" className="car-options">
                        <div id="car-options">
                            <button onClick={() => setElements(1)}>Color</button>
                        </div>
                        <div id="car-options">
                            <button onClick={() => setElements(2)}>Roof</button>
                        </div>
                        <div id="car-options">
                            <button onClick={() => setElements(3)}>Wheels</button>
                        </div>
                        <div id="car-options" onClick={() => setElements(4)}>
                            <button>Interior</button>
                        </div>
                    </div>
                </div>
                <div className="create-car-name">
                    <form className="create-car-name">
                        <input
                            type="text"
                            id="name"
                            value={carName}
                            name="name"
                            onChange={(e) => setCarName(e.target.value)}
                            placeholder="Car name"
                        />
                        <input
                            type="submit"
                            className="create-car-button"
                            value="Create Car"
                            onClick={createCar}
                        />
                    </form>
                </div>
            </div>
            {elements === 1 && <Colors />}
            {elements === 2 && <Roof />}
            {elements === 3 && <Wheels />}
            {elements === 4 && <Interior />}
            <Car />
        </>
    );
}

export default CreateCar;
