import { connect, set } from "mongoose"
import dotenv from 'dotenv';


dotenv.config();
// set('strictQuery', false);
console.log(process.env.MONGODB_URL);
connect(process.env.MONGODB_URL)
.then((res)=>console.log('mongodb connected...'))
.catch((err)=>console.log(err))