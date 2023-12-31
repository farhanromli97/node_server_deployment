import { query } from "../database/connection.js";


const users = async () => {
    try {
        await query(`CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`); 
        console.log("users table created") 
    } catch(error) {
        console.log(error);
    }
}

export default users
