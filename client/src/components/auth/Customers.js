import React, {useState,useEffect,useContext} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Logo from "../assets/logo.svg";
import {useNavigate} from "react-router-dom";
import Navbar from '../layouts/Navbar';
import AuthContext from '../../context/AuthContext';

export default function Customers() {
    const [data,setdata] = useState([]);
    const {loggedIn,getloggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    async function fetchInfo()
    {
        try{
             const tempData = await axios.get("http://localhost:5001/customer/");
             setdata(tempData.data);
        }catch(err)
        {
           console.error(err);
        }
    }
    // const handledelete = (key,e) => 
    // {
    //     setdata(data.filter((val,i) => i !== key));
    // }
    const handledelete = async (val,key,e) => 
    {
        try
        {
          setdata(data.filter((val1,i) => i !== key));
          await axios.post("http://localhost:5001/customer/delete",val);
        }catch(err)
        {
          console.error('Error deleting items: ',err);
          
        }
    }
    useEffect(() => {
        getloggedIn();
        console.log(loggedIn);
        if(loggedIn===false)
        {
            navigate("/");
        }
        fetchInfo();
    },[]);
    return (
      <>
      <Navbar/>
      <TableContainer>
         <div className="brand">
             <img src={Logo} alt="logo" />
             <h1>Customers</h1>
        </div>
        <div>
            <table>
                <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th colspan='3'>Action</th>
                    {/* <th>Action</th> */}
                </tr>
                {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{val.name}</td>
                            <td>{val.email}</td>
                            <td>{val.age}</td>
                            <td><button className="edit-button" >edit</button></td>
                            {/* <td><button className="delete-button" onClick={e => handledelete(key,e)} >delete</button></td> */}
                            <td><button className="delete-button" onClick={e => handledelete(val,key,e)} >delete</button></td> 
                        </tr>
                    )
                })}
            </table>
        </div>
      </TableContainer>
      </>
    )
}

const TableContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
color: white;
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
table {
  width: 800px;
  height: 200px;
  border-collapse: collapse;
  color:blue;
  background-color:white;
}

th {
  border-bottom: 1px solid blue;
  border: 2px solid blue;
  color:blue;
}
td {
  text-align: center;
  border: 2px solid blue;
  color:blue;
}
.edit-button
{
  color:white;
  background-color:green;
}
.delete-button
{
  background-color:red;
  color:white;
}
`