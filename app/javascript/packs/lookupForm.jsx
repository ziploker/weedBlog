import React, {Component, useEffect, useState, useRef} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import $ from 'jquery';
import greenCheck from '../../assets/images/greenCheck.png'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';


var Spinner = require('react-spinkit');



const FormWrapper = styled.div`
  width: 100%;
  max-width: 350px;
  
  justify-content: center;
  align-items: center;
  justify-self: center;
  
  grid-area: form;
  justify-self: center;
  align-self: center;
  justify-items: center;
  max-height: ${ props => props.showForm.toString() == "true" ? "100%" : "0"};
  opacity: ${ props => props.showForm.toString() == "true" ? "1" : "0"};
  transition: opacity .4s;
  transition-timing-function: ease-out;
`;


const Form = styled.form`

  display: grid;
  grid-template-columns: 90%;
  grid-template-areas:
    "input"
    "button"
    "status";
  justify-content: center;
  
  width: 100%;
  margin-bottom: 20px;
  grid-area: form;

  background: #F9F9F9;
  //padding: 25px;
  
  //box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);

`;







const formData = new FormData();



const Button = styled.button`

  width: 100%;
  grid-area: button;
  background-color: #FFA500;
  border: none;
  cursor: pointer;
  color: black;
  

  &:disabled{
    opacity: .6;
    //cursor: not-allowed;
    background-color: #eae6de;
    &:hover{

      background-color: #FFA500;
        opacity: .6;
        background-color: #eae6de;
        
      }

  
  }
  
`;

  const StatusHolder = styled.div`

    grid-area: status;
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 10px;


  `;
  const StatusBar = styled.div`
  
  
    
  
    max-height: ${ props => props.showStatus.toString() == "true" ? "100%" : "0px"};
    opacity: ${ props => props.showStatus.toString() == "true" ? "1" : "0"};
    transition: opacity .4s;
    transition-timing-function: ease-out;
  `;

  const StatusSpinner = styled.div`
    
    
    
    max-height: ${ props => props.showStatusBar.toString() == "true" ? "100%" : "0px"};
    opacity: ${ props => props.showStatusBar.toString() == "true" ? "1" : "0"};
    transition: opacity .4s;
    transition-timing-function: ease-out;
  `;
  const CheckMark = styled.img`
    
    
    
    max-height: ${ props => props.showStatusCheck.toString() == "true" ? "100%" : "0px"};
    opacity: ${ props => props.showStatusCheck.toString() == "true" ? "1" : "0"};
    transition: opacity .4s;
    transition-timing-function: ease-out;
`;

function Lookup(props) {



  

 

  const searchOptions = {
    componentRestrictions: { country: ['us'] }
  }


  const handleSelect = address => {
    console.log("inHandleSelecr")
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

    
  const handleAdd = e => {

   
    
    e.preventDefault();
    
    if ( validForm() ) {
      
      console.log(e);
      
      props.setCurrentSearchTerm(props.formInfo.address)
      
      props.setStatus('....may take up to 60 seconds')
      props.setShowStatus(true)
      props.setShowStatusBar(true)
     
      formData.append('event[address]', props.formInfo.address);
      //formData.append('event[zipcode]', props.formInfo.zipcode);
      const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");  
     
          
      fetch('/lookup', {
      
        method: 'post',
        
        dataType: "text",
        
        body: JSON.stringify(
          {"lookup" : {
            "address" : props.formInfo.address
            //"zipcode" : props.formInfo.zipcode
          }}),
      
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrf
        }
      })
      .then(response => response.json() )
      .then(data => {
        
        
        
        props.setStatus("Search Complete!!")
        props.setShowStatusBar(false)
        props.setShowStatusCheck(true)
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

    

    
      
      <Form className="form-inline" onSubmit={handleAdd}  >
        
        
        
        

        <PlacesAutocomplete
          value={props.formInfo.address}
          onChange={props.handleChange2}
          onSelect={handleSelect}
          searchOptions={searchOptions}
        >
        
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            
            <div style={{
          
              width: "100%",
              border: "medium none !important",
              margin: "0 0 10px",
              minWidth: "100%",
              padding: "50",
              gridArea: "input"
            
            }}>
              
              <input 

                

                {...getInputProps({
                  placeholder: '123 Main St, Miami FL, 33155',
                  className: 'location-search-input',

                
                  type: "text",
              
                  tabIndex: "1",
                  className: "form-control",
                  name: "address",
            
                  
            
                  
                   
                  
                })}
                style={{
                  width: "100%", 
                  height: "40px",
                  boxShadow: "0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)",
                  border: "honeydew",
                  display: "block",
                  
                  padding: "16px",
                  fontSize: "16px",
                  borderRadius: "2px",
                  outline: "none"
                
                
                
                
                
                }}
              />
            
              <div style={{

                position: "absolute",
                zIndex: "1000",
                borderBottom: "honeydew",
                borderLeft: "honeydew",
                borderRight: "honeydew",
                borderTop: "1px solid #e6e6e6",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                backgroundColor: '#FFF',
                fontSize: ".5em",
                
                
                borderRadius: "0 0 2px 2px"


              }}>
                
                {loading && <div>Loading...</div>}
                
                
                {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: 'orange', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  
                  return (
                  
                    <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                  
                  
                    )
                    
                
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        
        
        
        
          
        
        
        

        

                                  
              <Button disabled={(!props.formInfo.address || props.currentSearchTerm == props.formInfo.address) ? true : false} type="submit" className="btn btn-primary"> Search </Button>
        
              
        
        
        <StatusHolder>
          <StatusBar showStatus={props.showStatus} >
              
            <span style={{paddingTop: "5px", fontSize: ".75em"}}>{props.status}</span>
            
            
          </StatusBar>
          <CheckMark showStatusCheck={props.showStatusCheck} src={greenCheck} style={{paddingLeft: "6px", height: "15px"}}></CheckMark>

          <StatusSpinner showStatusBar={props.showStatusBar}>
            <Spinner name='wave' color='orange' />
            
          </StatusSpinner>

          
            
          
        </StatusHolder>
        
      </Form>

     
      
    

    
    
  )
}


//const ReCaptcha = styled.div``;







export default props => <Lookup {...props} />;
