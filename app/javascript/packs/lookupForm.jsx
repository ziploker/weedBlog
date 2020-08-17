//////////////////////////////////  IMPORTS and GLOBAL VARS ////////////
import React, {Component, useEffect, useState, useRef} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import $ from 'jquery';
import greenCheck from '../../assets/images/greenCheck.png'
import searchIcon from '../../assets/images/search.png'
import searchIconOrange from '../../assets/images/searchPink.png'
import searchIconOrange2 from '../../assets/images/searchPink2.png'

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
  max-width: 555px;
  margin: 30px 0px 20px 0px;
  grid-area: form;
  

  //background: #F9F9F9;
  //padding: 25px;
  
  //box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);

`;



const Button = styled.button`

  
  height: 40px;
  width: 50px;
  //grid-area: button;
  background-color: #e8e5e5;
  //background-image: ${props => props.searchButtonActive ? 'url(' +searchIconOrange+ ')' : 'url(' +searchIcon +')'};
  background-image: url( ${searchIconOrange});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center; 
  border: 5px solid #e8e5e5;
  //border: none;
  z-index: 999;
  cursor: pointer;
  color: black;
  position: absolute;
  right: 0;
  z-index: 1002;
  
  transition: background-image 1s;
  transition-timing-function: ease-in;
  filter: ${props => props.searchButtonActive ? 'grayscale(0%)' : 'grayscale(80%)'};
  //filter: ${props => props.searchButtonActive ? 'sepia(0%)' : 'sepia(60%)'};

  &:hover{
    
    //background-image: url( ${searchIconOrange});transition: background-image 1s;
    transition-timing-function: ease-in;
    filter: grayscale(0%);
    //filter: sepia(0%);


  }

  //&:disabled{
  //  opacity: .6;
  //  cursor: default;
  //  background-color: #eae6de;
  //  &:hover{

  //    background-color: #FFA500;
  //      opacity: .6;
  //      background-color: #eae6de;
        
  //  }
  //}

  
`;



const StatusHolder = styled.div`

  grid-area: status;
  display: flex;
  justify-content: center;
  align-content: center;

`;



const StatusBar = styled.div`

  max-height: 100%;
  opacity: 1;
  transition: opacity .4s;
  transition-timing-function: ease-in;

`;



const StatusSpinner = styled.div`
  
  max-height: ${ props => props.showStatusSpinner.toString() == "true" ? "100%" : "0px"};
  opacity: ${ props => props.showStatusSpinner.toString() == "true" ? "1" : "0"};
  transition: opacity .4s;
  transition-timing-function: ease-out;

`;



const CheckMark = styled.img`
  
  max-height: ${ props => props.showStatusCheck.toString() == "true" ? "100%" : "0px"};
  opacity: ${ props => props.showStatusCheck.toString() == "true" ? "1" : "0"};
  transition: opacity .4s;
  transition-timing-function: ease-out;
  padding-left: 6px;
  height: 11px;

`;



const ResultSpan = styled.div`
  
  &:hover{

    background-color: #56c5cc;
    //color: red;
    //font-size: 3em;
  }

`;


const Span = styled.span`

  height: 100%;
  font-size: .75em;
  transition: opacity 2s ease-in;
  opacity: ${props => props.status.toString() == "Enter an address." ? "0" : "1"};
            

`;

////////////////////////////////////////////////////////// MAIN FUNCTION //////////
function Lookup(props, ref) {

   // to activate the input field while typing
   function activateField(e) {
    
    
    props.setSearchButtonActive( true)
  
  }

  // to deactivate input only if it's empty
  function disableField(e) {
    if (e.target.value == ""){
    props.setSearchButtonActive( false)
  }
    
  }

  

  //search options for 'react places autocomplete
  const searchOptions = {
    componentRestrictions: { country: ['us'] }
  }
  
  //address selected from dropdown box///////////////////  HANDLE_SELECT  /////////
  const handleSelect = address => {
   
    //populate the input with the address selected from 'react places autocomplete'
    props.setFormInfo( {address: address} ) 
    
    
    //get the lat/lng of the address selected and save to state
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        
        props.setCoordinates({
        
          lat: latLng.lat,
          lng: latLng.lng

        })
      }).catch(error => {
        props.setStatus("No results found. Check address")
        props.setShowStatusSpinner(false)
        console.error('Error', error);
      })
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
      props.setLastTermSearched(props.formInfo.address)
      
      //let user know somethings happening
      props.setStatus('....may take up to 60 seconds')
      
      props.setShowStatusSpinner(true)
     
      
      //get formdata ready to send to server
      formData.append('event[address]', props.formInfo.address);
      
      
      //lat lng will be empty if user manually enters address instead if 
      //selecting address from react places autocompete
      if (props.coordinates.lat == '' || props.coordinates.lng == ''){
        
        geocodeByAddress(props.formInfo.address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
        
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
              props.setShowStatusSpinner(false)
              props.setShowStatusCheck(true)
              props.setShowCards(true)
              props.setResults(data);
            })
        
          }).catch(error => {
            
            props.setStatus("No results found. Check address")
            props.setShowStatusSpinner(false)
            console.log("Error", error)
        
          })


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
          props.setShowStatusSpinner(false)
          props.setShowStatusCheck(true)
          props.setShowCards(true)
          props.setResults(data);
        })
      }
      
    }
  }

  
  ////////////////////////////////////////////////   VALID_FORM  //////
  const validForm = () => {
    if (props.formInfo.address == "" ){
      props.setStatus("Enter an address.")
      props.setShowStatusCheck(false)

      setTimeout( () => {props.setStatus("")}, 2000 )
      
      return false;
    
    }else if(props.formInfo.address == props.lastTermSearched){
      props.setStatus("Enter a different address.")
      props.setShowStatusCheck(false)
      return false;

    }else{
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
            zIndex: "1000",
            gridArea: "input",
            position: "relative"
          }}>

            <Button searchButtonActive={props.searchButtonActive} disabled={false} type="submit" className="btn btn-primary"> </Button>
            

            
            <input 
              {...getInputProps({
                placeholder: '123 Main St, Miami FL, 33155',
                className: 'location-search-input',
                type: "text",
                tabIndex: "1",
                className: "form-control",
                name: "address",
                onFocus: activateField,
                onBlur: disableField,
                ref: ref
                
              })}
              style={{
                width: "100%", 
                height: "40px",
                boxShadow: "0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)",
                border: "honeydew",
                display: "block",
                paddingLeft: "10px",
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
                  ? { backgroundColor: '#56c5cc', cursor: 'pointer' }
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
      

      
    
      <StatusHolder>
        
        <StatusBar>
          
          <Span status={props.status}> {props.status}</Span>
          <CheckMark showStatusCheck={props.showStatusCheck} src={greenCheck}></CheckMark>
        </StatusBar>
      
        <StatusSpinner showStatusSpinner={props.showStatusSpinner}>
          <Spinner name='wave' color='#56c5cc' />
        </StatusSpinner>

      </StatusHolder>   
    
        
    </Form>

  )
}

const Rollup = React.forwardRef(Lookup);

export default Rollup;
