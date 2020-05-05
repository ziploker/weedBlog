import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';

import {useParams} from 'react-router-dom'
import { instanceOf } from 'prop-types';
  

const StorySection = styled.section`

    width:100%;
    height: 350px;
    border: 1px solid orange;


`;
  

function Story(props){
    
    console.log("SSSSSSS");
    console.log(props);
    return (
        <StorySection>
           
            <img src={props.image} style={{width: "100%"}} />

        </StorySection>
    );
}


export default props => <Story {...props} />;