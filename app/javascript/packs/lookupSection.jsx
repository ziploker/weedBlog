import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';

import LookupForm from '../packs/lookupForm.jsx'
import LookupResults from '../packs/lookupResults.jsx'


const Lookup_Section_Wrapper = styled.div`

    //display: grid;
    //grid-template-columns: minmax(100px, 1fr)
    //grid-template-rows: 90px minmax(min-content, max-content) minmax(min-content, max-content);
    //justify-content: center;
    //justify-items: center;

    //grid-template-areas:style={{float: "right"}}
    //    "title"
    //    "form"
    //    "results";

    margin-top: 25px;


`;

function Look_Up_Section (props) {

    const [results, setResults] = React.useState( {} );
    const [minimalResults, setMinimalResults] = React.useState ({})
    const [percent, setPercent] = React.useState ( 0 );
    const [percentOpacity, setPercentOpacity] = React.useState (0)
    const [formInfo, setFormInfo] = React.useState({

        
        address: '',
        //nameIsFocused: false,
        zipcode: '',
        

    })

    const handleChange = event => {
        console.log("handle change from lookup")
        console.log(event)
    
        const v = event.target.value;
    
        const { id } = props;
        const value = event.target.value;
        
        
        setFormInfo({ 
          ...formInfo,
          [event.target.name]: v,
          error: '' 
        });
        //return onChange(id, value);
      }

    return (

        <Lookup_Section_Wrapper>

            <h1 style={{gridArea: "title", textAlign: "center"}}>Contact your Local Respresentative</h1>


            <LookupResults minimalResults={minimalResults} percentOpacity={percentOpacity}  setPercent={setPercent} results={results} style={{gridArea: "results"}}/>

            <LookupForm setMinimalResults={setMinimalResults} handleChange={handleChange} setPercentOpacity={setPercentOpacity} percentOpacity={percentOpacity} percent={percent} setPercent={setPercent} formInfo={formInfo} setFormInfo={setFormInfo} setResults={setResults} style={{gridArea: "form"}}/>

        </Lookup_Section_Wrapper>



    );



}


export default props => <Look_Up_Section {...props} />