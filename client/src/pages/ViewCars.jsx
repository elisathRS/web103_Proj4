import React, { useState, useEffect } from 'react';
import '../css/ViewCars.css';
import { Link } from 'react-router-dom';
import carsAPI from '../../services/api';

const ViewCars = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const carsData = await carsAPI.getAllCars();
                setCars(carsData);
            }
            catch (error) {
                console.error(error);
            }
        }) ()
    }, []);

    const priceafterTax = (originalPrice) => {
        return originalPrice + (originalPrice *  0.08);
    };

    return (
        <div className="cars-holder">
            {cars.map((car, index) => (
                <article key={index}>
                    <header>{car.name}</header>
                    <div className="ccard">
                        <p>{car.description}</p>
                        <div className='car-price'>
                            <p>Color: {car.color}</p>
                            <p>Roof: {car.roof}</p>
                            <p>Wheels: {car.wheels}</p>
                            <p>Interior: {car.interior}</p>
                            <p>Price: ${car.price}</p>
                            <Link className="view-btn" to={`/customcars/${car.id}`}>Details</Link>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    )
}

export default ViewCars;