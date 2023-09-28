import pg from 'pg';
import users from '../model/user.model.js';
const {Pool}  = pg;
import 'dotenv/config'

// console log from .env file
console.log("FROM ENV", process.env.DB_HOST)

// establish connection
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export const dbInit = async()=>{
    try {
        const data = await pool.query("SELECT NOW()")
        console.log("Database connected", data.rows[0].now)
        await users()
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

export const query = async (text, params) => {
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('executed query', { text, duration, rows: res.rowCount })
    return res
}