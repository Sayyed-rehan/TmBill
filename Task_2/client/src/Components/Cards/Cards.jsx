import React from 'react'
import { Box, Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material"
import "./Cards.css"
import axios from "axios"
import swal from "sweetalert"
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';



const Cards = (props) => {

    const handleDelete = async () => {
        await swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    const data = await axios.delete(`/delete/${props.data._id}`)
                    swal("Poof! Your Task has been deleted!", {
                        icon: "success",
                    });
                    props.handleNeedToRefresh()
                } else {
                    swal("Your Task is safe!");
                }
            });

    }

    const handleUpdate = () => {
        props.toBeUpdated(props.data)
    }
    return (
        <div>
            <Card className='card' sx={{ boxShadow: '10' }}>
                <CardContent >

                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: '10px', textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', gap: "7px" }}>
                        <FlagCircleIcon sx={{ color: '#fbc02d', fontSize: "35px" }} />
                        {props.data.title}
                    </Typography>

                    <Typography variant="body2" color='gray' >{props.data.desc}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent:"space-around"}}>
                    <Button variant='outlined' size='medium' color='error' onClick={handleDelete} endIcon={<DeleteIcon />}>
                        Delete
                    </Button>

                    <Button onClick={handleUpdate} variant='outlined' color='primary' size='medium' endIcon={<ChangeCircleIcon />}>Update</Button>

                </CardActions>
            </Card>
        </div>
    )
}

export default Cards