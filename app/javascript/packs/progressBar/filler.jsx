import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';

const Fill = styled.div`

    background: orange;
    height: 100%;
    border-radius: inherit;
    transition: width .2s ease-in;


    




`;


function Filler (props) {





    return (

        <Fill style={{width: props.percent + "%" }}/>



    );



}


export default props => <Filler {...props} />