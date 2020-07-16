import React, {useState} from "react";
import { Link } from 'react-router-dom';
import logoImg from "../../../assets/images/logoPlaceholder.jpg";
import redX from '../../../assets/images/redX.jpg'
import { Card, Logo, Form, Input, Button, Error, RedX, LoginWrapper, InputIcon, LogoWrapper} from './AuthForm';

import axios from 'axios';

function Signup(props) {

  const [state, setState] = React.useState({
    first: "",
    last: "",
    email: "",
    password: "",
    password_confirmation: "",
    registrationErrors: ""
  })

  //const [email, setEmail] = useState("")
  //const [password, setPassword] = useState("")

  //const [passwordConfirmation, setPasswordConfirmation] = useState("")

  //const [registrationErrors, setRegistrationErrors] = useState("")

  
  function handleSubmit(event){
    console.log("about to axios", "abou to axiooos")
    console.log("Rails.env", process.env.NODE_ENV)

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
    {withCredentials: true}
    ).then(response => {
      console.log("regResponse", response)
      if (response.data.status === "created"){
        console.log("==========inside")
        props.handleSuccessfulAuth(response.data)
        //props.history.push("/ziploker")
      }else{
        //update error state
      }
      
    }).catch(error => {
      console.log("RegErrors", error)
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
      <Error status={state.status}>
        <RedX status={state.status} src={redX} style={{backgroundColor: "transparent", height: "20px", verticalAlign: "middle"}}/>
        <span style={{paddingLeft: "10px"}}>{state.error}</span>
      </Error>
      
    </Card>
    <Link to="/login">Already have an account?</Link>
    </LoginWrapper>
  );
}

export default props => <Signup {...props}/>;