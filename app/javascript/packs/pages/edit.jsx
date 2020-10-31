import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import logoImg from "../../../assets/images/logoPlaceholder.jpg";
import redX from '../../../assets/images/redX.jpg'
import greenCheck from '../../../assets/images/greenCheck.png'

import dummy_avatar from '../../../assets/images/dummy_avatar.png'
import styled, { ThemeProvider } from 'styled-components'
import { Card, Logo, Form, Input, Button, ErrorMsg, RedX, LoginWrapper, 
  InputIcon, LogoWrapper, H2, FormItem, Label, ErrorWrapper} from './AuthForm';

  import axios from 'axios';

  import $ from 'jquery';

const ProfilePicWrapper = styled.div`

position: relative;


`;

const ProfilePic = styled.img`
  
  border-radius: 50px;
  border: 1px gray solid;
  position: relative;
  width: 70px;
  height: 70px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  


`;

const LabelForFile = styled.label`
    
    text-align: center;
    display: inline-block;
    font-size: 12px;
    position: absolute;
    right: -15px;
    bottom: -13px;
    z-index: 5;
    border-radius: 50px;
    //background-color: orange;
    padding: 5px;
    margin: 0 auto;
  
    //background-color: orange;
    cursor: pointer;
    
    &:hover{
      //background-color: #fce1b3;

    }
  
  
  `;

