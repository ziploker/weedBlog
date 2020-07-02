import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NewForm from '../packs/form.jsx'




function Admin(props){
    
    
    
    return (

        <div style={{marginTop: "25px"}}>
            <h1>{props.loggedInStatus}</h1>
            <h1> STORY FORM from inside admin.jsx </h1>
           
           <NewForm/>
        
        </div>
        
    );
}


export default props => <Admin {...props} />;