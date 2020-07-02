import React, {useState} from "react";
import { Link } from 'react-router-dom';
import logoImg from "../../../assets/images/logoPlaceholder.jpg";
import { Card, Logo, Form, Input, Button } from './AuthForm';
import axios from 'axios';

function Signup(props) {

  const [state, setState] = React.useState({
    email: "",
    password: "",
    passwordConfirmation: "",
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
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation

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
    <Card>
      <Logo src={logoImg} />
      <Form onSubmit = {handleSubmit}>
        <Input name="email" type="email" placeholder="email" value={state.email} onChange={handleChange} required/>
        <Input name="password" type="password" placeholder="password" value={state.password} onChange={handleChange} required/>
        <Input name="passwordConfirmation" type="password" placeholder="password confirmation" value={state.passwordConfirmation} onChange={handleChange} required/>

        <Button type="submit">Sign Up</Button>
      </Form>
      <Link to="/login">Already have an account?</Link>
    </Card>
  );
}

export default props => <Signup {...props}/>;