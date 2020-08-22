import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';

import {useParams} from 'react-router-dom'
  


  

function Letter(props){
    console.log('letter##');
    console.log(props);
    
    let { id } = useParams();
    
    return (
        <div style={{padding: '30px'}}>

            <img src={props.location.state.imageUrl} style={{width: "200px"}}/>
            
            title: {props.location.state.title} <br/>

            body: {props.location.state.body} <br/>

            created_at: {props.location.state.created_at} <br/>

            date: {props.location.state.date} <br/>

            keywords: {props.location.state.keywords} <br/>
            
            
            
        </div>
    );
}


export default props => <Letter {...props} />;