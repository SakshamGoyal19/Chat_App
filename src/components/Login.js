import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { userData, userPassword } from '../store/userStore';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LoginForm } from '../css/CustomCss';

const Login = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const authenticate = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());

        sessionStorage.setItem("username", value.username);
        sessionStorage.setItem("password", value.secret);

        const header = {
            "Project-ID": "b7fe8748-3f5f-4f7f-9c54-70037f2b0fcf",
            "User-Name": value.username,
            "User-Secret": value.secret
        }
        axios.get("https://api.chatengine.io/users/me/", {headers: header})
        .then((res) => {
            dispatch(userData(res.data));
            dispatch(userPassword(value.secret))
            console.log("logged in successfully")
            navigate("/home")
        })
        .catch((error) => window.alert("invalid login credentials"))
    }

  return (
    <div>
        <LoginForm onSubmit={authenticate}>
            <h2 style={{textAlign: "center"}}>Chat Assistant</h2>
            <TextField id="outlined-basic" label="username" variant="outlined" name={"username"}/>
            <TextField id="outlined-basic" label="password" variant="outlined" name={"secret"} type={"password"}/>
            <Button variant="contained" type={"submit"}>Sign In</Button>
            <Link to={"/register"}><h3 style={{color: "#9F3EDA", textAlign: "center"}}>Create Account</h3></Link>
        </LoginForm>
    </div>
  )
}

export default Login