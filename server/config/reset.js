import "./dotenv.js"
import { pool } from "./database.js"
import carData from "../data/cars.js"

const createCarsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS cars;

    CREATE TABLE cars (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) ,
        color VARCHAR(255) ,
        roof VARCHAR(255) ,
        wheels VARCHAR(255) ,
        interior VARCHAR(255),
        price INT ,
      );
  `

  try {
    const res = await pool.query(createTableQuery)
    console.log("🎉 cars table created successfully")
  } catch (err) {
    console.error("⚠️ error creating cars table", err)
  }
}


const seedTables = async () => {
  await createCarsTable()

  carData.forEach((cars) => {
    const insertQuery = {
      text: "INSERT INTO cars (  name, color, roof, wheels,interior,price) VALUES ($1, $2, $3, $4,$5,$6)",
    }

    const values = [
        cars.name,
        cars.color,
        cars.roof,
        cars.wheels,
        cars.interior,
        cars.price,
    ]

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting location", err)
        return
      }
      console.log(`✅ ${cars.name} added successfully`)
    })
  })

}

seedTables()
