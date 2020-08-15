import React, {useEffect, useState, useRef} from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"

import Letter from '../packs/letter.jsx'
import Feedback from '../packs/feedback.jsx'
import Home from '../packs/home.jsx'
import Admin from '../packs/admin.jsx'
import Footer from '../packs/footer.jsx'

import Login from "./pages/login"
import Forgot from "./pages/forgot"
import Signup from './pages/signup'
import Edit from './pages/edit'
import Change from './pages/change_pw'

import axios from 'axios'

import styled, { ThemeProvider } from 'styled-components'
import '../../assets/stylesheets/sticky.scss'
import GlobalStyles from "./global"



function App(info){

    console.log("APP_INFO", info)
    
    //global state of user (logged in ? and user)
    const [appState, setAppState] = useState({
        
        loggedInStatus: "NOT_LOGGED_IN",
        emailStatus: "EMAIL_NOT_VERIFIED",
        user: {},
        prevScrollpos: window.pageYOffset,
        visible: true
    })

    
    const [isSticky, setSticky] = useState(false);
    const ref = useRef(null);
    
    ////const handleScroll = () => {
        
        //if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
            //document.getElementById("header").style.fontSize = "30px";
        //} else {
            //document.getElementById("header").style.fontSize = "90px";
        //}

        ////const prevScrollpos = state.prevScrollpos;

        ////const currentScrollPos = window.pageYOffset;
        ////const visible = prevScrollpos > currentScrollPos;

        ////setState({
        ////    prevScrollpos: currentScrollPos,
        ////    visible
        ////});
    ////};

    
    const theme = {
        
        white:        "#ffffff",
        offWhite:     "#f4f4f4",
        lightBlue:    "#56c5cc",  //(86,197,204)
        pink:         "#f14f7b",  //(241,79,123)
        orange:       "#f7aa1c",  //(247,170,28)
        darkBlue:     "#000321",  //(0,3,33)
        blueGray:     "#0E2021",
        black:        "#000000"   //(0,0,0)
    };
    

    const handleSuccessfulAuth = data => {
        
        setAppState({
            ...appState,
            loggedInStatus: "LOGGED_IN",
            user: data.user
        })

    }

    
    const handleLogOutClick = () => {
        
        const mode = process.env.NODE_ENV =="development" ? "http://127.0.0.1:3000" : "https://weedblog.herokuapp.com"
        
        axios.delete(mode + "/logout", {withCredentials : true})
            .then(response => {
                setAppState({
                    loggedInStatus: "NOT_LOGGED_IN",
                    user: {}
                })

            }).catch(error => {
                console.log("logout errors", error)
            })
    }

    
    
    
    useEffect(() => {

        const mode = process.env.NODE_ENV == "development" ? "http://127.0.0.1:3000" : "https://weedblog.herokuapp.com"
        
        axios.get( mode + "/logged_in", {withCredentials: true})
            .then(response => {

                if (response.data.logged_in && appState.loggedInStatus == "NOT_LOGGED_IN"){
                    
                    setAppState({
                        ...appState,
                        loggedInStatus: "LOGGED_IN",
                        user: response.data.user
                    })
                    
                }else if (!response.data.logged_in && appState.loggedInStatus == "LOGGED_IN"){
                    
                    setAppState({
                        ...appState,
                        loggedInStatus: "NOT_LOGGED_IN",
                        user: {}
                    })

                }

                if (response.data.user && response.data.user.email_confirmed == true){
                    
                    setAppState({
                        ...appState,
                       
                        emailStatus: "EMAIL_VERIFIED"
                    })
                    
                }
            
            })
            .catch(error => console.log("Logged in? error", error))

        
        ////window.addEventListener('scroll', handleScroll);
        
        ////return () => {
            ////window.removeEventListener('scroll', () => handleScroll);
        ////};
    
    },[]);
    
    
    return (

        <ThemeProvider theme={theme}>
        
            <Router>
                
                <GlobalStyles/>
                
                <Switch>

                    <Route exact path="/" render={ props => <Home {...props} story={info.story} loggedInStatus={appState.loggedInStatus} emailStatus={appState.emailStatus} appState={appState} handleLogOutClick={handleLogOutClick}/>}/>
                    <Route path="/login" render={ props => <Login {...props} handleSuccessfulAuth={handleSuccessfulAuth} />} />
                    <Route path="/signup" render={ props => <Signup {...props} handleSuccessfulAuth={handleSuccessfulAuth} />} />
                    <Route path="/forgot" render={ props => <Forgot {...props}  />} />                    <Route path="/forgot" render={ props => <Forgot {...props}  />} />
                    <Route exact path="/change_pw/:token" render={ props => <Change {...props}  />} />
                    <Route path="/edit" render={ props => <Edit {...props} user={appState.user}/>} />
                    <Route exact path="/ziploker" render={ props => <Admin {...props} loggedInStatus={appState.loggedInStatus}/>} />
                    <Route path="/letter" component={Letter} />
                    <Route path="/feedback" component={Feedback} />
                    <Route path="/blog/:id" component={Letter} />
                    
                </Switch>
                
                <Footer/>
            
            </Router>
        
        </ThemeProvider>
    );
}


export default props => <App {...props} />;