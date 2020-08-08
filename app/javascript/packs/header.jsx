import React, {useEffect, useState} from 'react'
import Logo from '../../assets/images/logoPlaceholder.jpg'
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import useDocumentScrollThrottled from './useDocumentScrollThrottled.jsx'
import Burger from './burger'
import Menu from './menu'


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





const Nav = styled.nav`
    
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


    const [shouldHideHeader, setShouldHideHeader] = useState(false);
    const [shouldShowShadow, setShouldShowShadow] = useState(false);
    const [open, setOpen] = useState(false);
    const ref = React.useRef();
    const navbar = React.createRef();
    const MINIMUM_SCROLL = 80;
    const TIMEOUT_DELAY = 400;
    

    useDocumentScrollThrottled(callbackData => {
        console.log("CALLBACKDATA", callbackData)
        const { previousScrollTop, currentScrollTop } = callbackData;
        const isScrolledDown = previousScrollTop < currentScrollTop;
        const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL;
       
        //setShouldShowShadow(currentScrollTop > 2);
        setShouldHideHeader(isScrolledDown && isMinimumScrolled);

        //setTimeout(() => {
        //    setShouldHideHeader(isScrolledDown && isMinimumScrolled);
        //}, TIMEOUT_DELAY);
    });






    const shadowStyle = shouldShowShadow ? 'shadow' : '';
    const hiddenStyle = shouldHideHeader ? 'hidden' : '';

    function handler(){
        setOpen(false);
        console.log("ran setopen in handler, open = " + open);
      }



    useEffect(() => {

        console.log("UseEffect Start, open state is currently " + open);
        
        const listener = event => {
          
          if (!ref.current || ref.current.contains(event.target)) {
  
            console.log("nada");
            return;
          }
          
          console.log("call handlerr");
          handler();
        };
  
        const handleResize = () => {
          console.log(window.innerWidth);
          if (window.innerWidth > 850){
            setOpen(false);
          }
        }
  
        window.addEventListener("resize", handleResize);
        window.addEventListener("orientationchange", handleResize);
        document.addEventListener('mousedown', listener);
        
        return () => {
          console.log("cleanup first line");
          document.removeEventListener('mousedown', listener);
          console.log("cleanup");
          console.log("cleanup done, open = " + open);
        };
      },
      [ref, handler],
      );


      
    return (
        //<HeaderWrapper className={`header ${hiddenStyle} ${shadowStyle}`}>
        <HeaderWrapper>
                
            <HomeLink to='/'>
                <img style={{height: '100%', color: "#ffa680"}}src={Logo}/>
            </HomeLink>
            
            
            <Nav ref={navbar} >
                <ul>
                    <li key={1}><a href="#">Link1</a></li>
                    <li key={2}><a href="#">Link2</a></li>
                    <li key={3}><a href="#">Link3</a></li>
                    <li key={4}><a href="#">Link4</a></li>

                    <li key={5}>{props.carryState.loggedInStatus == "LOGGED_IN" ? [<Link key={"a"} to="/" onClick= {props.handleLogOutClick}> Logout | </Link>, <Link key={"b"} to="/edit">edit </Link>] :   [<Link key={"c"} to="/login"> Login |</Link>, <Link key={"d"} to="/signup"> Signup</Link>]  } </li>
                    
                    

                </ul>

            </Nav>
        
            
        
            <div className="tester" ref={ref}>
            <Burger open={open} setOpen={setOpen}/>
            <Menu open={open}  />
            </div>
        
        
        </HeaderWrapper>
    )
}




export default props => <Header {...props}  />
