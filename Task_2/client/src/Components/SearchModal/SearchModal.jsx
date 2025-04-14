import { React, useState } from 'react'
import "./SearchModal.css"
import { Alert, Box, Button, TextField, Typography } from "@mui/material"
import axios from "axios"
import swal from "sweetalert"




const SearchModal = (props) => {

    const [task, settask] = useState({
        title: props?.updateData?.title || "",
        desc: props?.updateData?.desc || ""
    })

    // console.log(props?.updateData);
    const [error, seterror] = useState(null)

    const handleTaskInput = (e) => {
        settask({ ...task, [e.target.name]: e.target.value })
    }

    const handleAddTask = async () => {
        const data = await axios.post("/create", {
            title: task.title,
            desc: task.desc
        })

        console.log(data.data)

        if (data.data.success) {
            props.handleNeedToRefresh()
            props.handleCloseModal()
            swal("Task Added Successfuly","" ,"success");
        } else {
            seterror(data.data.mess)
        }

    }

    const handleUpdateTask = async () => {

        if(!task.title || !task.desc){
            seterror("Cannot be Emplty")
            return
        }

        const data = await axios.patch(`/update/${props.updateData._id}`, {
            title: task.title,
            desc: task.desc
        })

        console.log(data.data)

        if (data.data.success) {
            props.handleNeedToRefresh()
            props.handleCloseModal()
            swal("Task Updated Successfuly","" ,"success");

        } else {
            seterror(data.data.mess)
        }


    }

    return (
        <Box className="modal-box">


            <Box className='modal-container' boxShadow={12}>
                <Typography variant='h4'>{!props?.updateData?.title ? 'Add task' : 'Update Task'}</Typography>
                {error
                    ? <Alert severity="warning">{error}</Alert>
                    : null}
                <Box className="modal-inputs">
                    <TextField label='Add title here...' name='title' value={task.title} onChange={handleTaskInput} />
                    <TextField label='Add Description here...'
                        name='desc' multiline rows={3}
                        value={task.desc} onChange={handleTaskInput} />
                </Box>

                <Button onClick={!props?.updateData?.title ? handleAddTask : handleUpdateTask} variant='contained'>
                    {!props?.updateData?.title ? 'Add task' : 'Update Task'}
                </Button>
            </Box>
        </Box>

    )
}

export default SearchModal