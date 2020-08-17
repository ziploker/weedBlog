import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import useDocumentScrollThrottled from './useDocumentScrollThrottled.jsx'
import styled from 'styled-components'
import Logo from '../../assets/images/logoPlaceholder.jpg'

import Burger from './burger'
import SideMenu from './sidemenu'



const HeaderWrapper = styled.header`

    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 45px;
    width: 100%;
    margin-bottom: 25px;
    background-color: ${props => props.theme.darkBlue};
    padding: 0px 8%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1001;
    transform: translateY(0);
    transition: all 0.3s ease;

    &.shadow {
        box-shadow: 0 9px 9px -9px rgba(0, 0, 0, 0.13);
    }

    &.hidden {
        transform: translateY(-110%);
        //height: 50px;
    }
`;



const HomeLink = styled(Link)`

    height: 100%;
    width: 70px;
    cursor: pointer;
    margin-right: auto;
    background-color: pink;
`;



const DesktopNav = styled.nav`
    
    @media only screen and (max-width: 850px){
    
       display: none     

    }   
    //transform: translate(-30px,-30px);
    //opacity: 0;
    //height: 100%;

    display: flex;
    
    ul{
        
        list-style: none;

        li, a{
            
        
            font-weight: 500;
            font-size: 12px;
            
            color: ${props => props.theme.white};
            
            text-decoration: none;
            cursor: pointer;
        
        
        }
    
        li{
            display: inline-block;
            padding: 0px 20px;

        
            a{
                transition: all 0.3s ease 0s;

                &:hover{

                    color: ${props => props.theme.lightBlue};;

                }
            
            }
        
        }
    
    
    
    }
    
    

`;






function Header(props) {

    console.log("HEADER_PROPS", props)


    
    const ref = React.useRef();
    //const navbar = React.createRef();
    
    
    
    function mouseDownHandler(){
        
        props.setOpenSideMenu(false);
        console.log("mouseDownEventTriggered & openSideMenu = " + props.openSideMenu);
    }



    
    useEffect(() => {

        console.log("Header UseEffect Start, openSideMenu state is currently " + props.openSideMenu);
        
        //mousedown listener
        const listener = event => {

            //if you click in the menu,  dont close it
            if (ref.current.contains(event.target)) {
    
                return;
            }
          
            //if you click anywhere outside the side menu, close it.    
            mouseDownHandler();
        };
  
        
        //resize and/or orientationchange listener
        const handleResize = () => {
          
            console.log(window.innerWidth);
            
            //closed sideMenu on orientation change, if it gets bigger than 850px
            if (window.innerWidth > 850){
                props.setOpenSideMenu(false);
            }
        }
  
        //set up event listeners
        window.addEventListener("resize", handleResize);
        window.addEventListener("orientationchange", handleResize);
        document.addEventListener('mousedown', listener);
        
        
        return () => {
          
          document.removeEventListener('mousedown', listener);
          console.log("cleanup");
          console.log("cleanup done, openSideMenu = " + props.openSideMenu);
        };
      },
      [ref, mouseDownHandler],
    );


      
    return (
        
        <HeaderWrapper>
                
            <HomeLink to='/'>
                <img style={{height: '100%', color: "#ffa680"}}src={Logo}/>
            </HomeLink>
            
            
            <DesktopNav>
                <ul>
                
                    
                    <li key={1}><a href="#">News</a></li>
                    <li key={2}>
                    
                        <a onClick={props.executeScroll}>Representative Lookup</a>
                    </li>
                    <li key={3}><a href="#">Store</a></li>
                    

                    <li key={4}>{props.appState.loggedInStatus == "LOGGED_IN" ? [<Link key={"a"} to="/" onClick= {props.handleLogOutClick}> Logout | </Link>, <Link key={"b"} to="/edit">edit </Link>] :   [<Link key={"c"} to="/login"> Login |</Link>, <Link key={"d"} to="/signup"> Signup</Link>]  } </li>
                    
                    

                </ul>

            </DesktopNav>
        
            
        
            <div ref={ref}>
                <Burger openSideMenu={props.openSideMenu} setOpenSideMenu={props.setOpenSideMenu}/>
                <SideMenu openSideMenu={props.openSideMenu} executeScroll={props.executeScroll} appState={props.appState} />
            </div>
        
        
        </HeaderWrapper>
    )
}




export default Header;
