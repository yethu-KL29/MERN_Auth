import React from 'react'
import axios from 'axios'
import { useEffect } from 'react';
import {useState }from 'react'
// axios.defaults.withCredentials=true

function Welcome() {
  const [users, setusers] = useState()

 const sendRequest=async()=>{
    const res = await axios.get('http://localhost:5000/api/user',{
        // withCredentials:true
    }).catch(e=>console.log(e))
     
     const datas = await res.data
     return datas;
 }
useEffect(() => {
   
    sendRequest().then((datas)=>setusers(datas.user))

  
}, [])

  return (
    <div>
     {users && <h1>{users.name}</h1>}
    </div>
  )
}

export default Welcome