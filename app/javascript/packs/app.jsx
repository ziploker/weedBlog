import React, {useEffect, useState, useRef} from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter,
    useHistory,
    useLocation
} from "react-router-dom"
import Header from './header.jsx'
import LookupSection from './lookupSection.jsx'
import Article from '../packs/article.jsx'
import Feedback from '../packs/feedback.jsx'
import Home from '../packs/home.jsx'
import Admin from '../packs/admin.jsx'
import Footer from '../packs/footer.jsx'

import Login from "./pages/login"
import Forgot from "./pages/forgot"
import Signup from './pages/signup'
import Edit from './pages/edit'
import Change from './pages/change_pw'
import Resend from './pages/resend'

import AdminEdit from '../packs/adminEdit'

import axios from 'axios'

import styled, { ThemeProvider } from 'styled-components'
import '../../assets/stylesheets/sticky.scss'
import GlobalStyles from "./global"


///////////////////////////////// MAIN APP STARTING POINT ///////////////
function App(controllerProps){
    
    
    console.log("APP_controllerProps", controllerProps)
    
    //global APP state 
    const [appState, setAppState] = useState({
        
        loggedInStatus: "NOT_LOGGED_IN",
        emailStatus: "EMAIL_NOT_VERIFIED",
        test: "a",
        user: {},
        stories: controllerProps.stories
        
    })
    const [openSideMenu, setOpenSideMenu] = useState(false);

    
   
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
        
        const mode = process.env.NODE_ENV =="development" ? "http://127.0.0.1:3000" : "https://www.floiridablaze.io"
        
        axios.delete(mode + "/logout", {withCredentials : true})
            .then(response => {
                setAppState({
                    ...appState,
                    loggedInStatus: "NOT_LOGGED_IN",
                    user: {}
                })

            }).catch(error => {
                console.log("logout errors", error)
            })
    }

    
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
    
    
    useEffect(() => {

        const mode = process.env.NODE_ENV == "development" ? "http://127.0.0.1:3000" : "https://www.floiridablaze.io"
        
        axios.get( mode + "/logged_in", {withCredentials: true})
            .then(response => {

                //Server says logged_in but appState says not logged in
                
                    
                setAppState({
                    ...appState,
                    loggedInStatus: response.data.logged_in && appState.loggedInStatus == "NOT_LOGGED_IN" ? "LOGGED_IN": "NOT_LOGGED_IN",
                    user: response.data.user,
                    emailStatus: response.data.user && response.data.user.email_confirmed == true ? "EMAIL_VERIFIED" : "EMAIL_NOT_VERIFIED"
                })
                    
                
                    
                //Server says not logged in but appState says logged_in
                //}else if (!response.data.logged_in && appState.loggedInStatus == "LOGGED_IN"){
                    
                //    setAppState({
                //        ...appState,
                //        loggedInStatus: "NOT_LOGGED_IN",
                //        user: {}
                //    })

                //    console.log("WTTFFF", "BBBBBBB")

                

                //Check if email has been confirmed
                //if (response.data.user && response.data.user.email_confirmed == true){
                    
                //    setAppState({
                //        ...appState,
                       
              //          emailStatus: "EMAIL_VERIFIED"
                //    })

                //    console.log("WTTFFF", "cccccc")
                    
               // }

                
            
            })
            .catch(error => console.log("Logged in? error", error))

        
    },[]);

    
    
    
    return (

        <ThemeProvider theme={theme}>
        
            <Router>
                
                <GlobalStyles/>
                
                
                    
                <Header 
                    executeScroll={executeScroll} 
                    appState={appState} 
                    handleLogOutClick={handleLogOutClick}
                    openSideMenu={openSideMenu}
                    setOpenSideMenu={setOpenSideMenu}
                />
                
                
                <Switch>

                    <Route exact path="/" render={ () => <Home stories={appState.stories} appState={appState} setAppState={setAppState} handleLogOutClick={handleLogOutClick}/>}/>
                    <Route path="/login" render={ props => <Login {...props} handleSuccessfulAuth={handleSuccessfulAuth} />} />
                    <Route path="/signup" render={ props => <Signup {...props} handleSuccessfulAuth={handleSuccessfulAuth} />} />
                    <Route path="/forgot" render={ props => <Forgot {...props}  />} /> 
                    <Route path="/resend" render={ props => <Resend {...props}  />} />                   
                    <Route exact path="/change_pw/:token" render={ props => <Change {...props}  />} />
                    <Route path="/edit" render={ props => <Edit {...props} user={appState.user}/>} />
                    
                    <Route path="/feedback" component={Feedback} />
                    <Route exact path="/blog/:id" render = { props => <Article {...props} /> } />
                    
                </Switch>

                <LookupSection ref={{LookupScrollToRef: LookupScrollToRef, LookupInputRef: LookupInputRef}}/>
                
                <Footer/>
            
            </Router>
        
        </ThemeProvider>
    );
}


export default props => <App {...props} />;