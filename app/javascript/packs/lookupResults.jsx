import React, {Component, useEffect, useState, useRef} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import $ from 'jquery';
//import lilDownArrow from '../../../../'
//import '../components/fix.js'
import placeholder from '../../assets/images/man.png'




const Look_Up_Results_Wrapper = styled.div`

    background: pink;
  //  display: grid;
  //  grid-template-columns: 1fr 1fr;
    width: 100%;
    padding: 25px;


`;

const One = styled.div`

  background: blue;
  display: grid;
  justify-content: center;
  align-items: center;
  justify-items: center;


`;

const Two = styled.div`


  background: green;

`;



function LookupResults(props) {
  {console.log("inResults------------------------")}
  {console.log(props.results.data)}
  //props.setPercent(100)
  //props.setPercentOpacity(0)


  useEffect(() => {
    //props.setPercent(100)
    //props.setPercentOpacity(0)
    
  },[]);

  return(

    <Look_Up_Results_Wrapper>

      <One>

        
        {console.log("inResults")}
        {console.log(props.results)}
        
        <img src={props.results.one ? props.results.one.image : placeholder} style={{width: "143px", height: "200px"}}/>
        <h2>{props.results.one ? props.results.one.party : ""}</h2>
        <h1>{props.results.one ? props.results.one.name : "Name"}</h1>
        <h4>chamber: {props.results.one ? props.results.one.chamber : ""}</h4>
        <h4> email: {props.results.one ? props.results.one.email : ""} </h4>
        

        



        
      </One>

      <Two>

      <img src={props.results.two ? props.results.two.image : placeholder} style={{width: "143px", height: "200px"}}/>
      <h2>{props.results.two ? props.results.two.party : ""}</h2>
      <h1>{props.results.two ? props.results.two.name : "Name"}</h1>
      <h4>chamber: {props.results.two ? props.results.two.chamber : ""}</h4>
      <h4> email: {props.results.two ? props.results.two.email : ""} </h4>

      </Two>
      
    </Look_Up_Results_Wrapper>
  )
}










export default props => <LookupResults {...props} />;
