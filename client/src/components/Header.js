import React from 'react'
import { useState } from 'react'
import {AppBar, Tab, Toolbar, Typography,Box,Tabs} from '@mui/material'
function Header() {
    const [value, setvalue] = useState()
  return (
    <div>
      <AppBar>
       <Toolbar>
        <Typography variant='h3'>Mern_Auth </Typography>
            <Box sx={{marginLeft:"auto"}}>
            <Tabs onChange={(e,val)=>setvalue(val)} value={value} textColor='inherit'>
            <Tab label="Login"/>
            <Tab label="SignUp"/>
            </Tabs>
            </Box>
       
       </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
