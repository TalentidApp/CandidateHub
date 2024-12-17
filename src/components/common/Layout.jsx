import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'; // Outlet is used to render child routes

import FooterSection from './FooterSection';

import Navbar from './Navbar';

const Layout = () => {

    return (
        <div className="flex min-h-screen w-screen bg-gray-100">

            <div className=' relative w-11/12 h-full'>

                <Navbar></Navbar>
                {/* Dashboard or Child Routes */}
                <div className="h-full w-full shadow-xl bg-white rounded-xl p-4">
                    <Outlet /> {/* This will render the matched route's component */}
                </div>

                <FooterSection></FooterSection>
                
            </div>

        </div>
    );
};

export default Layout;
