import { useState } from 'react'
import './App.css'

import Navbar from './components/common/Navbar';
import ContactUs from './pages/ContactUs';
import { Route, Routes } from 'react-router-dom';
import RegistorPage from './pages/RegistorPage';

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
        </Routes>
      </div>
    </>
  );
}

export default App;


