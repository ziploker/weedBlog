//////////////////////////////////  IMPORTS and GLOBAL VARS ////////////
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
const formData = new FormData();


///////////////////////////////////////  STYLED COMPONENTS ////////////



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



const Button = styled.button`

  width: 100%;
  height: 35px;
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

`;



const StatusBar = styled.div`

  max-height: ${ props => props.showStatus.toString() == "true" ? "100%" : "100%"};
  opacity: ${ props => props.showStatus.toString() == "true" ? "1" : "1"};
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



const ResultSpan = styled.div`
  
  &:hover{

    background-color: orange;
    //color: red;
    //font-size: 3em;
  }

`;




////////////////////////////////////////////////////////// MAIN FUNCTION //////////
function Lookup(props) {

  //search options for 'react places autocomplete
  const searchOptions = {
    componentRestrictions: { country: ['us'] }
  }
  
  //address selected from dropdown box///////////////////  HANDLE_SELECT  /////////
  const handleSelect = address => {
    
    console.log("inHandleSelect")
    
    //populate the input with the address selected from 'react places autocomplete'
    props.setFormInfo( {address : address} ) 
    
    
    //get the lat/lng of the address selected and save to state
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        
        console.log('Success', latLng)
        props.setCoordinates({
        
          lat: latLng.lat,
          lng: latLng.lng

        })
      }).catch(error => console.error('Error', error));
  };

  
  ///SEARCH BUTTON CLICKED///////////////////////////////// HANDLE_ADD  //////////
  const handleAdd = e => {

    
    //user enters address but doesnt choose one from "react places autocomplete"
    //and thus bypasses handkeSelect method, which gets the lat lng, so get lat lan otherway
    let secondTryLat = ''
    let secondTryLng = ''
    
    e.preventDefault();
    
    if ( validForm() ) {
      
      //set current Search term state from input
      props.setCurrentSearchTerm(props.formInfo.address)
      
      //let user know somethings happening
      props.setStatus('....may take up to 60 seconds')
      props.setShowStatus(true)
      props.setShowStatusBar(true)
     
      
      //get formdata ready to send to server
      formData.append('event[address]', props.formInfo.address);
      
      
      //lat lng will be empty if user manually enters address instead if 
      //selecting address from react places autocompete
      if (props.coordinates.lat == '' || props.coordinates.lng == ''){
        
        console.log("lat/lng was empty")
        geocodeByAddress(props.formInfo.address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
        
            console.log('Success2', latLng)

            secondTryLat = latLng.lat
            secondTryLng = latLng.lng
            
        
        
            const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
            
            fetch('/lookup', {
              method: 'post',
              dataType: "text",
              body: JSON.stringify(
                {"lookup" : {
                  "address" : props.formInfo.address,
                  "lat" : secondTryLat,
                  "lng" : secondTryLng
                }}
              ),
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
              props.setShowCards(true)
              props.setResults(data);
            })
        
          }).catch(error => console.error('Error', error));


      }else{
      
       
        console.log("lat was NOT empty")
        const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content"); 
        fetch('/lookup', {
          method: 'post',
          dataType: "text",
          body: JSON.stringify(
            {"lookup" : {
              "address" : props.formInfo.address,
              "lat" : props.coordinates.lat,
              "lng" : props.coordinates.lng
            }}
          ),
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
          props.setShowCards(true)
          props.setResults(data);
        })
      }
      
    } else {
      alert('Please enter valid address.');
    }
  }

  
  ////////////////////////////////////////////////   VALID_FORM  //////
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
            
            
            <div 
              style={{
                position: "absolute",
                zIndex: "1000",
                borderBottom: "honeydew",
                borderLeft: "honeydew",
                borderRight: "honeydew",
                borderTop: "1px solid #e6e6e6",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                backgroundColor: '#FFF',
                fontSize: ".7em",
                borderRadius: "0 0 2px 2px"
              }}
            >
                
              {loading && <div>Loading...</div>}
              
              
              {suggestions.map(suggestion => {
                console.log(suggestions.values().next().value.description)
                //props.setFirstMatch(suggestions.values().next().value.description)
              
                const style = suggestion.active
                  ? { backgroundColor: 'orange', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                
                return (
                
                  <div {...getSuggestionItemProps(suggestion, {style})}>
                    
                    <ResultSpan>{suggestion.description}</ResultSpan>
                  
                  </div>
                
                )
              
              })}
              
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      
      <Button disabled={(!props.formInfo.address || props.currentSearchTerm == props.formInfo.address) ? true : false} type="submit" className="btn btn-primary"> 
    
        <StatusHolder>
          
          <StatusBar showStatus={props.showStatus} >
            <span style={{height: "100%", fontSize: ".75em"}}>{props.status}</span>
            <CheckMark showStatusCheck={props.showStatusCheck} src={greenCheck} style={{paddingLeft: "6px", height: "11px"}}></CheckMark>
          </StatusBar>
        
          <StatusSpinner showStatusBar={props.showStatusBar}>
            <Spinner name='wave' color='orange' />
          </StatusSpinner>

        </StatusHolder>   
      
      </Button>
        
    </Form>

  )
}



export default props => <Lookup {...props} />;
