import { Button } from '@mui/material'
import React from 'react'
import './style.css';
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';

function Login() {
    const history = useNavigate();
    const dispatch=useDispatch()
    const [input, setinput] = useState({
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
       sendRequest().then(()=>dispatch(authActions.login())).then(()=>history("/user"))
    }
    const sendRequest=async()=>{
        const res = await axios.post('http://localhost:5000/api/login',{
            email:input.email,
            password:String(input.password)
        }).catch((e)=>console.log(e))
        const data = res.data;
        return data
    }
  return (
    <div >
        <h1 className='sign'>Login</h1>
        <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input onChange={handleChange} type="email" name="email"  placeholder='Email'value={input.email}/>
            <label>Password:</label>
            <input onChange={handleChange} type="password" name="password"  placeholder='password' value={input.password}/>
           <Button variant='contained' type='submit'>Submit</Button>
        </form>
    </div>
  )
}

export default Login