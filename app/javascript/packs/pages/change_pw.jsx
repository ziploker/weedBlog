import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import logoImg from "../../../assets/images/logoPlaceholder.jpg";
import redX from '../../../assets/images/redX.jpg'
import tinyMan from '../../../assets/images/tinyMan.png'
import lock from '../../../assets/images/lock.png'

import { Card, Logo, Form, Input, Button, ErrorMsg, RedX, LoginWrapper, 
  InputIcon, LogoWrapper, H2, FormItem, Label, ErrorWrapper} from './AuthForm';


///////////////////////////////////  LOG_IN_PAGE //////////////////////////////
function Login(props) {
  
  const [state, setState] = useState({
    
    password: "",
    password_confirmation: "",
    status: "",
    errors: {}

  })

  
  ///////////////////////////////////  HANDLE_SUBMIT ///////////////////////////
  function handleSubmit(event){
    
    ////send info into backend heyyohhhh/////
    event.preventDefault();
    const mode = process.env.NODE_ENV =="development" ? "http://127.0.0.1:3000" : "https://weedblog.herokuapp.com"
    axios.post(mode + "/registrations/"+ props.match.params.token +"/reset", {
      
      user: { 
        password: state.password,
        password_confirmation: state.password_confirmation
        
      }
    },
    {withCredentials: true})
    .then(response => {
      
      console.log("change_PW response", response)
      
      if (response.data.status == "green"){

        setState({
          ...state,
          state: response.data.status,
          errors: response.data.error,
        });
        
        //props.history.push("/")
      
      }else{
        
        setState({
          ...state,
          status: response.data.status,
          errors: response.data.error,
        });
      }
    }).catch(error => {
      
      console.log("LoginErrors", error)
      
      setState({
        ...state,
        state: "pink",
        errors: {auth: [error]}
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
      errorMessages.push(<ErrorMsg> {state.errors.success[0]} </ErrorMsg>)
    }
       
    if (state.errors.auth) {
      errorMessages.push(<ErrorMsg> {state.errors.auth[0]} </ErrorMsg>)
    } 

    if (state.errors.password) {
      errorMessages.push(<ErrorMsg> {"Password " + state.errors.password[0]} </ErrorMsg>)
    } 

    if (state.errors.password_confirmation) {
      errorMessages.push(<ErrorMsg> {"Confirmation " + state.errors.password_confirmation[0]} </ErrorMsg>)
    } 

    if (state.errors.green) {
      errorMessages.push(<ErrorMsg> {state.errors.green} </ErrorMsg>)
    }
  }


  

  /////////////////////////////////// JSX /////////////////////////////////////////
  return (
    <LoginWrapper>
      <Card>

      <LogoWrapper>
        
        <Link to="/">
          <Logo src={logoImg} />
        </Link>   

        <H2>Reset your password</H2>
      </LogoWrapper>
        
        
        <Form onSubmit = {handleSubmit}>
          
          <Input name="change_password" type="password" autoComplete={"off"} placeholder="password" value={state.password} onChange={handleChange} required/>
          <Input name="change_password_confirmation" type="password" placeholder="password confirmation" value={state.password_confirmation} onChange={handleChange} required/>

          <Button type="submit">Sign Up</Button>
        </Form>
       
        
        {errorMessages}
        {props.match.params.token}
      
      </Card>
      <Link style={{fontSize: ".5em"}} to="/forgot">Forgot password?? <span style={{textDecoration: "underline"}}>click here</span></Link>

    </LoginWrapper>
  );
}

export default props => <Login {...props}/>;