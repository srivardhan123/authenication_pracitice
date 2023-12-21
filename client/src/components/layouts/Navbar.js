import React, { useContext,useEffect } from "react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Logout from "../auth/Logout";
import {useNavigate} from "react-router-dom";
export default function Navbar(){

  //now, to get the those context value in the compoents...
  //we use UseContext!
  const {loggedIn,getloggedIn} = useContext(AuthContext)
  const navigate = useNavigate();

  const newuser = () => {
      navigate("/customer");
  };  
  useEffect(() => {
    getloggedIn();
},[]);

    return (
        <>
           <Nav>
                {loggedIn===true && 
                  <>
                <NavLink 
                  to="/home"
                >
                    Customers
                </NavLink>
                    <NavBtn> 
                     <NavBtnLink onClick={newuser}>Add New Customer</NavBtnLink> 
                 </NavBtn> 
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

const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavBtnLink = styled.nav`
  border-radius: 4px;
  background: transparent;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: 1px solid #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #808080;
  }
`;