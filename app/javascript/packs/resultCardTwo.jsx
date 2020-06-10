import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';



const ResultCardWrapper = styled.div`

  
  
  justify-content: center;
  align-items: center;
  justify-items: center;
  width: 100%;
  grid-area: results2;
  display: grid;
  max-height: ${ props => props.showForm.toString() == "true" ? "0px" : "100%"};
  opacity: ${ props => props.showForm.toString() == "true" ? "0" : "1"};
  //transition: all opacity .3s max-height 1s ease-in;
  transition: opacity 2s, display 2s;
  transition-timing-function: ease-in;

  background: ${ props => props.results.two.party == "Democrat" ? "#dde0ff" : "#ffd1d1"};
  padding: 25px;
  
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  

`;

function ResultCardTwo(props){

  
  
  
  
  
  return (
    
    <ResultCardWrapper showForm={props.showForm} results={props.results}>

      <h4 style={{marginBottom: "15px"}}>{props.results.two.fullDistrict ? props.results.two.fullDistrict : ""} </h4>
      <img  src={props.results.two ? props.results.two.image : placeholder} style={{width: "143px", height: "200px", borderRadius: "15px", marginBottom: "15px"}}/>
      <h4 style={{margin: "0"}}>{props.results.two.chamber === "Senate" ? "Senator": "Representative"}</h4>
      <h1 style={{margin: "0", fontSize: ".7em"}}>{props.results.two.name ? props.results.two.name : ""} ({props.results.two.party === "Democrat" ? "D" : "R"})</h1>

      
        

    </ResultCardWrapper>

  )
    
        
}


export default props => <ResultCardTwo {...props} />;