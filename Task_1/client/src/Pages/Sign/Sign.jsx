import { React, useState } from 'react'
import { Alert, Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useNavigate } from "react-router"
import "./Sign.css"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useEffect } from 'react'
import swal from 'sweetalert'

const Sign = () => {

    const navigate = useNavigate()

    const [form, setform] = useState({
        name: "",
        email: "",
        contact: "",
        password: "",
    })

    const [showPassword, setshowPassword] = useState(false)

    const [error, seterror] = useState(null)

    const handleInputs = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSign = async () => {
        const data = await axios.post('/sign', {
            name: form.name,
            contact: form.contact,
            email: form.email,
            password: form.password
        })

        console.log(data.data)
        if (data.data.success) {
            await swal("Sign-in Successfuly", "", "success");
            navigate("/login")
        } else {
            seterror(data.data.mess)
        }
    }

    console.log(error)


    useEffect(()=>{
        const user = localStorage.length
        if(user > 0){
            navigate("/")
        }
    })



    return (
        <div>
            <Box className="sign-container">
                <Typography variant='h3'>Sign-in</Typography>
                {error
                    ? <Alert severity="warning">{error}</Alert>
                    : null}
                <Box className="sign-box" boxShadow={12}>
                    <TextField label='Name' name='name' value={form.name} onChange={handleInputs} />
                    <TextField label='Email' name='email' value={form.email} onChange={handleInputs} />

                    <TextField label='Contact' name='contact' value={form.contact} onChange={handleInputs} />

                    <TextField label='Password' name='password' value={form.password} onChange={handleInputs}
                    type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={()=>setshowPassword(!showPassword)} >
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button variant="contained" onClick={handleSign} >Sign-in</Button>
                    <Button variant="contained" color='error' onClick={()=>navigate("/login")} >Have Account</Button>
                </Box>
            </Box>
        </div>
    )
}

export default Sign