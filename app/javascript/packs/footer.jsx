import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';

const Footer_Wrapper = styled.div`

    background-color: ${props => props.theme.pink};    
    height: 175px;
    
    



`;


function Footer (props) {





    return (

        <Footer_Wrapper />



    );



}


export default props => <Footer {...props} />