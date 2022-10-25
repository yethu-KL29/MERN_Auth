import React from 'react'
import axios from 'axios'
import { useEffect } from 'react';
import {useState }from 'react'
axios.defaults.withCredentials=true
let firstRender = true;
function Welcome() {
  const [users, setusers] = useState()


   const refreshToken=async()=>{
    const res = await axios.get('http://localhost:5000/api/refresh',{
      withCredentials:true
  }).catch((err)=>console.log(err))
   
   const data = await res.data 
   return data;
   }
 const sendRequest=async()=>{
    const res = await axios.get('http://localhost:5000/api/user',{
        withCredentials:true
    }).catch((e)=>console.log(e))
     
     const data = await res.data
     return data;
 }
useEffect(() => {
   if(firstRender){
    firstRender=false
    sendRequest().then((data)=>setusers(data.user))
   }
   let intervel=setInterval(()=>{
    refreshToken().then((data)=>setusers(data.user))
   },1000*29)
   
  return ()=>clearInterval(intervel)
}, [])

  return (
    <div>
     {users && <h1>{users.name}</h1>}
    </div>
  )
}

export default Welcome