import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Letter from '../packs/letter.jsx'
import Feedback from '../packs/feedback.jsx'
import Story from '../packs/story.jsx'

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
    grid-gap: 10px;
    justify-content: center;

    @media screen and (min-width: 750px){
        grid-template-columns: minmax(245px, 400px) minmax(245px, 400px) minmax(245px, 400px);
        grid-gap: 10px;
        justify-content: center;
        //justify-items: center;
        
    }



`;


const Div = styled.div`

    width:100%;
    height: 350px;
    background-color: pink;


`;

function Home(props){
    console.log("hooome =>" + slugify('thsd sdsd sdfsd'))
    console.log(props)
    
    return (
        

        
        <Wrapper>
            <Link to="/feedback">
                <Div>Feedback inner</Div>
            </Link>
            <Link to="/letter">
                <Div>inner Leter</Div>
            </Link>
            <Link to="/story">
                <Div>new Story</Div>
            </Link>
            
            {props.wtf.map((info, index) => (
                
                
                <Link key={index} to={'/blog/' + slugify(info.title) }>
                    <Div >
                        <h1> {info.title} </h1>

                        <h3> {info.keywords} </h3>
                        <h3> {index}</h3>
                        <h3> {info.id}</h3>
                        <p> {info.body} </p>
                    
                    
                    
                    </Div>
                </Link>
                
                
                
                
                
               
            ))}

            
        </Wrapper>  

            
        
    );
}


export default props => <Home {...props} />;