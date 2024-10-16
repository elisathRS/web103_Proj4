import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import carsAPI from '../../services/api';
import '../css/CarDetails.css';

const CarDetails = () => {
    const [car, setCar] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const carData = await carsAPI.getCarsById(id);
                setCar(carData);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCarData();
    }, [id]);

    const deleteCar = async () => {    
        try {
            await carsAPI.deleteCars(id);
            navigate('/cars'); 
        } catch (error) {
            setError(`Failed to delete car: ${error.message}`);
        }     
    }

    const handleEdit = () => {
        navigate(`/edit/${car.id}`); // Navigate to edit page
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!car) {
        return <p>Car not found</p>;
    }

    return (
        <div className="detailsWrapper">
            <article className="carFullDetails">
               <h2>{car.name}</h2> 
                <div className="detailsContent">
                    <p>Color: {car.color}</p>
                    <p>Roof: {car.roof}</p>
                    <p>Wheels: {car.wheels}</p>
                    <p>Interior: {car.interior}</p>
                    <p>Price: ${car.price}</p>    
                </div>
                <button className="editCarButton" onClick={handleEdit}>Edit</button>
                <button className="deleteCarButton" onClick={deleteCar}>Delete</button>
            </article>
        </div>
    )
}

export default CarDetails;

