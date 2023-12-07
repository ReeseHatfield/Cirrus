import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/Login';


const BACK_END_POINT = "http://localhost:3001";

export const App = () => {

  return (
    <Routes>
      <Route path='/login' element={<LoginPage backEndPoint={BACK_END_POINT}/>}/>
      <Route path="/home" element={<Home backEndPoint={BACK_END_POINT}/>} />
      <Route path="/" element={<LoginPage backEndPoint={BACK_END_POINT}/>}/>
    </Routes>
  )
};

export default App;
