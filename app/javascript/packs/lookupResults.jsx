import React, {Component, useEffect, useState, useRef} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import $ from 'jquery';
//import lilDownArrow from '../../../../'
//import '../components/fix.js'
import placeholder from '../../assets/images/man.png'




const Look_Up_Results_Wrapper = styled.div`

    
    width: 100%;
    padding: 25px;


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

      
      
    </Look_Up_Results_Wrapper>
  )
}










export default props => <LookupResults {...props} />;
