import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';

import {useParams} from 'react-router-dom'
import { instanceOf } from 'prop-types';


import {
    
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
  
} from "react-share";
  

const StorySection = styled.section`

    max-width:450px;
    //height: 350px;
    //border: 1px solid orange;
    
    margin-bottom: 20px;
    //border: 1px solid orange;
    //border-top-left-radius: 17px;
    //border-top-right-radius: 17px;

    
    display: grid;
    grid-template-rows: 30% 2em 1fr;  

    grid-template-areas:
        "body"
        "grayArea"
        "picture";


`;

const StoryImageWrapper = styled.div`

    
    border-top-left-radius: 17px;
    border-top-right-radius: 17px;

    
    grid-area: picture;
    
    
    
   
    
    
    

    
    



`;
const StoryImage = styled.img`

    width:100%;
    height: 100%;
    border-top-left-radius: 17px;
    border-top-right-radius: 17px;
    position: relative;
    
    z-index: -20;

    


`;

const LeftWrapper = styled.div`


    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;

`;

const StoryInfoWrapper = styled.div`

    

    

    
    grid-area: grayArea;
    text-align: start;

    display: flex;
    justify-content: space-between;
    align-items: center;

    


`;

const StoryInfo = styled.h3`

    
    margin: 0px;
    padding: 0px;
    font-size: .5em;
    padding-left: 10px;
    color: #818080;


`;

const StoryShareButtons = styled.div`

    
    display: flex;
    justify-content: space-between;

    


`;


const StoryTags = styled.div`

    
    width: 80px;
    height: 25px;
    border-radius: 4px;
    background-color: orange;
    opacity: .6;
    


`;

const Tag = styled.h3`

    
   color: white;
   margin: 0px;
    text-align: center;
    line-height: 25px;
    font-size: .7em;
    


`;

const StoryBodyWrapper = styled.div`

    
    text-align: center;

`;

const StoryBody = styled.h1`

    
    font-weight: 700;
    grid-area: body;
    margin: 0px;
    padding: 10px 11px 11px 11px;
    
    

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
                
                
                <StoryShareButtons>
                    <FacebookShareButton children={<FacebookIcon size={25} round={false} borderRadius={17} />} url={"www.420.com"} style={{marginRight: "3px"}} />
                    <TwitterShareButton children={<TwitterIcon size={25} round={false} borderRadius={17}/>} url={"www.420.com"} style={{marginRight: "3px"}}/>
                    <WhatsappShareButton children={<WhatsappIcon size={25} round={false} borderRadius={17}/>} url={"www.420.com"} />
                </StoryShareButtons>

                <StoryInfo>

                    {props.info ? props.info.date : "nada"}
                    
                </StoryInfo>
            

                <StoryTags>
                    <Tag>
                        {props.info ? props.info.topic : null}
                    </Tag>
                </StoryTags>

            </StoryInfoWrapper>
            
            
            
            <StoryBodyWrapper>
                <StoryBody >

                    {props.info ? props.info.title :  null }

                </StoryBody>
            </StoryBodyWrapper>

        </StorySection>
    );
}


export default props => <Story {...props} />;