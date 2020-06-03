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

    const [results, setResults] = React.useState( {"one":{"name":"Annette Taddeo","firstName":"Annette","lastName":"Taddeo","image":"http://www.flsenate.gov/PublishedContent/Senators/2018-2020/Photos/s40_5331.jpg","id":"ocd-person/ea190b03-d1ca-4d75-89c7-dca745386db7","email":"taddeo.annette.web@flsenate.gov","chamber":"Senate","party":"Democrat","parent":"Florida Legislature"},"two":{"name":"Juan Alfonso Fernandez-Barquin","firstName":"","lastName":"","image":"https://www.myfloridahouse.gov//FileStores/Web/Imaging/Member/4709.jpg","id":"ocd-person/a8c88fee-1915-4907-ae37-5755c4bff446","email":"JuanF.Barquin@myfloridahouse.gov","chamber":"House","party":"Republican","parent":"Florida Legislature"}} );
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