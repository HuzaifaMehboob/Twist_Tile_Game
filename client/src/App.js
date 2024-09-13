import React,{useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import classes from './App.module.css';
import Menu from './Pages/Menu';
import Play from './Pages/Play';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Scoreboard from './Pages/Scoreboard';

const App = () => {
  return (
    <div className={classes.main}>
        <ToastContainer/>  {/* You can adjust the position */}
      <BrowserRouter>
        {/* ToastContainer initialization */}
        
        <Routes>
          <Route path='/' element={<Menu />} />
          <Route path='/play' element={<Play  />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/Scoreboard' element={<Scoreboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