const formData = new FormData();
///////////////////////////////////  EDIT ACCOUNT //////////////////////////////
function Edit(props) {

  console.log("Edit_props", props)
  const [state, setState] = React.useState({
    loggedInStatus: "NOT_LOGGED_IN",
    first: '',
    firstFieldActive: true,
    last: '',
    lastFieldActive: true,
    email: '',
    emailFieldActive: true,
    oldPassword: '',
    oldPasswordFieldActive: false,
    password: "",
    passwordFieldActive: false,
    password_confirmation: "",
    password_confirmationFieldActive: false,
    nick: "",
    nickFieldActive: true,
    status: "",
    avatar: [],
    errors: {},
    avatar_url: "",
    nick: "",
    id: ''


    
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
    const mode = process.env.NODE_ENV =="development" ? "http://127.0.0.1:3000" : "https://www.floiridablaze.io"
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


  ////////////////////// Handlev Submit V2 //////////////////////////
  const handleAdd = e => {
    
    e.preventDefault();
    
    


     
     
     formData.append('user[first]', state.first);
     formData.append('user[last]', state.last);
     formData.append('user[email]', state.email);
     formData.append('user[oldPassword', state.oldPassword);
     formData.append('user[password]', state.password);
     formData.append('user[password_confirmation]', state.password_confirmation);
     formData.append('user[nick]', state.nick);
     
     

     console.log("formdata from handle add");
     console.log(formData);

      
      //get token for form submission
      const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");  
      const mode = process.env.NODE_ENV =="development" ? "http://127.0.0.1:3000" : "https://www.floiridablaze.io"
      
      $.ajax({
          
        url: mode+'/registrations/'+state.id,
        headers: {
          
          'X-CSRF-Token': csrf
        },
        method: 'PUT',
        data: 
          formData,
          contentType: false,
          processData: false
            
          
        ,
        success: function(response) {
          //props.handleAdd(data);


          if (response.status === "green"){

            setState({
              ...state,
              //focussed: (props.focussed) || false,
              //first: "",
              //firstFieldActive: false,
              //last: "",
              //lastFieldActive: false,
              //email: "",
              //emailFieldActive: false,
              //password: "",
              //passwordFieldActive: false,
              //password_confirmation: "",
              //password_confirmationFieldActive: false,
              //nick: "",
              status: response.status,
              //avatarFieldActive: false,
              //avatar: [],
              errors: response.error
              
            });
            
            
        
            
            props.handleSuccessfulAuth(response)
            //props.history.push("/")
          
          }else{
            
            //update error state
            setState({
              ...state,
              status: response.status,
              errors: response.error
            });
          }
          
    
        },
        error: function(xhr, status, error) {
          //alert('Message did not reach server: ', error);
        }
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


  ///////////////////////////////////  HANDLE_IMAGE_CHANGE /////////////////////////////
  function handleImageChange(e){

    formData.append('user[avatar]', e.target.files[0]);
   
      setState({
        ...state,
        avatar: URL.createObjectURL(event.target.files[0])
      })
    
    //if (e.target.files[0]) setState({ ...state, avatar: e.target.files[0] });
  };

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
    
    const mode = process.env.NODE_ENV == "development" ? "http://127.0.0.1:3000" : "https://www.floiridablaze.io"
    axios.get( mode + "/logged_in", {withCredentials: true})
      .then(response => {

        if (response.data.logged_in && state.loggedInStatus == "NOT_LOGGED_IN"){
            
          console.log("theResults", response)
          setState({
            ...state,
            loggedInStatus: "LOGGED_IN",
            first: response.data.user.first,
            last: response.data.user.last,
            email: response.data.user.email,
            oldPassword: "",
            password: "",
            password_confirmation: "",
            errors: {},
            avatar_url: response.data.user.avatar_url,
            nick: response.data.user.nick,
            id: response.data.user.id
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
          
          <ProfilePicWrapper>
              <ProfilePic src={state.avatar.length != 0 ? state.avatar : state.avatar_url ? state.avatar_url : dummy_avatar}/>
              <LabelForFile htmlFor="avatar">&#128393;</LabelForFile>
          </ProfilePicWrapper> 
          
          
          
          <H2>Edit account</H2>
        
        </LogoWrapper>
        
        <Form onSubmit = {handleAdd}>
          
          <FormItem>
            <Label className={state.firstFieldActive ? "field-active" : ""}>first name</Label>
            <Input 
                name="first" 
                type="text" 
                value={state.first || ''} 
                onChange={handleChange} 
                onFocus={activateField}
                onBlur={disableField}
                required />
          </FormItem>
          
          <FormItem>
            <Label className={state.lastFieldActive ? "field-active" : ""}>last name</Label>
            <Input 
              name="last" 
              type="text" 
              value={state.last || ''} 
              onChange={handleChange} 
              onFocus={activateField}
              onBlur={disableField}
              required/>
          </FormItem>
          
          <FormItem>
            <Label className={state.emailFieldActive ? "field-active" : ""}>email</Label>
            <Input 
              name="email" 
              type="email" 
              value={state.email || ''} 
              onChange={handleChange} 
              onFocus={activateField}
              onBlur={disableField}
              required/>
          </FormItem>
          
          <FormItem>
            <Label className={state.oldPasswordFieldActive ? "field-active" : ""}>current password</Label>
            <Input 
              name="oldPassword" 
              type="password" 
              value={state.oldPassword || ''} 
              onChange={handleChange} 
              onFocus={activateField}
              onBlur={disableField}
              required/>
          </FormItem>


          <FormItem>
            <Label className={state.passwordFieldActive ? "field-active" : ""}>new password </Label>
            <Input 
              name="password" 
              type="password" 
              value={state.password} 
              onChange={handleChange} 
              onFocus={activateField}
              onBlur={disableField}/>
          </FormItem>
          

          <FormItem>
            <Label className={state.password_confirmationFieldActive ? "field-active" : ""}>new password confirmation</Label>
            <Input 
              name="password_confirmation" 
              type="password" 
              value={state.password_confirmation} 
              onChange={handleChange} 
              onFocus={activateField}
              onBlur={disableField}/>
          </FormItem>

          <FormItem >
            <Label className={state.nickFieldActive ? "field-active" : ""}>Display name</Label>
            <Input 
              name="nick" 
              type="text" 
              
              value={state.nick} 
              onChange={handleChange} 
              onFocus={activateField}
              onBlur={disableField}
              required/>
          </FormItem>
            
            
            <input 
              style={{
                width: ".1px",
                height: ".1px",
                opacity: "0",
                overflow: "hidden",
                position: "absolute",
                zIndex: "-1"


              }}
              id="avatar"
              type="file" 
              name="avatar"
              
              accept="image/*"
              onChange={handleImageChange}/>
              
              

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