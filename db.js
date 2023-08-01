import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbconnection = mongoose.connect(process.env.URL).then(()=>{
    console.log('Connection successful');
}).catch((err)=>{
    console.log('Failed to connect' + err);
})

export default dbconnection;