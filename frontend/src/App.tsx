import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import LoginPage from './pages/Login/Login';


const BACK_END_POINT = "http://localhost:3001";

export const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/login' element={<LoginPage backEndPoint={BACK_END_POINT}/>}/>
        <Route path="/home" element={<Home backEndPoint={BACK_END_POINT}/>} />
        <Route path="/" element={<LoginPage backEndPoint={BACK_END_POINT}/>}/>
      </Routes>
    </div>
  )
};

export default App;
