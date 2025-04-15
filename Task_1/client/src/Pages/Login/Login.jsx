import {React, useEffect, useState } from "react"
import { Alert, Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios"
import "./Login.css"
import swal from "sweetalert"

const Login = ()=>{

    const navigate = useNavigate()

    const [form, setform] = useState({
        email: "",
        password: "",
    })

    const [showPassword, setshowPassword] = useState(false)

    const [error, seterror] = useState(null)

    const handleInputs = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleLogin = async()=>{
        const data = await axios.post("/login",{
            email:form.email,
            password:form.password
        })

        console.log(data.data);

        seterror(data.data)
        if(data.data.success){
            localStorage.setItem('user', JSON.stringify(data.data.data))
            await swal("Login Successfuly", "", "success");
            navigate("/")
        }
    }

    useEffect(()=>{
        const user = localStorage.length
        if(user > 0){
            navigate("/")
        }
    })

    console.log('',error)

    return(
        <div>
            <Box className="login-container">
                <Typography variant='h3'>Login</Typography>
                {error
                    ? <Alert severity={error.success ? "success":"warning"}>{error.mess}</Alert>
                    : null
                }
                <Box className="login-box" boxShadow={12}>
                <TextField label='Email' name='email' value={form.email} onChange={handleInputs} />
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

                <Button variant="contained" onClick={handleLogin} >Login</Button>
                <Button variant="contained" color='error' onClick={()=>navigate("/sign")} >Sign-in</Button>


                
                </Box>
            </Box>
        </div>
    )
}

export default Login