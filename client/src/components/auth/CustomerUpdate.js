import React from 'react';
import { useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import Navbar from '../layouts/Navbar';
import styled from "styled-components";
import Logo from "../assets/logo.svg";

export default function CustomerUpdate(props) {

    const [email,setEmail] = useState(props.data1.email);
    const [name,setName] = useState(props.data1.name);
    const [age,setAge] = useState(props.data1.age);
    const _id = props.data1._id;
    const navigate = useNavigate();
    async function customerform(e)
    {
       e.preventDefault();
       try{
        console.log(props.data1)
            const UpdatedData = {
              _id,
              name,
              email,
              age
            }
            await axios.post("http://localhost:5001/customer/update",UpdatedData);
            props.SetEdit(true);
            props.setTempData([]);
            navigate("/home");
       }catch(err)
       {
          console.error(err);
       }
    }
  return (
    <>  
        <FormContainer>
            <form onSubmit = {customerform} >
                <div className="brand">
                    <img src={Logo} alt="logo" />
                    <h1>Update Customer Details</h1>
                </div>
                <input 
                    type="text"
                    placeholder="Name" 
                    onChange = {(e) => setName(e.target.value)} 
                    value = {name}
                />
                <input
                    type = "email"
                    placeholder = "Email"
                    onChange = {(e) => setEmail(e.target.value)}
                    value = {email}
                 />
                <input 
                    type="number" 
                    placeholder="Age" 
                    onChange = {(e) => setAge(e.target.value)} 
                    value = {age}
                />
                <button type="submit"> Submit </button>
            </form>
            
        </FormContainer>
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
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
`;