import React, { useState,useContext,useEffect} from 'react'
import axios from 'axios';
import {Link,useNavigate} from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import AuthContext from '../../context/AuthContext';


export default function Register() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmpassword,setconfirmPassword] = useState("");
  const {loggedIn,getloggedIn} = useContext(AuthContext);
  const navigate = useNavigate();

  async function register(e)
  {
    //we use below preventDefault function because when we submit the form, it reloads and all the data will loose!
    //so to store the input info we use it!
     e.preventDefault();
     try{
          const registerData  = {
            email,
            password,
            confirmpassword
          }
          await axios.post("http://localhost:5001/auth/",registerData);
          await getloggedIn();
          console.log(loggedIn);
          navigate("/home");
     }catch(err)
     {
        console.error(err);
     }
  }

  useEffect(() => {
    // console.log(loggedIn);
      getloggedIn();
      if(loggedIn===true)
      {
          navigate("/home");
      }
  },[]);

  return (
    <>
        <FormContainer>
            <form onSubmit = {register} >
                <div className="brand">
                    <img src={Logo} alt="logo" />
                    <h1>Customer Hub</h1>
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
                <input 
                    type="password" 
                    placeholder="confirmPassword" 
                    onChange = {(e) => setconfirmPassword(e.target.value)} 
                    value = {confirmpassword}
                />
                <button type="submit"> Register </button>

                <span>
                    Already have an account ? <Link to="/">Login.</Link>
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
    padding-left:2rem;
    padding: 1rem 2rem;
    border: none;
    padding-left: 5rem;
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
    padding-left: 5rem;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;