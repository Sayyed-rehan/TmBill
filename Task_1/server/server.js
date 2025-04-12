import express from "express"
const app = express()
import "./db/connect.js"
import User from "./Models/userSchema.js"
import bcrypt from "bcryptjs"
import cors from "cors"

app.use(express.json())
app.use(cors())


app.get("/", async (req, res) => {
    const data = await User.find()

    res.send(data)
})

//? sign in
app.post("/sign", async (req, res) => {
    const { name, email, password, contact } = req.body

    //! if(password.length < 5){
    //     throw ne
    // }
    const hashpassword = await bcrypt.hash(password, 12)
    try {
        const data = User({ name, email, contact, password: hashpassword })
        if(password.length<3){
            throw new Error('Password must be at least 3 characters long')
        }
        await data.save();
        res.json({
            success: true,
            mess: "Sign succesfully",
            data: data
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            mess: error?.message
        })
    }
})


//? login
app.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const emailExits = await User.findOne({ email: email })
        if (!emailExits) {
            throw new Error('Invalid Credentails')
        }
        const passwordExits = await bcrypt.compare(password, emailExits.password)

        if (emailExits && passwordExits) {
            res.json({
                success: true,
                mess: 'Login successfully',
                data:emailExits
            })
        } else {
            throw new Error('Invalid Credentails')
        }

    } catch (error) {
        res.json({
            success: false,
            mess: error?.message
        })
    }
})


app.listen('5000', () => {
    console.log('server started at 5000');
})