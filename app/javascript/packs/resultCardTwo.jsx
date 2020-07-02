import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';
import man from '../../assets/images/man.png'



const ResultCardWrapper = styled.div`

  
  
  justify-content: center;
  align-items: center;
  justify-items: center;
  width: 100%;
  //grid-area: results2;
  display: grid;
  max-height: ${ props => props.showCards.toString() == "false" ? "0px" : "100%"};
  opacity: ${ props => props.showCards.toString() == "false" ? "0" : "1"};
  transition: all opacity .3s max-height 1s ease-in;
  transition: opacity .4s;
  transition-timing-function: ease-out;

  background: ${ props => props.results.two.party == "Democrat" ? "#F9F9F9" : "#F9F9F9"};
  //padding: 25px;
  
  //box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  

`;

function ResultCardTwo(props){

  
  
  
  
  
  return (
    
    <ResultCardWrapper showCards={props.showCards} results={props.results}>

      <h4 >{props.results.two.fullDistrictTrunk ? props.results.two.fullDistrictTrunk : ""} </h4>
      <img src={props.results.two.image ? props.results.two.image : man} style={{width: "143px", height: "200px", borderRadius: "15px", marginBottom: "15px", focus: "blur(1.7rem)"}}/>
      <h4 style={{margin: "0"}}>{props.results.two.chamber ? props.results.two.chamber === "Senate" ? "Senator": "Representative" : ""}</h4>
      <h1 style={{margin: "0", fontSize: ".7em"}}>{props.results.two.name ? props.results.two.name : ""} {props.results.two.party ? props.results.two.party === "Democrat" ? "(D)" : "(R)" : ""}</h1>
      <h3 style={{margin: "0"}}>{props.results.two.district ? "District " + props.results.two.district   : ""}</h3>

        

    </ResultCardWrapper>

  )
    
        
}


export default props => <ResultCardTwo {...props} />;