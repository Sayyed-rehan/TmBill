import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from 'react-router'
import "./Home.css"
import swal from "sweetalert"
const Home = () => {

    const navigate = useNavigate()

    const [data, setData] = useState(null)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) || null
        
        if (user) {
            setData(user)
        } else {
            navigate("/login")
        }
    }, [])

    const handleLogout = async () => {
        localStorage.removeItem('user')
        await swal("Logout Successfuly", "", "success");
        navigate("/login")
    }



    return (
        <div>
            <Box className="home-container">
                <Typography variant='h4' color='primary'>Hello <strong>{data?.name} </strong>
                </Typography>
                <Typography variant='h5' color='primary'> {data?.email}</Typography>
                <Typography variant='h6' color='info'> {data?.contact}</Typography>
                <Button variant='contained' color='error' onClick={handleLogout} >Logout</Button>
            </Box>
        </div>
    )
}

export default Home