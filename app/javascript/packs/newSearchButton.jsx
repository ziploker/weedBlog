import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

const ResetButton = styled.button`

    width: 50px;
    max-height: ${ props => props.showCards.toString() == "true" ? "0px" : "100%"};
    opacity: ${ props => props.showCards.toString() == "true" ? "0" : "1"};
    transition: opacity .4s;
    transition-timing-function: ease-out;

`;


  


  

function NewSearchButton(props){
    
    return (

        <ResetButton type="reset"  showCards={props.showCards}>

            New Search

        </ResetButton>
        
    );
}


export default props => <NewSearchButton {...props} />;