import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';

import {useParams} from 'react-router-dom'
  


  

function Letter(){
    
    let { id } = useParams();
    
    return (

        <>
        <h1> LETTER </h1>

        <h2>ID was {id} </h2>
            
        </>
    );
}


export default props => <Letter {...props} />;