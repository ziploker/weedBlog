import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';

//import Letter from '../packs/letter.jsx'
//import Feedback from '../packs/feedback.jsx'
//import Admin from '../packs/admin.jsx'
import Story from '../packs/story.jsx'
import Header from './header.jsx'
import LookupSection from './lookupSection.jsx'

import slugify from 'react-slugify'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const Layout = styled.div`

  padding: 0px 10px;

    @media screen and (min-width: 750px){
        display: grid;
        grid-template-columns: minmax(200px, 1fr) minmax(10px, 20vw);
        grid-gap: 20px;
    }
`;

const Ads = styled.div`
    background-color: pink;

`;

const Wrapper = styled.div`

    display: grid;
    grid-template-columns: minmax(200px, 700px);
    grid-gap: 15px;
    justify-content: center;
    justify-items: center;
    margin-top: 80px;

    @media screen and (min-width: 750px){
        grid-template-columns: minmax(200px, 1fr);
        grid-auto-rows: minmax(100px, auto);
        
        grid-gap: 20px;
        justify-content: center;
        //justify-items: center;
        
    }

    @media screen and (min-width: 1111px){
        grid-template-columns:  minmax(245px, auto) minmax(245px, auto);
        grid-gap: 20px;
        justify-content: center;
        //justify-items: center;
        
    }



`;




function Home(props){
        console.log("Home", props)
    
    return (
        <>
        <Header carryState={props.carryState} handleLogOutClick={props.handleLogOutClick}/>

        <Layout>
            <Wrapper>
                
                {props.story.map((info, index) => (
                    
                    
                  
                        <Story key={index} info={info} />
                    
                ))}
                
            </Wrapper>  
            <Ads>

            </Ads>
        </Layout>
        
        
        <LookupSection/>
        </>

            
        
    );
}


export default props => <Home {...props} />;


//<Link key={index} to={'/blog/' + slugify(info.title) }>