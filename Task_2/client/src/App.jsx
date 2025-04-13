import { React, useState, useEffect } from 'react'
import { Box, IconButton, TextField, Typography, Modal, Fab } from "@mui/material"
import axios from 'axios'
import Cards from './Components/Cards/Cards'
import "./App.css"
import AddIcon from '@mui/icons-material/Add';
import SearchModal from './Components/SearchModal/SearchModal'


const App = () => {

  const [search_param, setsearch_param] = useState({
    title: "",
    desc: ""
  })
  // console.log(search_param);

  const [Data, setData] = useState()

  const [open, setopen] = useState(false)

  const [updateData, setupdateData] = useState(null)

  const [needToRefresh, setneedToRefresh] = useState(false)

  const handleInputs = (e) => {
    setsearch_param({ title: e.target.value, desc: e.target.value })
  }

  const handleCloseModal = ()=>{
    setopen(false)
    setupdateData(null)
  }

  const toBeUpdated = (data)=>{
    console.log('this data need to update',data);
    setupdateData(data)
    setopen(true)
  }

  const handleNeedToRefresh = ()=>{
    setneedToRefresh(!needToRefresh)
  }


  useEffect(() => {

    console.log('I am called');
    const fetchData = async () => {
      const data = await axios.get(`http://localhost:5000/read?title=${search_param.title}`)
      console.log(data.data);

      if (data.data.success) {
        setData(data.data.data)
      }
    }

    fetchData()
  }, [search_param, needToRefresh])

  return (
    <Box className="home-container">
      <Typography variant='h4' color='primary' fontWeight='bold'>To-Do  Application</Typography>
      <Box className='search-area'>
        <Box className="search-bar">
          <TextField label='Search Task here...' fullWidth value={search_param.title} onChange={handleInputs} />
        </Box>
        <IconButton onClick={()=>setopen(true)}>
        {/* <Fab color="primary" aria-label="add"> */}
          <AddIcon fontSize='large' color='success' />
        {/* </Fab> */}
        </IconButton>
        <Modal open={open} onClose={handleCloseModal}>
          <SearchModal 
            handleCloseModal={handleCloseModal}
            updateData={updateData}
            handleNeedToRefresh={handleNeedToRefresh}
          />
        </Modal>
      </Box>
      <Box className="card-container">
        {
          Data && Data.length > 0
            ? Data.map((item, index) => {
              return <Cards key={item._id}
                data={item}
                toBeUpdated={toBeUpdated}
                handleNeedToRefresh={handleNeedToRefresh}
              />
            })

            : <Typography variant='h4'>Sorry Cannot find</Typography>
        }
      </Box>
    </Box>
  )
}

export default App