import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';

import {useParams} from 'react-router-dom'
  


  

function Letter(props){
    console.log('letter##');
    console.log(props);
    
    let { id } = useParams();
    
    return (
        <div style={{padding: '30px'}}>sdSAFDSF  sdfasdfasdsdfsdf
        asdfasdfasdfasdf
        asdfasdfasdfasdfasdfasdf
        asdfasdfasdfasdfasdfasdfasd</div>
    );
}


export default props => <Letter {...props} />;