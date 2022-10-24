
import { Button } from '@mui/material'
import React from 'react'
import './style.css';
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function SignUp() {
    const history = useNavigate();
    const [input, setinput] = useState({
        name:'',
        email:'',
        password:''
    })
    const handleChange=(e)=>{
        setinput(prev=>({
            ...prev,
            [e.target.name]:[e.target.value]
        }))
    }
    const handleSubmit=(e)=>{
       e.preventDefault();
       console.log(input)
       sendRequest().then(()=>history("/login"))
    }
    const sendRequest=async()=>{
        const res = await axios.post('http://localhost:5000/api/signup',{
            name:String(input.name),
            email:String(input.email),
            password:String(input.password)
        }).catch((e)=>console.log("Hiii"))
        const data = res.data;
        return data
    }
  return (
    <div >
        <h1 className='sign'>SignUp</h1>
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input onChange={handleChange} type="name" name="name" placeholder='Name' value={input.name}/>
            <label>Email:</label>
            <input onChange={handleChange} type="email" name="email"  placeholder='Email'value={input.email}/>
            <label>Password:</label>
            <input onChange={handleChange} type="password" name="password"  placeholder='password' value={input.password}/>
           <Button variant='contained' type='submit'>Submit</Button>
        </form>
    </div>
  )
}

export default SignUp