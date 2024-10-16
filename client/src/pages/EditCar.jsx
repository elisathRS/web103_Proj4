import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import carsAPI from '../../services/api';
import '../css/EditCar.css';

const basePrice = 25000;
const additionalCosts = {
    wheels: {
        Falken: 500,
        Bridgestone: 800,
        Dunlop: 700,
        Goodyear: 650,
        Pirelli: 1000,
    },
    roof: {
        Adventurer: 1000,
        Camper: 1500,
        Convertible: 2000,
        Hardtop: 1200,
        Sunroof: 1800,
        TargaTop: 2200,
    },
    color: {
        Black: 0,
        Blue: 200,
        Green: 300,
        Purple: 400,
        Red: 500,
    },
};

const EditCar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        price: basePrice,
        description: '',
        image: '',
        wheels: '',
        roof: '',
        color: '',
        interior: '',
    });
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const data = await carsAPI.getCarsById(id);
                console.log("Fetched car details:", data);
                setFormData({
                    ...data,
                    price: basePrice + calculatePrice(data.wheels, data.roof, data.color),
                });
            } catch (error) {
                console.error("Error fetching car details:", error);
                setError("Error fetching car details. Please try again.");
            }
        };
        fetchCarDetails();
    }, [id]);

    const calculatePrice = (wheels, roof, color) => {
        const wheelsCost = additionalCosts.wheels[wheels] || 0;
        const roofCost = additionalCosts.roof[roof] || 0;
        const colorCost = additionalCosts.color[color] || 0;
        return wheelsCost + roofCost + colorCost;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const updatedData = {
                ...prevData,
                [name]: value,
            };
            const newPrice = basePrice + calculatePrice(updatedData.wheels, updatedData.roof, updatedData.color);
            return { ...updatedData, price: newPrice };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            await carsAPI.updateCars(id, formData);
            navigate(`/customcars/${id}`);
        } catch (error) {
            console.error("Error updating car:", error);
            setError("Error updating car. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!formData.name) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: '#fff', padding: '20px', margin: '20px' }}>
            <h2>Edit Car</h2>
            {error && (
                <div className="error">
                    <p>{error}</p>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        readOnly
                    />
                </div>
                <div>
                    <label htmlFor="wheels">Wheels:</label>
                    <select
                        id="wheels"
                        name="wheels"
                        value={formData.wheels}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Wheels</option>
                        <option value="Falken">Falken</option>
                        <option value="Bridgestone">Bridgestone</option>
                        <option value="Dunlop">Dunlop</option>
                        <option value="Goodyear">Goodyear</option>
                        <option value="Pirelli">Pirelli</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="roof">Roof:</label>
                    <select
                        id="roof"
                        name="roof"
                        value={formData.roof}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Roof Type</option>
                        <option value="Adventurer">Adventurer</option>
                        <option value="Camper">Camper</option>
                        <option value="Convertible">Convertible</option>
                        <option value="Hardtop">Hardtop</option>
                        <option value="Sunroof">Sunroof</option>
                        <option value="Targa top">Targa top</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="color">Color:</label>
                    <select
                        id="color"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Color</option>
                        <option value="Black">Black</option>
                        <option value="Blue">Blue</option>
                        <option value="Green">Green</option>
                        <option value="Purple">Purple</option>
                        <option value="Red">Red</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="interior">Interior:</label>
                    <select
                        id="interior"
                        name="interior"
                        value={formData.interior}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Interior Color</option>
                        <option value="Mocha">Mocha</option>
                        <option value="Red">Red</option>
                        <option value="Black">Black</option>
                        <option value="White">White</option>
                        <option value="Purple">Purple</option>
                    </select>
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Updating...' : 'Update Car'}
                </button>
            </form>
        </div>
    );
};

export default EditCar;
