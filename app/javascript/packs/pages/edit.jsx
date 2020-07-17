import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import logoImg from "../../../assets/images/logoPlaceholder.jpg";
import redX from '../../../assets/images/redX.jpg'
import { Card, Logo, Form, Input, Button, Error, RedX, LoginWrapper, InputIcon, LogoWrapper} from './AuthForm';
import axios from 'axios';


///////////////////////////////////  LOG_IN_PAGE //////////////////////////////
function Edit(props) {

  const [state, setState] = React.useState({
    loggedInStatus: "NOT_LOGGED_IN",
    first: props.user ? props.user.first : '',
    last: props.user ? props.user.last : '',
    email: props.user ? props.user.email : '',
    oldPassword: '',
    password: "",
    password_confirmation: "",
    errors: {}
  })
    
  
  ///////////////////////////////////  HANDLE_SUBMIT ///////////////////////////
  function handleSubmit(event){
    
    ////send info into backend heyyohhhh/////
    event.preventDefault();
    const mode = process.env.NODE_ENV =="development" ? "http://127.0.0.1:3000" : "https://weedblog.herokuapp.com"
    axios.put(mode + "/registrations/"+props.user.id, {
      
      user: { 
        first: state.first,
        last: state.last,
        email: state.email,
        oldPassword: state.oldPassword,
        password: state.password,
        password_confirmation: state.password_confirmation

      }
    },
    {withCredentials: true})
    .then(response => {
      console.log("EDIT Response", response)
      
      if (response.data.status == "created"){
        
        setState({
          ...state,
          errors: response.data.error
        });
        
        props.handleSuccessfulAuth(response.data)
        
        
      }else{
        
        setState({
          ...state,
          errors: response.data.error
        });
      }
      
    }).catch(error => {
      
      setState({
        ...state,
        errors: error
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
  
  
  ///////////////////////////////////  USE_EFFECT //////////////////////
  useEffect(() => {

    const mode = process.env.NODE_ENV == "development" ? "http://127.0.0.1:3000" : "https://weedblog.herokuapp.com"
    axios.get( mode + "/logged_in", {withCredentials: true})
      .then(response => {

        if (response.data.logged_in && state.loggedInStatus == "NOT_LOGGED_IN"){
            
          console.log("theResults", response)
          setState({
            loggedInStatus: "LOGGED_IN",
            first: response.data.user.first,
            last: response.data.user.last,
            email: response.data.user.email,
            oldPassword: "",
            password: "",
            password_confirmation: "",
            errors: {}
          })
            
        }else if (!response.data.logged_in && state.loggedInStatus == "LOGGED_IN"){
              
          setState({
              loggedInStatus: "NOT_LOGGED_IN",
              user: {}
          })

        }
      
      })
      .catch(error => console.log("Logged in? error", error))

    
  },[]);

  
  /////////////////////////////////// JSX /////////////////////////////////////////
  return (
    <LoginWrapper>
      <Card>
        <Logo src={logoImg} />
        <Form onSubmit = {handleSubmit}>
          <Input name="first" type="text" placeholder="first name" value={state.first || ''} onChange={handleChange} required/>
          <Input name="last" type="text" placeholder="last name" value={state.last || ''} onChange={handleChange} required/>
          <Input name="email" type="email" placeholder="email" value={state.email || ''} onChange={handleChange} required/>
          <Input name="oldPassword" type="password" placeholder="old password" value={state.oldPassword || ''} onChange={handleChange} required/>

          <Input name="password" type="password" placeholder="new password" value={state.password} onChange={handleChange} />
          <Input name="password_confirmation" type="password" placeholder="new password confirmation" value={state.password_confirmation} onChange={handleChange} />

          <Button type="submit">Sign Up</Button>
        </Form>
        {errorMessages}
      </Card>
      <Link to="/login">Already have an account?</Link>
    </LoginWrapper>
  );
}

export default props => <Edit {...props}/>;