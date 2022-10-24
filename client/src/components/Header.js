import React from 'react'
import { useState } from 'react'
import {AppBar, Tab, Toolbar, Typography,Box,Tabs} from '@mui/material'
import {Link }from 'react-router-dom'
function Header() {
    const [value, setvalue] = useState()
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
            </Tabs>
            </Box>
       
       </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
