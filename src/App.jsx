import { useState } from 'react'
import './App.css'

import Navbar from './components/common/Navbar';

import ContactUs from './pages/ContactUs';

import { Route,Routes } from 'react-router-dom';
import RegistorPage from './pages/RegistorPage';

function App() {


  return (
    <>

      <div className='w-screen min-h-screen'>

        <Routes>
          
            <Route path='/contactUs' element={<ContactUs></ContactUs>}></Route>
            <Route path='/register'  element={<RegistorPage></RegistorPage>}></Route>


        </Routes>

      </div>
    </>
  )
}

export default App
