import './App.css';
import Header from './components/Header';
import { Routes,Route } from 'react-router-dom';
import Login from './components/Login';
import React from 'react';
import SignUp from './components/SignUp'
import Welcome from './components/Welcome';
import { useSelector } from 'react-redux';
function App() {
  const isLoggedIn = useSelector(state=>state.isLoggedIn);
  console.log(isLoggedIn)
  return (
    <React.Fragment>
    <div className="App">
     <Header/>

     <Routes>
      <Route path="/login" element = {<Login/>}></Route>
     <Route path="/signup" element = {<SignUp/>}></Route>
     <Route path="/user" element = {<Welcome/>}></Route>
     </Routes>

    </div>
    </React.Fragment>
  );
}

export default App;
