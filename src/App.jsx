import { useState } from 'react'
import './App.css'

import Navbar from './components/common/Navbar';

import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import QuizPage from './components/common/SingleQuiz';

import Signup from './pages/Signup';
import Login from './pages/Login';
import CarrerPage from './pages/CarrerPage';
// import Header from './components/common/Header';




function App() {
  return (
    <>
      <div className="w-screen min-h-screen">
      
        <Routes>
         
          <Route path="/homepage" element={<HomePage></HomePage>}></Route>
          <Route path="/carrerpage" element={<CarrerPage></CarrerPage>}></Route>

          <Route path='/profile' element={<Profile></Profile>}></Route>
          <Route path='/singleQuiz' element={<QuizPage></QuizPage>}></Route>

          <Route path='/signup' element={<Signup></Signup>}></Route>

          <Route path='/login' element={<Login></Login>}></Route>

        
        </Routes>

      </div>
    </>
  );
}

export default App;


