import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';


const ResultCardWrapper = styled.div`

  background: blue;
  
  justify-content: center;
  align-items: center;
  justify-items: center;
  width: 100%;
  display: grid;
  grid-area: results1;
  max-height: ${ props => props.showForm.toString() == "true" ? "0px" : "100%"};
  opacity: ${ props => props.showForm.toString() == "true" ? "0" : "1"};
  transition: opacity 2s, display 2s;
  transition-timing-function: ease-in;
  
  
  
  


`;

function ResultCardOne(props){

  
  
  
  
  
  return (
    
    <ResultCardWrapper showForm={props.showForm} >

        
                
      
      <h4>{props.results.one.fullDistrict ? props.results.one.fullDistrict : ""} </h4>
      <img src={props.results.one ? props.results.one.image : placeholder} style={{width: "143px", height: "200px", borderRadius: "15px"}}/>
      <h4 style={{margin: "0"}}>{props.results.one.chamber === "Senate" ? "Senator": "Representative"}</h4>
      <h1 style={{margin: "0", fontSize: "1em"}}>{props.results.one.name ? props.results.one.name : ""} ({props.results.one.party === "Democrat" ? "D" : "R"})</h1>
      
      
        

    </ResultCardWrapper>

  )
    
        
}


export default props => <ResultCardOne {...props} />;