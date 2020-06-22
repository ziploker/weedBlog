import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';


const ResultCardWrapper = styled.div`

  //padding-bottom: 50px;
  
  justify-content: center;
  align-items: center;
  justify-items: center;
  width: 100%;
  display: grid;
  grid-area: results1;
  //max-height: ${ props => props.showForm.toString() == "true" ? "0px" : "100%"};
  //opacity: ${ props => props.showForm.toString() == "true" ? "0" : "1"};
  //transition: opacity .4s;
  //transition-timing-function: ease-out;

  margin-bottom: 35px;


  background: ${ props => props.results.one.party == "Democrat" ? "#F9F9F9" : "#F9F9F9"};
  //padding: 25px;
  
  //box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);

  //border-right: 1px solid gray;
  
  
  
  


`;

function ResultCardOne(props){

  return (
    
    <ResultCardWrapper showForm={props.showForm} results={props.results}>

      <h4 style={{marginBottom: "15px"}}>{props.results.one.fullDistrict ? props.results.one.fullDistrict : ""} </h4>
      <img src={props.results.one ? props.results.one.image : placeholder} style={{width: "143px", height: "200px", borderRadius: "15px", marginBottom: "15px"}}/>
      <h4 style={{margin: "0"}}>{props.results.one.chamber === "Senate" ? "Senator": "Representative"}</h4>
      <h1 style={{margin: "0", fontSize: ".7em"}}>{props.results.one.name ? props.results.one.name : ""} ({props.results.one.party === "Democrat" ? "D" : "R"})</h1>
      
    </ResultCardWrapper>

  )
    
}


export default props => <ResultCardOne {...props} />;