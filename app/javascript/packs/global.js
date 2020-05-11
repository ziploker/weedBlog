import React, {useEffect, useState} from 'react'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

a, a:active, a:focus{

  outline: none; /* Works in Firefox, Chrome, IE8 and above */ 

}
  
  html{
    margin: 0;
    padding: 0;
    overflow-y: scroll;

  }
  
  
  
  body {
    
    font-family: 'Ubuntu', sans-serif;
    overflow-x: hidden;
    /*overflow-y: scroll;*/
    padding: 0px 10px 0px;
    
}
  }
  
  *, *::after, *::before {
    box-sizing: border-box;
  }
  

  a{

    text-decoration: none;
    color: black;
    text-align: center;
    
    
  
  
`

export default props => <GlobalStyles {...props} />;