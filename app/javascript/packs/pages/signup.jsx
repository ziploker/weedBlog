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
    last: "",
    email: "",
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
            <Label >first name</Label>
            <Input name="first" type="text" placeholder="first name" value={state.first} onChange={handleChange} required/>
          </FormItem>
          
          <FormItem >
            <Label >last name</Label>
            <Input name="last" type="text" placeholder="last name" value={state.last} onChange={handleChange} required/>
          </FormItem>

          <FormItem >
            <Label >email</Label>
            <Input name="email" type="email" placeholder="email" value={state.email} onChange={handleChange} required/>
          </FormItem>

          <FormItem >
            <Label >password</Label>
            <Input name="password" type="password" placeholder="password" value={state.password} onChange={handleChange} required/>
          </FormItem>
          
          <FormItem >
            <Label >password confirmation</Label>
            <Input name="password_confirmation" type="password" placeholder="password confirmation" value={state.password_confirmation} onChange={handleChange} required/>
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