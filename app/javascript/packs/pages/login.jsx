import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import logoImg from "../../../assets/images/logoPlaceholder.jpg";
import { Card, Logo, Form, Input, Button, Error } from './AuthForm';


function Login(props) {
  const [state, setState] = React.useState({
    email: "",
    password: "",
    
    loginErrors: ""
  })

  function handleSubmit(event){
    console.log("about to axios", "abou to axiooos")
    console.log("Rails.env", process.env.NODE_ENV)

    const mode = process.env.NODE_ENV =="development" ? "http://127.0.0.1:3000" : "https://weedblog.herokuapp.com"
    axios.post(mode + "/sessions", {
      
      user: { 
        email: state.email,
        password: state.password,
        

      }
    },
    {withCredentials: true}
    ).then(response => {
      console.log("LoginResponse", response)
      if (response.data.status === "created"){
        props.handleSuccessfulAuth(response.data)
        //props.handleSuccessfulAuth(response.data)
        //props.history.push("/ziploker")
      }else{
        //update error state
      }
      
    }).catch(error => {
      console.log("LoginErrors", error)
    })
    event.preventDefault();


  }

  function handleChange(event){

    const value = event.target.value;

    console.log("name", event.target.name)
    console.log("value", value)
    setState({
      ...state,
      [event.target.name]: value
    });

  }

  return (
    <Card>
      <Logo src={logoImg} />
      <Form onSubmit = {handleSubmit}>
        <Input name="email" type="email" placeholder="email" value={state.email} onChange={handleChange} required/>
        <Input name="password" type="password" placeholder="password" value={state.password} onChange={handleChange} required/>

        <Button type="submit">Sign Up</Button>
      </Form>
      <Link to="/signup">Dont have an account?</Link>
    </Card>
  );
}

export default props => <Login {...props}/>;