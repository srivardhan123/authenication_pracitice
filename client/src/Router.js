import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import styled from "styled-components";
import Logout from './components/auth/Logout';
import CustomerForm from './components/auth/CustomerForm';
import Customers from './components/auth/Customers';

export default function Router() {
  return(
    <Container>
    <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register/>} />
          <Route path='/' element={<Login/>}>
          </Route>
          <Route path='/home' element={<Customers/>}></Route>
          <Route path='/customer' element={<CustomerForm/>}>
          </Route>
          <Route path='/logout' element={<Logout/>}>
          </Route> 
        </Routes>
    </BrowserRouter>
    </Container>
    )
}

const Container = styled.div`
flex-direction: column;
`
