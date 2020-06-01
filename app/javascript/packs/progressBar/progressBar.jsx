import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Filler from '../progressBar/filler.jsx'
const Progress = styled.div`
    
    position: relative;
    height: 20px;
    width: 100%;
    border-radius: 50px;
    border: 1px solid #333;
    transition: opacity .4s ease-in;
    
    
`;


function ProgressBar (props) {

    
    


    return (

        <Progress style={{opacity: props.opacity}}>

            <Filler percent={props.percent}/>

        </Progress>



    );



}


export default props => <ProgressBar {...props} />