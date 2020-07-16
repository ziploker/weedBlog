import React, {useEffect, useState, useRef} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import styled, { ThemeProvider } from 'styled-components';

import Letter from '../packs/letter.jsx'
import Feedback from '../packs/feedback.jsx'
import Home from '../packs/home.jsx'
import Admin from '../packs/admin.jsx'
import Header from '../packs/header'
import LookupSection from '../packs/lookupSection.jsx'
import Footer from '../packs/footer.jsx'

import Login from "./pages/login";
import Signup from './pages/signup';
import Edit from './pages/edit';

import axios from 'axios'
import '../../assets/stylesheets/sticky.scss'

import GlobalStyles from "./global"





function App(info){
    
    //global state of user (logged in ? and user)
    const [state, setState] = React.useState({
        loggedInStatus: "NOT_LOGGED_IN",
        user: {}
    })

    
    const [isSticky, setSticky] = useState(false);
    const ref = useRef(null);
    
    const handleScroll = () => {
        
        if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
            //document.getElementById("header").style.fontSize = "30px";
        } else {
            //document.getElementById("header").style.fontSize = "90px";
        }
    };

    

    const handleSuccessfulAuth = data => {
        
        setState({
            loggedInStatus: "LOGGED_IN",
            user: data.user
        })
        //info.history.push("/")
    }

    
    const handleLogOutClick = () => {
        
        const mode = process.env.NODE_ENV =="development" ? "http://127.0.0.1:3000" : "https://weedblog.herokuapp.com"
        axios.delete(mode + "/logout", {withCredentials : true})
        .then(response => {
            setState({
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

                if (response.data.logged_in && state.loggedInStatus == "NOT_LOGGED_IN"){
                    
                    setState({
                        loggedInStatus: "LOGGED_IN",
                        user: response.data.user
                    })
                    
                }else if (!response.data.logged_in && state.loggedInStatus == "LOGGED_IN"){
                    
                    setState({
                        loggedInStatus: "NOT_LOGGED_IN",
                        user: {}
                    })

                }
            
            })
            .catch(error => console.log("Logged in? error", error))

        
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', () => handleScroll);
        };
    },[]);
    
    
    return (
        
        <Router>
            <GlobalStyles/>
                
                    
                
                
                
                
                <Switch>

                    
                    <Route exact path="/" render={ props => <Home {...props} story={info.story} loggedInStatus={state.loggedInStatus} state={state} handleLogOutClick={handleLogOutClick}/>}/>
                    <Route path="/login" render={ props => <Login {...props} handleSuccessfulAuth={handleSuccessfulAuth} />} />
                    <Route path="/signup" render={ props => <Signup {...props} handleSuccessfulAuth={handleSuccessfulAuth} />} />
                    <Route path="/edit" render={ props => <Edit {...props} user={state.user}/>} />

                    <Route exact path="/ziploker" render={ props => <Admin {...props} loggedInStatus={state.loggedInStatus}/>} />
                    <Route path="/letter" component={Letter} />
                    
                    <Route path="/feedback" component={Feedback} />
                    
                
                        

                    <Route path="/blog/:id" component={Letter} />
                    
                        
                    
                </Switch>
                
                

                <Footer/>
                
        </Router>
        
    );
}


export default props => <App {...props} />;