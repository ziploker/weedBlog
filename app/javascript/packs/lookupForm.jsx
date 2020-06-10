import React, {Component, useEffect, useState, useRef} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import $ from 'jquery';
//import lilDownArrow from '../../../../'
//import '../components/fix.js'

import Progress from './progressBar/progressBar.jsx'

var Spinner = require('react-spinkit');


const Section = styled.section`

    //background: rgb(136,189,188);
    //background: radial-gradient(circle, rgba(136,189,188,1) 0%, rgba(158,190,189,0.9612044646960347) 41%);
    background: #F7C562;
    //height: 100vh;
    min-height: 400px;
    position: relative;

`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 350px;
  
  justify-content: center;
  align-items: center;
  justify-self: center;
  
  grid-column-start: 1;
  grid-column-end: -1;
  justify-self: center;
  align-self: center;
  justify-items: center;
  max-height: ${ props => props.showForm.toString() == "true" ? "100%" : "0"};
  opacity: ${ props => props.showForm.toString() == "true" ? "1" : "0"};
  //transition: opacity 2s, display 2s;
  //transition-timing-function: ease-in;
`;
const Form = styled.form`

  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  justify-items: center;
  //grid-auto-rows: minmax(min-content, max-content);
  
  //grid-gap: 1.5rem;
  //height: 175px;
  width: 100%;



  background: #F9F9F9;
  padding: 25px;
  
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);

`;




const OptionWrapper = styled.div`


`;


const formData = new FormData();







function Lookup(props) {

    
  const handleAdd = e => {

    
    
    e.preventDefault();
    
    if ( validForm() ) {
      
      
      
     
      props.setPercentOpacity(1)
     
      formData.append('event[address]', props.formInfo.address);
      formData.append('event[zipcode]', props.formInfo.zipcode);
      const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");  
     
          
          
      fetch('/lookup', {
      
        method: 'post',
        
        dataType: "text",
        
        body: JSON.stringify(
          {"lookup" : {
            "address" : props.formInfo.address,
            "zipcode" : props.formInfo.zipcode
          }}),
      
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrf
        }
      })
      .then(response => response.json() )
      .then(data => {
        
        
        
        props.setShowForm(false);
        props.setResults(data);

        
        
        
      })
      
     
      
          
    } else {
      alert('Please fill all fields.');
    }
  }

  
  const validForm = () => {
    if (props.formInfo.address && props.formInfo.zipcode  ) {
      return true;
    } else {
      return true;
    }
  }

  
  
  
  
  
  return(

    <FormWrapper showForm={props.showForm}>
      
      <Form className="form-inline" onSubmit={handleAdd}  >
        
        <h3 style={{
          display: "block",
          
          fontWeight: "300",
          marginBottom: "10px"


        }}>Colorlib Contact Form</h3>
        
        <div style={{
          
          width: "100%",
          border: "medium none !important",
          margin: "0 0 10px",
          minWidth: "100%",
          padding: "50"
  
          
          
          }} >
        
          <input type="text" 
            
            tabindex="1" required autofocus
            className="form-control"
            name="address"
            
            placeholder="address"
            
            value={props.formInfo.address}
            onChange={props.handleChange} 
            style={{width: "100%"}}
          />
        </div>

        
        
        <div style={{
          
          width: "100%",
          border: "medium none !important",
          margin: "0 0 10px",
          minWidth: "100%",
          padding: "50"
  
          
          
          }} >
        
          <input type="text"
                
                tabindex="2" required autofocus
                className="form-control"
                name="zipcode"
                //focus="phoneIsFocused"
                placeholder="zip code"
                
                value={props.formInfo.zipcode}
                onChange={props.handleChange} 
                style={{width: "100%"}}
              
                />
          
        </div>

        

        
        <button type="submit" className="btn btn-primary" style={{width: "100%"}}>GO</button>
        <Progress percent={props.percent} opacity={props.percentOpacity} />
        
        <Spinner name='wave' color='orange' />
      </Form>

     
      
    </FormWrapper>
  )
}


//const ReCaptcha = styled.div``;







export default props => <Lookup {...props} />;
