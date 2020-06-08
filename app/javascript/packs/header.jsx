import React, {useEffect, useState} from 'react'
import Logo from '../../assets/images/logoPlaceholder.jpg'
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import useDocumentScrollThrottled from './useDocumentScrollThrottled.jsx'

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
    z-index: 1;

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










function Header() {


    const [shouldHideHeader, setShouldHideHeader] = useState(false);
    const [shouldShowShadow, setShouldShowShadow] = useState(false);
    

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





    return (
        //<HeaderWrapper className={`header ${hiddenStyle} ${shadowStyle}`}>
        <HeaderWrapper>
                
            <HomeLink to='/'>
                <img style={{height: '100%', color: "#ffa680"}}src={Logo}/>
            </HomeLink>
            
            
        
        
            <Options>
                <ul>
                    <li>
                        <OptionLink to='/Letter'>
                            Letter
                        </OptionLink>
                    </li>
                    <li>
                        <OptionLink to='/Feedback'>
                        
                            Feedback
                        </OptionLink>
                    </li>
                </ul>
            </Options>
        
        
        
        
        
        </HeaderWrapper>
    )
}




export default props => <Header {...props}  />
