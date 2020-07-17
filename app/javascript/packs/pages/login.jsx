import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import logoImg from "../../../assets/images/logoPlaceholder.jpg";
import redX from '../../../assets/images/redX.jpg'
import tinyMan from '../../../assets/images/tinyMan.png'
import lock from '../../../assets/images/lock.png'

import { Card, Logo, Form, Input, Button, Error, RedX, LoginWrapper, InputIcon, LogoWrapper} from './AuthForm';


///////////////////////////////////  LOG_IN_PAGE //////////////////////////////
function Login(props) {
  
  const [state, setState] = React.useState({
    
    email: "",
    password: "",
    status: "",
    errors: {}

  })

  
  ///////////////////////////////////  HANDLE_SUBMIT ///////////////////////////
  function handleSubmit(event){
    
    ////send info into backend heyyohhhh/////
    event.preventDefault();
    const mode = process.env.NODE_ENV =="development" ? "http://127.0.0.1:3000" : "https://weedblog.herokuapp.com"
    axios.post(mode + "/sessions", {
      
      user: { 
        email: state.email,
        password: state.password
      }
    },
    {withCredentials: true})
    .then(response => {
      
      console.log("Log in submit Response", response)
      
      if (response.data.status == "green"){

        setState({
          ...state,
          errors: response.data.error,
        });
        
        props.handleSuccessfulAuth(response.data)
        console.log("propsFromIDKwhere", props)
        props.history.push("/")
      
      }else{
        
        setState({
          ...state,
          errors: response.data.error,
        });
      }
    }).catch(error => {
      
      console.log("LoginErrors", error)
      
      setState({
        ...state,
        errors: error,
      });
    })
  }


  ///////////////////////////////////  HANDLE_CHANGE /////////////////////////////
  function handleChange(event){

    const value = event.target.value;

    console.log("name", event.target.name)
    console.log("value", value)
    setState({
      ...state,
      [event.target.name]: value
    });
  }


  ///////////////////////////////////  SETUP ERRORMESSAGES //////////////////////
  let errorMessages = [];
    

  if (state.errors){

    if (state.errors.success) {
      errorMessages.push(<h4> {state.errors.success[0]} </h4>)
    }
       
    if (state.errors.auth) {
      errorMessages.push(<h4> {state.errors.auth[0]} </h4>)
    } 

    if (state.errors.password) {
      errorMessages.push(<h4> {"Password " + state.errors.password[0]} </h4>)
    } 

    if (state.errors.password_confirmation) {
      errorMessages.push(<h4> {"Confirmation " + state.errors.password_confirmation[0]} </h4>)
    } 

    if (state.errors.green) {
      errorMessages.push(<h4> {state.errors.green} </h4>)
    }
  }


  /////////////////////////////////// JSX /////////////////////////////////////////
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
        {errorMessages}
        
      </Card>
      <Link style={{fontSize: ".5em"}} to="/signup">Dont have an account? <span style={{textDecoration: "underline"}}>click here</span></Link>
    </LoginWrapper>
  );
}

export default props => <Login {...props}/>;