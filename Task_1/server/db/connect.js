import { connect, set } from "mongoose"
import dotenv from 'dotenv';


dotenv.config();
connect(process.env.MONGODB_URL)
.then((res)=>console.log('mongodb connected...'))
.catch((err)=>console.log(err))