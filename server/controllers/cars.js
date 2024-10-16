import { pool } from "../config/database.js";

const executeQuery = async (query, params) => {
    try {
      const results = await pool.query(query, params);
      return { data: results.rows };
    } catch (error) {
      console.error('Database query error:', error);
      return { error: error.message };
    }
  };

const getCars = async (req, res) => {
    const result = await executeQuery("SELECT * FROM cars ORDER BY id ASC");
    result.error ? res.status(409).json({ error: result.error }) : res.status(200).json(result.data);
  };

const getCarsbyId = async (req,res ) => {
    const selectQuery = `
        SELECT id, name, color, roof, wheels,interior,price
        FROM cars
        WHERE id=$1
    `;
    const carId = req.params.carId;
    const result = await executeQuery(selectQuery, [carId]);
    result.error ? res.status(409).json({ error: result.error }) : res.status(200).json(result.data[0]);
}

const createCars = async (req, res) => {
    const { name, color, roof, wheels,interior,price } = req.body
    console.log(req.body)
    try{
        const results = await pool.query(`
    INSERT INTO cars ( name, color, roof, wheels,interior,price)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [name, color, roof, wheels,interior,price]
    )
    res.status(201).json(results.rows[0])
    } catch (err) {
        res.status(409).json({ error: err.message })
    }
} 

const updateCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, price, wheels, interior } = req.body;   
        const results = await pool.query('UPDATE cars SET name = $1, price = $2, wheels = $3, interior = $4 WHERE id = $5 RETURNING *', [name, price, wheels, interior, id]);
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const deleteCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await pool.query("DELETE FROM cars WHERE id = $1", [id]);
        res.status(200).json({ message: 'Car deleted successfully.' });
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

export default {
    getCars,
    getCarsbyId,
    createCars,
    updateCar,
    deleteCar
  };