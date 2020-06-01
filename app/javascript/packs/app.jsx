import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Letter from '../packs/letter.jsx'
import Feedback from '../packs/feedback.jsx'
import Home from '../packs/home.jsx'
import Admin from '../packs/admin.jsx'
import Header from '../packs/header'
import LookupSection from '../packs/lookupSection.jsx'
import Footer from '../packs/footer.jsx'

import '../../assets/stylesheets/sticky.scss'

import GlobalStyles from "./global"

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

function App({story}){
    //const [story, setStory] = React.useState({

        //story: JSON.stringify(props.story)
        //story: props.story
        
    
      //})

    
    const [isSticky, setSticky] = useState(false);
    const ref = useRef(null);
    const handleScroll = () => {

        //console.log(ref.current.getBoundingClientRect() )
        
        //setSticky(ref.current.getBoundingClientRect().top <= -90);


        if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
            //document.getElementById("header").style.fontSize = "30px";

          } else {
            //document.getElementById("header").style.fontSize = "90px";
          }
        
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', () => handleScroll);
        };
    },[]);
    
    console.log("appp")
    console.log(story.title);
    return (
        <Router>
            <GlobalStyles/>
                
                    
                <Header/>
                
                
                <Switch>

                    <Route exact path="/" render={ (props) => <Home {...props} story={story} />}/>
                    <Route exact path="/ziploker" component={Admin} />
                    <Route path="/letter" component={Letter} />
                    
                    <Route path="/feedback" component={Feedback} />
                    
                
                        

                    <Route path="/blog/:id" component={Letter} />
                    
                        
                    
                </Switch>

                <LookupSection/>

                <Footer/>
                
        </Router>
    );
}


export default story => <App {...story} />;