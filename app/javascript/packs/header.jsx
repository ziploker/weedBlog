import react from 'react'
import Logo from '../../assets/images/logoPlaceholder.svg'
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const HeaderWrapper = styled.header`

    display: flex;
    justify-content: flex-end;
    align-items: center;

    height: 70px;
    width: 100%;
    margin-bottom: 25px;


    
   
    padding: 0px 8%;
   

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








import React from 'react'

function Header() {
    return (
        <HeaderWrapper>
            
            
                
            <HomeLink to='/'>
                <img style={{height: '100%'}}src={Logo}/>
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




export default props => <Header {...props} />
