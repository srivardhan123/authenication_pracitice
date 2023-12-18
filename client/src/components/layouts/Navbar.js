import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Logout from "../auth/Logout";

export default function Navbar(){
  //now, to get the those context value in the compoents...
  //we use UseContext!

  const {loggedIn} = useContext(AuthContext)
  console.log(loggedIn);
    return (
        <>
           <Nav>

                {loggedIn===false && (
                  <>
                <NavLink 
                  to="/register"
                  activestyle={{ color: 'black' }}
                >
                    Register
                </NavLink>

                <NavLink 
                  to="/login" 
                  activestyle={{ color: 'black' }}
                >
                    Login
                </NavLink>

                  </>
                )}

                {loggedIn===true && 
                  <>
                <NavLink 
                  to="/"
                  activestyle={{ color:'black' }}
                >
                    Home
                {/* now here if it is not loggedIn only..then we render register and login page! */}
                </NavLink>
                    <NavLink to='/customer'>Customer</NavLink>
                    <Logout/>
                  </>
                }
           </Nav> 
        </>
    );
};

const Nav = styled.nav`
    background: #131324;
    /* height: 85px; */
    height:85px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem calc((100vw - 1000px) / 2);
    z-index: 12;
    margin-right: -24px;
`;

const NavLink = styled(Link)`
color: #fff;
display: flex;
align-items: center;
text-decoration-line:underline;
padding: 0 1rem;
height: 100%;
font-size: 1.5rem;
cursor: pointer;
&:hover {
  color: red;
}
`;

