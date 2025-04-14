import { connect } from "mongoose";
import dotenv from 'dotenv';


dotenv.config();
// console.log(process.env.MONGODB_URL);
connect(process.env.MONGODB_URL)
.then((res)=>console.log('mongodb connected...'))
.catch((err)=>console.log(err))