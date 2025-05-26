import mongoose from 'mongoose'
import config from '../config/config.js'
import dotenv from 'dotenv'

dotenv.config()

const connectionString=config.mongo_uri

const dbConnect=async()=>{
    try {
        const conn=await mongoose.connect(connectionString)
        console.log(`Connected to MongoDB ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

export default dbConnect