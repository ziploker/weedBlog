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
    
    height: 70px;
    width: 100%;
    margin-bottom: 25px;

    background-color: gray;
    
   
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


const Options = styled.nav`

    //width: 100%;
    height: 100%;

    display: flex;
    //justify-content: flex-end;
    //align-items: center;


    ul{
        
        list-style: none;
        margin: 0;

        li, a{
            
        
            font-weight: 500;
            font-size: 16px;
            line-height: 70px;
            
            color: black;
            
            text-decoration: none;
        
        
        }
    
        li{
            display: inline-block;
            padding: 0px 20px;

        
            a{
                transition: all 0.3s ease 0s;

                &:hover{

                    color: gray;

                }
            
            }
        
        }
    
    
    
    }

`;

const OptionLink = styled(Link)`

    //width: 50%;
    //height: 100%;

    //display: flex;
    //justify-content: flex-end;
    //align-content: center;
    //line-height: 70px;
  

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
            font-size: 16px;
            
            color: orangered;
            
            text-decoration: none;
        
        
        }
    
        li{
            display: inline-block;
            padding: 0px 20px;

        
            a{
                transition: all 0.3s ease 0s;

                &:hover{

                    color: gray;

                }
            
            }
        
        }
    
    
    
    }
    
    

`;






function Header() {


    const [shouldHideHeader, setShouldHideHeader] = useState(false);
    const [shouldShowShadow, setShouldShowShadow] = useState(false);
    const [open, setOpen] = useState(false);
    const ref = React.useRef();
    const navbar = React.createRef();
    const MINIMUM_SCROLL = 80;
    const TIMEOUT_DELAY = 400;
    

    useDocumentScrollThrottled(callbackData => {
        const { previousScrollTop, currentScrollTop } = callbackData;
        const isScrolledDown = previousScrollTop < currentScrollTop;
        const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL;
       
        setShouldShowShadow(currentScrollTop > 2);

        setTimeout(() => {
        setShouldHideHeader(isScrolledDown && isMinimumScrolled);
        }, TIMEOUT_DELAY);
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
          
          console.log("call handler");
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
            
            
            <Nav ref={navbar}>
                <ul>
                    <li><a href="#">Link1</a></li>
                    <li><a href="#">Link2</a></li>
                    <li><a href="#">Link3</a></li>
                    <li><a href="#">Link4</a></li>

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
