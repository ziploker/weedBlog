import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import logoImg from "../../../assets/images/logoPlaceholder.jpg";
import redX from '../../../assets/images/redX.jpg'
import tinyMan from '../../../assets/images/tinyMan.png'
import lock from '../../../assets/images/lock.png'

import { Card, Logo, Form, Input, Button, Error, RedX, LoginWrapper, InputIcon, LogoWrapper} from './AuthForm';



function Login(props) {
  const [state, setState] = React.useState({
    email: "",
    password: "",
    
    error: "",
    status: ""
  })

  function handleSubmit(event){
    
    event.preventDefault();

    const mode = process.env.NODE_ENV =="development" ? "http://127.0.0.1:3000" : "https://weedblog.herokuapp.com"
    axios.post(mode + "/sessions", {
      
      user: { 
        email: state.email,
        password: state.password
        
        

      }
    },
    {withCredentials: true}
    ).then(response => {
      console.log("theREsponse", response)
      if (response.data.status == "green"){

        console.log("hererererererer")
        props.handleSuccessfulAuth(response.data)
        
        props.history.push("/")
      }else{
        setState({
          ...state,
          error: response.data.error,
          status: response.data.status
        });
      }
      
    }).catch(error => {
      console.log("LoginErrors", error)
      setState({
        ...state,
        error: error,
        status: "pink"
      });
    })
    


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
    <LoginWrapper>
      
    <Card>
      <LogoWrapper>
      <Logo src={logoImg} />
      <h2 style={{
        margin: "0 20px",
        lineHeight: "1.5",
        fontSize: "24px"
      }}>Log in</h2>
      </LogoWrapper>
      <Form onSubmit = {handleSubmit}>
      <div style={{
          position: "relative",
          margin: "0 0 20px 0",
          padding: "0"}}>
          <label style={{
            textAlign: "left", 
            width: "100",
            display: "block",
            maxWidth: "100%",
            marginBottom: "5px",
            color: "#62748e",
            fontSize: "12px",
            fontWeight: "bold",
            lineHeight: "1.42857"
            
            }}>email</label>
          <InputIcon style={{backgroundImage: `url(${tinyMan})`}}></InputIcon>
          <Input name="email" type="email" placeholder="email" value={state.email} onChange={handleChange} required/>
        </div>


        <div style={{
          position: "relative",
          margin: "0 0 20px 0",
          padding: "0"}}>
          <label style={{
            textAlign: "left", 
            width: "100",
            display: "block",
            maxWidth: "100%",
            marginBottom: "5px",
            color: "#62748e",
            fontSize: "12px",
            fontWeight: "bold",
            lineHeight: "1.42857"
            
            }}>password</label>
          <InputIcon style={{backgroundImage: `url(${lock})`}}></InputIcon>
          
        <Input name="password" type="password" placeholder="password" value={state.password} onChange={handleChange} required/>
        </div>
        <Button type="submit">Sign Up</Button>
      </Form>
      <Error status={state.status}>
        <RedX status={state.status} src={redX} style={{backgroundColor: "transparent", height: "20px", verticalAlign: "middle"}}/>
        <span style={{paddingLeft: "10px"}}>{state.error}</span>
      </Error>
      
    </Card>
    <Link style={{fontSize: ".5em"}} to="/signup">Dont have an account? <span style={{textDecoration: "underline"}}>click here</span></Link>
    </LoginWrapper>
  );
}

export default props => <Login {...props}/>;