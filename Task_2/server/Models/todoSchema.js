import { model, Schema } from "mongoose";


const todoSchema = new Schema({
    title:{
        type:String,
        required: [true, 'Title is required'],
        maxLength:[50, 'Title must not exceed 20 characters'],
        minLength:[3, 'Title must be at least 3 characters long']

    },
    desc:{
        type:String,
        required: [true, 'Desc is required'],
        maxLength:[500, 'Title must not exceed 500 characters'],
        minLength:[3, 'Desc must be at least 3 characters long']
    }
},{timestamps:true})

const todo = model('Todo', todoSchema)

export default todo