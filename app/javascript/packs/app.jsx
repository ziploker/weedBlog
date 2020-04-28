import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Letter from '../packs/letter.jsx'
import Feedback from '../packs/feedback.jsx'
import Home from '../packs/home.jsx'
import Story from '../packs/story.jsx'

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

function App(stuff){
    //const [story, setStory] = React.useState({

        //story: JSON.stringify(props.story)
        //story: props.story
        
    
      //})
    console.log("appp")
    console.log(stuff.story.title);
    return (
        <Router>
            
            <Switch>
                <Route path="/letter">
                    <Letter />
                </Route>
                <Route path="/feedback">
                    <Feedback />
                </Route>
                <Route path="/story">
                    <Story />
                </Route>

                <Route path="/:id" >

                    <Letter />
                
                </Route>
                <Route path="/">
                    <Home wtf={stuff.story} payload={stuff.payload}    />
                </Route>
                
            </Switch>
        </Router>
    );
}


export default stuff => <App {...stuff} />;