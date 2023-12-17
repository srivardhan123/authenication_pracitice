import React from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

export default function Router() {
  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>

            <Route path='/' element={<div>Home</div>}>
            </Route>

            <Route path='/register' element={<Register/>} />

            <Route path='/login' element={<Login/>}>
            </Route>

            <Route path='/customer' element={<div>Customer</div>}>
            </Route>

        </Routes>

    </BrowserRouter>
  );
}
