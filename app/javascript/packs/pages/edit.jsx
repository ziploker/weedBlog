import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import logoImg from "../../../assets/images/logoPlaceholder.jpg";
import redX from '../../../assets/images/redX.jpg'
import greenCheck from '../../../assets/images/greenCheck.png'
import { Card, Logo, Form, Input, Button, ErrorMsg, RedX, LoginWrapper, 
  InputIcon, LogoWrapper, H2, FormItem, Label, ErrorWrapper} from './AuthForm';

  import axios from 'axios';


///////////////////////////////////  EDIT ACCOUNT //////////////////////////////
function Edit(props) {

  const [state, setState] = React.useState({
    loggedInStatus: "NOT_LOGGED_IN",
    first: props.user ? props.user.first : '',
    last: props.user ? props.user.last : '',
    email: props.user ? props.user.email : '',
    oldPassword: '',
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
      
      if (response.data.status == "green"){
        
        setState({
          ...state,
          state: response.data.status,
          errors: response.data.error
        });
        
        props.handleSuccessfulAuth(response.data)
        
        
      }else{
        
        setState({
          ...state,
          status: response.data.status,
          errors: response.data.error
        });
      }
      
    }).catch(error => {
      
      setState({
        ...state,
        status: "pink",
        errors: {auth: [error]}
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
      .catch(error => {
        
        console.log("Logged in? error", error)

        setState({
          ...state,
          status: "pink",
          errors: {auth: [error]}
        });


      }
    )

    
  },[]);

  
  /////////////////////////////////// JSX /////////////////////////////////////////
  return (
    <LoginWrapper>
      <Card>
        <LogoWrapper>
          <Link to="/">
            <Logo src={logoImg} />
          </Link>   
          <H2>Edit your account</H2>
        </LogoWrapper>
        
        <Form onSubmit = {handleSubmit}>
          
          <FormItem>
            <Label >first name</Label>
            <Input name="first" type="text" placeholder="first name" value={state.first || ''} onChange={handleChange} required/>
          </FormItem>
          
          <FormItem>
            <Label >last name</Label>
            <Input name="last" type="text" placeholder="last name" value={state.last || ''} onChange={handleChange} required/>
          </FormItem>
          
          <FormItem>
            <Label >email</Label>
            <Input name="email" type="email" placeholder="email" value={state.email || ''} onChange={handleChange} required/>
          </FormItem>
          
          <FormItem>
            <Label >current password</Label>
            <Input name="oldPassword" type="password" placeholder="old password" value={state.oldPassword || ''} onChange={handleChange} required/>
          </FormItem>


          <FormItem>
            <Label >new password </Label>
            <Input name="password" type="password" placeholder="new password" value={state.password} onChange={handleChange} />
          </FormItem>
          

          <FormItem>
            <Label >new password confirmation</Label>
            <Input name="password_confirmation" type="password" placeholder="new password confirmation" value={state.password_confirmation} onChange={handleChange} />
          </FormItem>

          <Button type="submit">Make Changes</Button>
        
        </Form>
        
        <ErrorWrapper>        
          <RedX status={state.status} src={state.status == "" ?  "" : state.status == "pink" ? redX : greenCheck}/>
          {errorMessages}
        </ErrorWrapper>
      
      </Card>
      
      <Link to="/login">Already have an account?</Link>
    </LoginWrapper>
  );
}

export default props => <Edit {...props}/>;