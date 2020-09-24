import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Story from '../packs/story.jsx'




import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";



const NewsSection = styled.div`

    padding: 0px 10px;

    @media screen and (min-width: 750px){
        display: grid;
        grid-template-columns: minmax(200px, 1fr) minmax(10px, 20vw);
        grid-gap: 20px;
    }
`;



const NewsAds = styled.div`
    
    background-color: pink;
`;



const NewsWrapper = styled.div`

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
        //grid-template-columns:  minmax(245px, auto) minmax(245px, auto);
        grid-template-columns:  450px 450px;
        grid-gap: 20px;
        justify-content: center;
        //justify-items: center;
    }
`;



const PaginationBar = styled.div`



`;
localStorage.clear();
console.log("LOCALSTORAGEVALUE_OUT", localStorage.getItem('page'))


function Home(props){

    console.log("HOME_PROPS", props)
    
    
    function pageForward(){
        
        localStorage.setItem('page', Number(localStorage.getItem('page')) + 1 || 0)
        const mode = process.env.NODE_ENV == "development" ? "http://127.0.0.1:3000" : "https://weedblog.herokuapp.com"
        console.log("LOCALSTORAGEVALUE", localStorage.getItem('page'))
        
        axios.post( mode + "/" + localStorage.getItem('page'), {withCredentials: true})
        .then(response => {

           
            if (response.data.stories === undefined || response.data.stories.length == 0){
                localStorage.setItem('page', Number(localStorage.getItem('page')) - 1)
                return
            }
            
            
            
            console.log("theResults", response.data)

            props.setAppState({

                stories: response.data.stories
            })
                
          
      
        })
        .catch(error => {
        
            console.log("pageForward? error", error)

           

        })
    
    }


    function pageBack(){
        
        if (Number(localStorage.getItem('page')) == 0 ){

            return
        }
        
        localStorage.setItem('page', Number(localStorage.getItem('page')) - 1 || 0)
        const mode = process.env.NODE_ENV == "development" ? "http://127.0.0.1:3000" : "https://weedblog.herokuapp.com"
        console.log("LOCALSTORAGEVALUE", localStorage.getItem('page'))
        axios.post( mode + "/" + localStorage.getItem('page'), {withCredentials: true})
        .then(response => {

           
                
            console.log("theResults", response.data)

            props.setAppState({

                stories: response.data.stories
            })
                
          
      
        })
        .catch(error => {
        
            console.log("pageForward? error", error)

           

        })
    
    }
    

    
    return (
    
        <>

        

        <NewsSection>
            
            <NewsWrapper>
        
                {props.stories.map((info, index) => (
                    <Story key={index} info={info} appState={props.appState} handleLogOutClick={props.handleLogOutClick}/>
                ))}
            
            </NewsWrapper>  
            
            <NewsAds>

            </NewsAds>
        
        </NewsSection>

        <PaginationBar>

            <button onClick={pageBack}>
                PageBack
            </button>

            <button onClick={pageForward}>
                PageForward
            </button>

        </PaginationBar>
        
        </>
    );
}


export default Home;


