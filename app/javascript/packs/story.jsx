import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';

import {useParams} from 'react-router-dom'
import { instanceOf } from 'prop-types';
  

const StorySection = styled.section`

    width:100%;
    //height: 350px;
    //border: 1px solid orange;
    
    margin-bottom: 20px;
    //border: 1px solid orange;
    //border-top-left-radius: 17px;
    //border-top-right-radius: 17px;


    display: grid;
    grid-template-rows: 30% 2em 1fr;  

    grid-template-areas:
        "picture"
        "grayArea"
        "body";


`;

const StoryImageWrapper = styled.div`

    
    border-top-left-radius: 17px;
    border-top-right-radius: 17px;

    grid-area: 1 / 1 / 3 / 2; 
    
    
    
   
    
    background: rgba(255,255,255,0);
    background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0.98) 98%, rgba(255,255,255,1) 100%);
    background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,255,255,0)), color-stop(60%, rgba(255,255,255,0.6)), color-stop(98%, rgba(255,255,255,0.98)), color-stop(100%, rgba(255,255,255,1)));
    background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0.98) 98%, rgba(255,255,255,1) 100%);
    background: -o-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0.98) 98%, rgba(255,255,255,1) 100%);
    background: -ms-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0.98) 98%, rgba(255,255,255,1) 100%);
    background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0.98) 98%, rgba(255,255,255,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ffffff', GradientType=0 );



`;
const StoryImage = styled.img`

    width:100%;
    border-top-left-radius: 17px;
    border-top-right-radius: 17px;
    position: relative;
    
    z-index: -20;


`;

const StoryInfoWrapper = styled.div`

    

    

    
    grid-area: grayArea;
    text-align: start;

    display: flex;
    justify-content: start;
    align-items: end;

    


`;

const StoryInfo = styled.h3`

    
    margin: 0px;
    padding: 0px;
    font-size: .7em;
    padding-left: 14px;
    


`;

const StoryBody = styled.h1`

    font-size: 2.6em;
    
    grid-area: body;
    margin: 0px;
    padding: 0px;
    padding-left: 19px;
    padding-right: 19px;
    

`;
  
  

function Story(props){
    
    console.log("SSSSSSS");
    console.log(props);
    return (
        <StorySection>
            
            <StoryImageWrapper>
                <StoryImage src={props.info ? props.info.url : null}  />
            </StoryImageWrapper>
            
            <StoryInfoWrapper >

                <StoryInfo>

                    {props.info ? props.info.date : "nada"}
                </StoryInfo>

            </StoryInfoWrapper>
            
            <StoryBody >

                {props.info ? props.info.title :  null }

            </StoryBody>

        </StorySection>
    );
}


export default props => <Story {...props} />;