import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components';

import Story from '../packs/story.jsx'
import Header from './header.jsx'
import LookupSection from './lookupSection.jsx'


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
        grid-template-columns:  minmax(245px, auto) minmax(245px, auto);
        grid-gap: 20px;
        justify-content: center;
        //justify-items: center;
    }
`;







function Home(props){

    console.log("HOME_PROPS", props)
    
    const [openSideMenu, setOpenSideMenu] = useState(false);

    // reference for lookupSection to scroll to, when click on nav link
    const LookupScrollToRef = useRef();
    const LookupInputRef = useRef();

    // when click on nav link, scrolls to LookupScrollToRef
    const scrollToRef = (ref) => {
        
        window.scrollTo(0, ref.current.offsetTop)
        setOpenSideMenu(false)
        LookupInputRef.current.focus();

    }
        
    
    
    const executeScroll = () => scrollToRef(LookupScrollToRef)

    
    return (
    
        <>

        <Header executeScroll={executeScroll} 
                appState={props.appState} 
                handleLogOutClick={props.handleLogOutClick}
                openSideMenu={openSideMenu}
                setOpenSideMenu={setOpenSideMenu}
            />

        <NewsSection>
            
            <NewsWrapper>
        
                {props.story.map((info, index) => (
                    <Story key={index} info={info} />
                ))}
            
            </NewsWrapper>  
            
            <NewsAds>

            </NewsAds>
        
        </NewsSection>

        <LookupSection ref={{LookupScrollToRef: LookupScrollToRef, LookupInputRef: LookupInputRef}}/>
        
        </>
    );
}


export default Home;


