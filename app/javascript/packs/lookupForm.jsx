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


const Form = styled.form`

  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  justify-items: center;
  //grid-auto-rows: minmax(min-content, max-content);
  
  //grid-gap: 1.5rem;
  //height: 175px;
  max-width: 450px;

`;


const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  //padding: 20px;
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
        
        
        console.log(data.one.name)
        props.setResults(data)
        
        
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

    <FormWrapper>
      <Form className="form-inline" onSubmit={handleAdd}  >
        
        
        <div className="field" style={{width: "100%"}}>
        
          <input type="text"
            
            
            className="form-control"
            name="address"
            
            placeholder="address"
            
            value={props.formInfo.address}
            onChange={props.handleChange} 
            style={{width: "100%"}}
          />
        </div>

        
        
        <div className="field" style={{width: "100%"}} >
        
          <input type="text"
                
                
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
