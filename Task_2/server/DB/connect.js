import { connect } from "mongoose";

connect("mongodb://localhost:27017/TMBILL")
.then((res)=>console.log('mongodb connected...'))
.catch((err)=>console.log(err))