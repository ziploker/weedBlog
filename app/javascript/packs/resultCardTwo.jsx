import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';



const ResultCardWrapper = styled.div`

  background: green;
  
  justify-content: center;
  align-items: center;
  justify-items: center;
  width: 100%;
  grid-area: results2;
  display: grid;
  max-height: ${ props => props.showForm.toString() == "true" ? "0px" : "100%"};
  opacity: ${ props => props.showForm.toString() == "true" ? "0" : "1"};
  transition: all opacity .3s max-height 1s ease-in;
  

`;

function ResultCardTwo(props){

  
  
  
  
  
  return (
    
    <ResultCardWrapper showForm={props.showForm} className={props.showForm.toString() == "false" ? 'fadeIn':'fadeOut'}>

      <h4>{props.results.two.fullDistrict ? props.results.two.fullDistrict : ""} </h4>
      <img  src={props.results.two ? props.results.two.image : placeholder} style={{width: "143px", height: "200px", borderRadius: "15px"}}/>
      <h4 style={{margin: "0"}}>{props.results.two.chamber === "Senate" ? "Senator": "Representative"}</h4>
      <h1 style={{margin: "0", fontSize: "1em"}}>{props.results.two.name ? props.results.two.name : ""} ({props.results.two.party === "Democrat" ? "D" : "R"})</h1>

      
        

    </ResultCardWrapper>

  )
    
        
}


export default props => <ResultCardTwo {...props} />;