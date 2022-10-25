import React from 'react'
import { useState } from 'react'
import {AppBar, Tab, Toolbar, Typography,Box,Tabs} from '@mui/material'
import {Link }from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { authActions } from '../store'

axios.defaults.withCredentials=true
function Header() {
  const dispatch = useDispatch()
    const [value, setvalue] = useState()
    const isLoggedIn =useSelector(state=>state.isLoggedIn)
    console.log("i am ",isLoggedIn)
    const sendRequest=async()=>{
      const res = await axios.get("http://localhost:5000/api/user",{
        withCredentials:true
      }).catch(e=>console.log("i am not working"))
      return res.data
    }
    const handleLogout=()=>{
       sendRequest().then(()=>dispatch(authActions.logout()))
    }
  return (
    <div>
      <AppBar position='sticky'>
       <Toolbar>
        <Typography variant='h3'>Mern_Auth </Typography>
            <Box sx={{marginLeft:"auto"}}>
            <Tabs 
             indicatorColor='secondary'
            onChange={(e,val)=>setvalue(val)}
             value={value} 
             textColor='inherit'>

            <Tab to="/login" LinkComponent={Link}  label="Login"></Tab>
            <Tab to="/signup" LinkComponent={Link}  label="SignUp"/>
        { isLoggedIn &&  <Tab onClick={handleLogout} to="/login" LinkComponent={Link}  label="Logout"/>}
            </Tabs>
            </Box>
       
       </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
