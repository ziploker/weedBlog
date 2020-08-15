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
    
    border: 3px double ${props => props.theme.pink};
   
    //padding: 15px;
    background-color: white;
    display: grid;
    grid-template-rows: auto;  

    grid-template-areas:
        "picture"
        "grayArea"
        "body"
        "time"
    ;

    @media screen and (min-width: 750px) and (max-width: 1111px){

        max-width: 88%;
        width: 100%;
        padding: 0px;
        display: grid;
        grid-gap: 10px;
        grid-template-columns: 110px 1fr;
        grid-auto-rows: min-content;
        justify-content: center;
        align-items: center;
        
        grid-template-areas:
            "picture body"
            "picture time"
        ;
            
            


    }
`;


const StoryImage = styled.img`

    width:100%;
    height: 100%;
    min-height: 90px;
    grid-area: 1 /1 /3 /-1;
    
    
    @media screen and (min-width: 750px) and (max-width: 1111px){
        width: 110px;
        height: 90px;
        grid-area: picture;
        padding-left: 10px;
        align-self: center;
        justify-self: center;

    }
    


    


`;

const StoryImageWrapper = styled.div`

    
   
    grid-area: 1 /1 /3 /-1;
    

    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#ffffff+0,ffffff+100&0+67,1+100 */
    background: -moz-linear-gradient(top,  rgba(255,255,255,0) 0%, rgba(255,255,255,0) 67%, rgba(255,255,255,1) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top,  rgba(255,255,255,0) 0%,rgba(255,255,255,0) 67%,rgba(255,255,255,1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom,  rgba(255,255,255,0) 0%,rgba(255,255,255,0) 67%,rgba(255,255,255,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=0 ); /* IE6-9 */
    
    
    @media screen and (min-width: 750px) and (max-width: 1111px){


        display: none;
    }



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



const StoryShareButtons = styled.div`

    
    display: flex;
    justify-content: space-between;

    


`;


const StoryTags = styled.div`

    font-size: .7em;
    width: 80px;
    height: 23px;
    border-radius: 4px;
    background-color: orange;
    opacity: .9;

    grid-area: grayArea;
    justify-self: center;

    @media screen and (min-width: 750px) and (max-width: 1111px){


        display: none;
    }
    
    


`;

const Tag = styled.h3`

    font-weight: 900;
    color: black;
    margin: 0px;
    text-align: center;
    line-height: 23px;
    font-size: .9em;
    //padding: 5px 10px;

    @media screen and (min-width: 750px) and (max-width: 1111px){


        display: none;
    }
  
    

`;



const StoryBody = styled.h1`

    
    font-weight: 700;
    grid-area: body;
    margin: 0px;
    //padding: 0px 11px 11px 11px;
    text-align: center;
    line-height: 1.2em;
    margin-bottom: 15px;
    
    @media screen and (min-width: 750px) and (max-width: 1111px){

        margin: 0;
        padding: 0 10px;
        //font-size: 1em;
        text-align: left;
        justify-self: start;

    }

    

`;


const StoryInfo = styled.h3`

    
    margin: 0px;
    padding: 0px;
    font-size: .9em;
    
    
    color: #818080;
    grid-area: "time";
    justify-self: center;

    @media screen and (min-width: 750px) and (max-width: 1111px){


        justify-self: end;
        align-self: flex-end;
        //font-size: .9em;
        padding: 0px 10px 0px 0px;
    }

`;

  
  

function Story(props){
    
    
    return (
        <StorySection>
            
            
            <StoryImage src={props.info ? props.info.url : null}  />
            <StoryImageWrapper/>
                
            
            
            
            
            
                
            {/*}
            <StoryShareButtons>
                <FacebookShareButton children={<FacebookIcon size={25} round={false} borderRadius={17} />} url={"www.420.com"} style={{marginRight: "3px"}} />
                <TwitterShareButton children={<TwitterIcon size={25} round={false} borderRadius={17}/>} url={"www.420.com"} style={{marginRight: "3px"}}/>
                <WhatsappShareButton children={<WhatsappIcon size={25} round={false} borderRadius={17}/>} url={"www.420.com"} />
            </StoryShareButtons>
            */}
            
            <StoryTags>
                <Tag>
                    {props.info ? props.info.topic : null}
                </Tag>
            </StoryTags>
            
            
            
            <StoryBody >

                {props.info ? props.info.title :  null }

            </StoryBody>
            

            

            <StoryInfo>

                {props.info ? props.info.date : "nada"}
                
            </StoryInfo>

            
            
            
            
            

        </StorySection>
    );
}


export default props => <Story {...props} />;