import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
const {
    DB_HOST,
    DB_DATABASE,
    DB_DATABASE_TEST,
    DB_USER,
    DB_PASS,
    ENV,
} = process.env 

const client = new Pool({
    host: DB_HOST,
    database: ENV === 'dev' ? DB_DATABASE : DB_DATABASE_TEST,
    user: DB_USER,
    password: DB_PASS,
})

export default client