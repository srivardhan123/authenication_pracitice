import React from 'react'
import AuthContext from '../../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import styled from 'styled-components';

export default function Logout() {

  const {getloggedIn} = useContext(AuthContext);
  const navigate = useNavigate();

  async function logOut()
  {
    await axios.get('http://localhost:5001/auth/logout');
    await getloggedIn();
    navigate("/login");
  }
  return (
    <>
                <NavBtn> 
                     <NavBtnLink onClick={logOut}>LogOut</NavBtnLink> 
                 </NavBtn> 
    </>
  )
}
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