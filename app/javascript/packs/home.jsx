import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';

//import Letter from '../packs/letter.jsx'
//import Feedback from '../packs/feedback.jsx'
//import Admin from '../packs/admin.jsx'
import Story from '../packs/story.jsx'
import Header from './header.jsx'

import slugify from 'react-slugify'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const Wrapper = styled.div`

    display: grid;
    grid-template-columns: minmax(200px, 700px);
    grid-gap: 20px;
    justify-content: center;
    justify-items: center;
    margin-top: 90px;

    @media screen and (min-width: 750px){
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
        justify-content: center;
        //justify-items: center;
        
    }

    @media screen and (min-width: 1111px){
        grid-template-columns: minmax(245px, 400px) minmax(245px, 400px) minmax(245px, 400px);
        grid-gap: 20px;
        justify-content: center;
        //justify-items: center;
        
    }



`;




function Home(props){
        console.log("Home", props)
    
    return (
        

        
        <Wrapper>
            
            <Header state={props.state} handleLogOutClick={props.handleLogOutClick}/>
            {props.story.map((info, index) => (
                
                
                <div key={index}>
                    <Story info={info} />
                </div>
            ))}

           
        </Wrapper>  

            
        
    );
}


export default props => <Home {...props} />;


//<Link key={index} to={'/blog/' + slugify(info.title) }>