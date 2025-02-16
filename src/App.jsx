import { useState } from 'react'
import './App.css'

import Navbar from './components/common/Navbar';
import ContactUs from './pages/ContactUs';
import { Route, Routes } from 'react-router-dom';
import RegistorPage from './pages/RegistorPage';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import QuizPage from './components/common/SingleQuiz';

import Signup from './pages/Signup';
import Login from './pages/Login';

import Todos from "./pages/Todos";


function App() {
  return (
    <>
      <div className="w-screen min-h-screen">
        <Routes>
          {/* Default route to open ContactUs */}
          <Route path="/" element={<ContactUs />} />

          {/* Other routes */}
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/register" element={<RegistorPage />} />

          <Route path="/homepage" element={<HomePage></HomePage>}></Route>

          <Route path='/profile' element={<Profile></Profile>}></Route>
          <Route path='/singleQuiz' element={<QuizPage></QuizPage>}></Route>

          <Route path='/signup' element={<Signup></Signup>}></Route>

          <Route path='/login' element={<Login></Login>}></Route>

          <Route path="/todos" element={<Todos></Todos>}></Route>

        </Routes>

      </div>
    </>
  );
}

export default App;


