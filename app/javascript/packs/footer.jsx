import React, {useEffect, useState, useRef} from 'react';
import {Link, useLocation} from 'react-router-dom'

import styled, { ThemeProvider } from 'styled-components';

const Footer_Wrapper = styled.div`

    background-color: ${props => props.theme.pink};    
    height: 175px;
    
    



`;


function Footer (props) {

    const locationFromHook = useLocation();

    
    
    
    
    if (
    
        locationFromHook.pathname === "/login" || 
        locationFromHook.pathname === "/signup" ||
        locationFromHook.pathname === "/forgot" ||
        locationFromHook.pathname === "/edit" ||
        locationFromHook.pathname === "/change") {
    
            return null
        }    
    return (

        <Footer_Wrapper />



    );



}


export default props => <Footer {...props} />