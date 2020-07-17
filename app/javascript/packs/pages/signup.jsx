import React, {useState} from "react";
import { Link } from 'react-router-dom';
import logoImg from "../../../assets/images/logoPlaceholder.jpg";
import redX from '../../../assets/images/redX.jpg'
import { Card, Logo, Form, Input, Button, Error, RedX, LoginWrapper, InputIcon, LogoWrapper} from './AuthForm';

import axios from 'axios';




///////////////////////////////////  SIGN_UP_PAGE //////////////////////////////
function Signup(props) {

  const [state, setState] = React.useState({
    first: "",
    last: "",
    email: "",
    password: "",
    password_confirmation: "",
    errors: {}
  })

  
  
  
  ///////////////////////////////////  HANDLE_SUBMIT ///////////////////////////
  function handleSubmit(event){
    
    ////send info into backend heyyohhhh/////
    event.preventDefault();
    const mode = process.env.NODE_ENV =="development" ? "http://127.0.0.1:3000" : "https://weedblog.herokuapp.com"
    axios.post(mode + "/registrations", {
      
      user: { 
        first: state.first,
        last: state.last,
        email: state.email,
        password: state.password,
        password_confirmation: state.password_confirmation

      }
    },
    {withCredentials: true})
    .then(response => {
      
      console.log("Sign up submit Response", response)
      
      if (response.data.status === "created"){
        
        setState({
          ...state,
          errors: response.data.error
        });
        
        props.handleSuccessfulAuth(response.data)
        props.history.push("/")
      
      }else{
        
        //update error state
        setState({
          ...state,
          errors: response.data.error
        });
      }
    }).catch(error => {
      
      console.log("Sign_up Errors", error)
    
    })
  }


  
  ///////////////////////////////////  HANDLE_CHANGE /////////////////////////////
  function handleChange(event){

    const value = event.target.value;

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
        <Logo src={logoImg} />
        <Form onSubmit = {handleSubmit}>
          <Input name="first" type="text" placeholder="first name" value={state.first} onChange={handleChange} required/>
          <Input name="last" type="text" placeholder="last name" value={state.last} onChange={handleChange} required/>
          <Input name="email" type="email" placeholder="email" value={state.email} onChange={handleChange} required/>
          <Input name="password" type="password" placeholder="password" value={state.password} onChange={handleChange} required/>
          <Input name="password_confirmation" type="password" placeholder="password confirmation" value={state.password_confirmation} onChange={handleChange} required/>

          <Button type="submit">Sign Up</Button>
        </Form>
        
        {errorMessages}
      
      </Card>
      <Link to="/login">Already have an account?</Link>
    </LoginWrapper>
  );
}

export default props => <Signup {...props}/>;