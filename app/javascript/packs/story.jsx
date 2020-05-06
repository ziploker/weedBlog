import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';

import {useParams} from 'react-router-dom'
import { instanceOf } from 'prop-types';
  

const StorySection = styled.section`

    width:100%;
    height: 350px;
    //border: 1px solid orange;
    
    
    border-bottom: 1px solid orange;


`;


const StoryImage = styled.img`

    width:100%;
    border-top-left-radius: 69px;
    border-top-right-radius: 17px;


`;

const StoryInfo = styled.h1`

    margin: 0px;
    padding: 0px;

    text-align: start;


`;

const StoryBody = styled.p`

    sdfsdfsdfsdf.sdfsdfwd sdfsdfsd sdfsdfsdfs sdfsdfsdfsdf

`;
  
  

function Story(props){
    
    console.log("SSSSSSS");
    console.log(props);
    return (
        <StorySection>
           
            <StoryImage src={props.image}  />
            <StoryInfo >

            {props.info ? props.info.keywords : null}

            </StoryInfo>
            <StoryBody >

                {props.info ? props.info.title :  null }

            </StoryBody>

        </StorySection>
    );
}


export default props => <Story {...props} />;