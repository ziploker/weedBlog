import React, {useState} from "react";
import { Link } from 'react-router-dom';
import logoImg from "../../../assets/images/logoPlaceholder.jpg";
import redX from '../../../assets/images/redX.jpg'
import { Card, Logo, Form, Input, Button, ErrorMsg, RedX, LoginWrapper, 
  InputIcon, LogoWrapper, H2, FormItem, Label, ErrorWrapper} from './AuthForm';

import axios from 'axios';




///////////////////////////////////  SIGN_UP_PAGE //////////////////////////////
function Signup(props) {

  const [state, setState] = React.useState({
    first: "",
    firstFieldActive: false,
    last: "",
    lastFieldActive: false,
    email: "",
    emailFieldActive: false,
    password: "",
    passwordFieldActive: false,
    password_confirmation: "",
    password_confirmationFieldActive: false,
    status: "",
    errors: {}
  })

  // to activate the input field while typing
  function activateField(e) {
    
    setState({
      ...state,
      [e.target.name+"FieldActive"]: true
    })
  }

  // to deactivate input only if it's empty
  function disableField(e) {
    if (e.target.value === "") {
      setState({
        ...state,
        [e.target.name+"FieldActive"]: false
      })
    }
  }
  
  
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
      
      if (response.data.status === "green"){
        
        setState({
          ...state,
          status: response.data.status,
          errors: response.data.error
        });
        
        props.handleSuccessfulAuth(response.data)
        props.history.push("/")
      
      }else{
        
        //update error state
        setState({
          ...state,
          status: response.data.status,
          errors: response.data.error
        });
      }
    }).catch(error => {
      
      console.log("Sign_up Errors", error)
      setState({
        ...state,
        status: response.data.status,
        errors: response.data.error
      });
    
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
          <H2>Create an account</H2>
        </LogoWrapper>
        
        <Form onSubmit = {handleSubmit}>
          
          <FormItem >
            <Label className={state.firstFieldActive ? "field-active" : ""}>first name</Label>
            <Input 
              name="first" 
              type="text" 
              
              value={state.first} 
              onChange={handleChange} 
              onFocus={activateField}
              onBlur={disableField}
              required/>
          </FormItem>
          
          <FormItem >
            <Label className={state.lastFieldActive ? "field-active" : ""} >last name</Label>
            <Input 
              name="last" 
              type="text" 
              
              value={state.last} 
              onChange={handleChange} 
              onFocus={activateField}
              onBlur={disableField}
              required/>
          </FormItem>

          <FormItem >
            <Label className={state.emailFieldActive ? "field-active" : ""}>email</Label>
            <Input 
              name="email" 
              type="email" 
              
              value={state.email} 
              onChange={handleChange} 
              onFocus={activateField}
              onBlur={disableField}
              required/>
          </FormItem>

          <FormItem >
            <Label className={state.passwordFieldActive ? "field-active" : ""}>password</Label>
            <Input 
              name="password" 
              type="password" 
              
              value={state.password} 
              onChange={handleChange} 
              onFocus={activateField}
              onBlur={disableField}
              required/>
          </FormItem>
          
          <FormItem >
            <Label className={state.password_confirmationFieldActive ? "field-active" : ""}>password confirmation</Label>
            <Input 
              name="password_confirmation" 
              type="password" 
              
              value={state.password_confirmation} 
              onChange={handleChange} 
              onFocus={activateField}
              onBlur={disableField}
              required/>
          </FormItem>

          <Button type="submit">Sign Up</Button>
        </Form>
        
        <ErrorWrapper>        
          <RedX status={state.status} src={redX}/>
          {errorMessages}
        </ErrorWrapper>
      
      </Card>
      <Link to="/login">Already have an account?</Link>
    </LoginWrapper>
  );
}

export default props => <Signup {...props}/>;