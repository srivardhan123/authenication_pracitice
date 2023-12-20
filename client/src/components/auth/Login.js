import React, { useContext, useState,useEffect } from 'react'
import axios from 'axios';
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import {Link,useNavigate } from "react-router-dom";
import AuthContext from '../../context/AuthContext';


export default function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const {loggedIn,getloggedIn} = useContext(AuthContext);
  const navigate = useNavigate();

  async function login(e)
  {
    //we use below preventDefault function because when we submit the form, it reloads and all the data will loose!
    //so to store the input info we use it!
     e.preventDefault();
     try{
          const loginData  = {
            email,
            password
          }
          await axios.post("http://localhost:5001/auth/login",loginData);
          await getloggedIn();
          console.log("hello");
          navigate("/home");
     }catch(err)
     {
        console.error(err);
     }
  }
  useEffect(() => {
      getloggedIn();
      // console.log(loggedIn);
      if(loggedIn===true)
      {
          navigate("/home");
      }
  },[]);

    return (
        <>
            <FormContainer>
                <form onSubmit = {login} >
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h1>Login</h1>
                    </div>
                    <input
                        type = "email"
                        placeholder = "Email"
                        onChange = {(e) => setEmail(e.target.value)}
                        value = {email}
                     />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        onChange = {(e) => setPassword(e.target.value)} 
                        value = {password}
                    />
                    <button type="submit"> Login </button>
                    <span>
                        Don't have an account ? <Link to="/register">Create One.</Link>
                    </span>
                </form>
                
            </FormContainer>
        </>
    );
};

//styling of the page take place here using Styled components library in react-js
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  /* background-color:# */
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 91%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;