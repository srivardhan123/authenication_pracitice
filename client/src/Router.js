import React,{useContext} from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import styled from "styled-components";
import AuthContext from './context/AuthContext';
import Logout from './components/auth/Logout';
import CustomerForm from './components/auth/CustomerForm';
import Customers from './components/auth/Customers';

export default function Router() {
    
  //now, to get the those context value in the compoents...
  //we use UseContext!
  const {loggedIn} = useContext(AuthContext)
  console.log(loggedIn);

  return (
    <Container>
    <BrowserRouter>
        <Navbar/>
        <Routes>
          {/* using the loggedIn context value, before login not allowing to route into customer page... */}
            {
              loggedIn===false && (<> 
                    <Route path='/register' element={<Register/>} />
                    <Route path='/login' element={<Login/>}>
                    </Route>
              </>)
            }
            {
              loggedIn===true && (<>
              <Route path='/' element={<Customers/>}></Route>
              <Route path='/customer' element={<CustomerForm/>}>
              </Route>
              <Route path='/logout' element={<Logout/>}>
              </Route> 
              </>)
            }
        </Routes>

    </BrowserRouter>
    </Container>
  );
}

const Container = styled.div`
flex-direction: column;
`
