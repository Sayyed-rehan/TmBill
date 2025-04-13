import express from "express";
const app = express()
import "./DB/connect.js"
import todo from "./Models/todoSchema.js"
import cors from "cors"


app.use(express.json())
app.use(cors())

app.get("/", async (req, res) => {
    const data = await todo.find()
    res.send(data)
})

//create
app.post("/create", async (req, res) => {
    const { title, desc } = req.body

    try {
        const data = todo({ title, desc })
        await data.save()

        res.json({
            success: true,
            mess: "list created",
            data: data
        })
    } catch (error) {
        res.json({
            success: false,
            mess: error?.message,
        })
    }
})



//read
app.get("/read", async (req, res) => {

    let { title, desc } = req.query
    console.log(title, desc)

    title = title || '[A-Za-z0-9]'
    desc = desc || '[A-Za-z0-9]'
    console.log(title, desc)

    try {
        const data = await todo.find({
            title: { $regex: title, $options: 'i' },
            desc: { $regex: desc, $options: 'i' },
        }).sort({updatedAt:-1})




        res.json({
            success: true,
            mess: "Fetched data successfully",
            count: data.length,
            data: data
        })
    } catch (error) {
        res.json({
            success: true,
            mess: error
        })
    }
})




//update
app.patch("/update/:id", async (req, res) => {

    const { title, desc } = req.body
    const { id } = req.params

    console.log(id, title, desc)

    try {
        
        const data = await todo.findByIdAndUpdate({ _id: id }, req.body)

        res.json({
            success: true,
            mess: "Task Updated Successfully"
        })
    } catch (error) {

        res.json({
            success: false,
            mess: error
        })
    }
})


//delete
app.delete("/delete/:id", async(req,res)=>{
    const{id} = req.params

    try {
        const data = await todo.findByIdAndDelete({_id:id})

        res.json({
            success:true,
            mess:"task deleted Successfully"
        })
    } catch (error) {
        res.json({
            success:false,
            mess:error
        })
    }
})




app.listen(5000, () => {
    console.log("Server started at 5000...");
})

