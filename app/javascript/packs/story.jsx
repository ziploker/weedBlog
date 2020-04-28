import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NewForm from '../packs/form.jsx'




function Story(){
    
    
    
    return (

        <>
        <h1> STORY FORM </h1>

        <NewForm  />
        
       </>     
        
    );
}


export default props => <Story {...props} />;