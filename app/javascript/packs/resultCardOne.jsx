import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';
import man from '../../assets/images/man.png'
import elephant from '../../assets/images/elephant.png'
import donkey from '../../assets/images/donkey.png'
import star from '../../assets/images/star.png'



const ResultCardWrapper = styled.div`
  background-color: transparent;
  //padding-bottom: 50px;
  
  justify-content: center;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 100%;
  //display: grid;
  //grid-area: results1;
  max-height: ${ props => props.showCards.toString() == "false" ? "0px" : "100%"};
  opacity: ${ props => props.showCards.toString() == "false" ? "0" : "1"};
  transition: opacity .4s;
  transition-timing-function: ease-out;
  


  


  //background: ${ props => props.results.one.party == "Democrat" ? "#F9F9F9" : "#F9F9F9"};
  //padding: 25px;
  
  //box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);

  border-right: 1px solid gray;

    
  
  
  
  


`;

const Card = styled.div`

  --borderWidth: 6px;
  

  border-top: var(--borderWidth) solid ${props => props.theme.lightBlue};
  border-left: var(--borderWidth) solid ${props => props.theme.lightBlue};
  border-bottom: var(--borderWidth) solid ${props => props.theme.pink};
  border-right: var(--borderWidth) solid ${props => props.theme.pink};
  position: relative;
  //display: grid;
  width: 100.34%;
  height: 100%;
  //grid-template-columns: 300px;
  //grid-template-rows: 375px;
  
  



`;

const TopBar = styled.div`
  grid-area: logo;
  justify-self: center;
  align-self: center;
  width: 30px;
  height:30px;
  border-radius: 50%;
  
  background: ${props => props.theme.offWhite};
  

`;

const BottomBar = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  z-index: 9999;
  width: 83%;
  //height: 60px;
  transform: skew(-15deg);
  background: ${props => props.theme.blueGray};
  border: 1px solid ${props => props.theme.offWhite};
  display: grid;
  grid-template-rows: 50% 50%;
  grid-template-columns: 40px 1fr;
  grid-row-gap: 5px;
  padding-top: 5px;

  grid-template-areas:
    "logo party"
    "name name";

`;


function ResultCardOne(props){

  return (
    
    <ResultCardWrapper showCards={props.showCards} results={props.results}>
      
      <Card>

        <img src={props.results.one.image ? props.results.one.image : man} style={{width: "100%", height: "100%"}}/>
        
        <BottomBar>

        
          <TopBar>
            

          </TopBar>
          <img src={props.results.one.party ? props.results.one.party === "Democrat" ? donkey : elephant : star} style={{
              width: "20px", 
              height:"20px", 
              
              gridArea: "logo",
              alignSelf: "center",
              justifySelf: "center"
            }}></img>
        
          <h3 style={{gridArea: "party", justifySelf: "start", alignSelf: "end", margin: "0", color: "white"}}>{props.results.one.chamber ? props.results.one.chamber === "Senate" ? "Senator": "Representative" : ""}</h3>

        
        

        
        <h5 style={{gridArea: "name", margin: "0", color: "white", padding: "0px 5px 4px 8px", lineHeight: "90%"}}>{props.results.one.name ? props.results.one.name : ""} </h5>
        


      



      </BottomBar>




      </Card>
      
      
      
      
      
      
      
      
      
      
    </ResultCardWrapper>

/*
<h3 style={{margin: "0"}}>{props.results.one.chamber ? props.results.one.chamber === "Senate" ? "Senator": "Representative" : ""}</h3>
<h2 style={{margin: "0", textAlign: "center"}}>{props.results.one.name ? props.results.one.name : ""} {props.results.one.party ? props.results.one.party === "Democrat" ? "(D)" : "(R)" : ""}</h2>

<img src={props.results.one.image ? props.results.one.image : man} style={{width: "143px", height: "200px", borderRadius: "15px", marginBottom: "15px", focus: "blur(1.7rem)"}}/>
<h4>{props.results.one.fullDistrictTrunk ? props.results.one.fullDistrictTrunk : ""} </h4>

<h3 style={{margin: "0"}}>{props.results.one.district ? "District " + props.results.one.district   : ""}</h3>
*/

  )
    
}


export default props => <ResultCardOne {...props} />;