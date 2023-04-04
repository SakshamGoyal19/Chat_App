import React from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { RegisterForm } from '../css/CustomCss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Register = () => {

    const navigate = useNavigate();

    const header = {
        "PRIVATE-KEY": "d77f1f5b-7665-438f-ae96-96c978596831"
    }

    const registerUser = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());
        if(value.username === "" || value.first_name === "" || value.last_name === "" || value.password === ""){
            window.alert("Incomplete Details");
            return;
        }
        axios.post("https://api.chatengine.io/users/", value, {headers: header})
        .then((res) => navigate("/"))
    }


  return (
    <div>
        <RegisterForm onSubmit={registerUser}>
            <h2 style={{textAlign: "center"}}>Chat Assistant</h2>
            <TextField id="outlined-basic" label="username" variant="outlined" name={"username"}/>
            <TextField id="outlined-basic" label="first name" variant="outlined" name={"first_name"}/>
            <TextField id="outlined-basic" label="last name" variant="outlined" name={"last_name"}/>
            <TextField id="outlined-basic" label="password" variant="outlined" name={"secret"} type={"password"}/>
            <Button variant="contained" type={"submit"} style={{margin: "20px"}}>Sign Up</Button>
        </RegisterForm>
    </div>
  )
}

export default Register