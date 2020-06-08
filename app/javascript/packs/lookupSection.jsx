import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';

import LookupForm from '../packs/lookupForm.jsx'

import ResultCardOne from './resultCardOne.jsx'
import ResultCardTwo from './resultCardTwo.jsx'






const Lookup_Section_Wrapper = styled.div`

    display: grid;
    grid-template-columns: minmax(150px, 450px);
    //grid-template-rows: 90px minmax(min-content, 360px) minmax(min-content, 360px);
    justify-content: center;
    justify-items: center;
    grid-template-areas:
            
            "form"
            "results1"
            "results2";


    margin-top: 25px;

    @media screen and (min-width: 750px){
        
        display: grid;
        //grid-template-rows: minmax(min-content, 360px) minmax(min-content, 360px);
        grid-template-columns: minmax(min-content, 400px) minmax(min-content, 400px);
        grid-template-areas:
            
            
            "results1 results2";
            
        
        
    
    
    
    }
    
`;




const Two = styled.div`

  background: red;
  
  justify-content: center;
  align-items: center;
  justify-items: center;
  grid-area:results2;
  width: 100%;
  display: ${s => s.toString() == "true" ? "none" : "grid"};
  


`;

function Look_Up_Section (props) {



    const [showForm, setShowForm] = React.useState( true )
    const [results, setResults] = React.useState( {"one":{"name":"Annette Taddeo","firstName":"Annette","lastName":"Taddeo","image":"http://www.flsenate.gov/PublishedContent/Senators/2018-2020/Photos/s40_5331.jpg","id":"ocd-person/ea190b03-d1ca-4d75-89c7-dca745386db7","email":"taddeo.annette.web@flsenate.gov","chamber":"Senate","party":"Democrat","parent":"Florida Legislature","district":"40","fullDistrict":"Florida State Senate district 40"},"two":{"name":"Juan Alfonso Fernandez-Barquin","firstName":"","lastName":"","image":"https://www.myfloridahouse.gov//FileStores/Web/Imaging/Member/4709.jpg","id":"ocd-person/a8c88fee-1915-4907-ae37-5755c4bff446","email":"JuanF.Barquin@myfloridahouse.gov","chamber":"House","party":"Republican","parent":"Florida Legislature","district":"119","fullDistrict":"Florida State House district 119"}} );
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

        <>

            {console.log("render")}
            
            
            
            <Lookup_Section_Wrapper>

                
                <LookupForm showForm={showForm} setShowForm={setShowForm} setMinimalResults={setMinimalResults} handleChange={handleChange} setPercentOpacity={setPercentOpacity} percentOpacity={percentOpacity} percent={percent} setPercent={setPercent} formInfo={formInfo} setFormInfo={setFormInfo} setResults={setResults} style={{gridArea: "form"}}/>

                <ResultCardOne showForm={showForm} results={results} />

                <ResultCardTwo showForm={showForm} results={results} />
                
            </Lookup_Section_Wrapper>
        
        </>


    );



}


export default props => <Look_Up_Section {...props} />