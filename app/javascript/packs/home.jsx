import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';

//import Letter from '../packs/letter.jsx'
//import Feedback from '../packs/feedback.jsx'
//import Admin from '../packs/admin.jsx'
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
    grid-gap: 20px;
    justify-content: center;

    @media screen and (min-width: 750px){
        grid-template-columns: minmax(245px, 400px) minmax(245px, 400px) minmax(245px, 400px);
        grid-gap: 10px;
        justify-content: center;
        //justify-items: center;
        
    }



`;




function Home(props){
    console.log("hooome =>" + slugify('thsd sdsd sdfsd'))
    console.log(props)
    
    return (
        

        
        <Wrapper>
            
            
            {props.wtf.map((info, index) => (
                
                
                <Link key={index} to={'/blog/' + slugify(info.title) }>
                    <Story info={info} image={props.image}/>
                </Link>
            ))}

            
        </Wrapper>  

            
        
    );
}


export default props => <Home {...props} />;