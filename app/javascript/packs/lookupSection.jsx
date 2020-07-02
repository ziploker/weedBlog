import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';
import LookupForm from '../packs/lookupForm.jsx'
import ResultCardOne from './resultCardOne.jsx'
import ResultCardTwo from './resultCardTwo.jsx'
import ResetButton from './newSearchButton.jsx'



const Lookup_Section_Wrapper = styled.div`

    display: grid;
    //grid-gap: 25px;
    //padding: 25px;
    grid-template-columns: minmax(150px, 1fr);
    //grid-template-rows: 90px minmax(min-content, 360px) minmax(min-content, 360px);
    justify-content: center;
    justify-items: center;
    grid-template-areas:
            
            "title"
            
            "form"
            "results1"
            "results2";


    margin-top: 25px;
    background-color: #F9F9F9;

    @media screen and (min-width: 750px){
        
        display: grid;
        //grid-gap: 25px;
        grid-template-rows: minmax(min-content, max-content) minmax(min-content, max-content) minmax(min-content, max-content);
        grid-template-columns: minmax(min-content, 400px) minmax(min-content, 400px);
        grid-template-areas:
            
            "title title"
            "subTitle subTitle"
            "form form"
            "results1 results2";
            
    }
    
`;

const Results = styled.div`

    display: grid;
    grid-template-columns: 50% 50%;
    grid-gap: 5px;





`;

function Look_Up_Section (props) {

  const [showCards, setShowCards] = React.useState( false )
  const [results, setResults] = React.useState( {"one":{"name":"Annette Taddeo","firstName":"Annette","lastName":"Taddeo","image":"http://www.flsenate.gov/PublishedContent/Senators/2018-2020/Photos/s40_5331.jpg","id":"ocd-person/ea190b03-d1ca-4d75-89c7-dca745386db7","email":"taddeo.annette.web@flsenate.gov","chamber":"Senate","party":"Democrat","parent":"Florida Legislature","district":"40","fullDistrict":"Florida State Senate district 40"},"two":{"name":"Juan Alfonso Fernandez-Barquin","firstName":"","lastName":"","image":"https://www.myfloridahouse.gov//FileStores/Web/Imaging/Member/4709.jpg","id":"ocd-person/a8c88fee-1915-4907-ae37-5755c4bff446","email":"JuanF.Barquin@myfloridahouse.gov","chamber":"House","party":"Republican","parent":"Florida Legislature","district":"119","fullDistrict":"Florida State House district 119"}} );
  //const [results, setResults] = React.useState( {"one" : {}, "two" : {} });

  const [minimalResults, setMinimalResults] = React.useState ({})
  const [buttonDisabled, setButtonDisabled] = React.useState ( false)
  const [showStatus, setShowStatus] = React.useState (false)
  const [showStatusBar, setShowStatusBar] = React.useState (false)
  const [showStatusCheck, setShowStatusCheck] = React.useState (false)
  const [status, setStatus] = React.useState ("..Search")
  const [currentSearchTerm, setCurrentSearchTerm] = React.useState ('')
  const [coordinates, setCoordinates] = React.useState ({lat: '', lng: ''})
  const [firstMatch, setFirstMatch] = React.useState ('')
  const [formInfo, setFormInfo] = React.useState({

      
      address: ''
      //nameIsFocused: false,
        
  })

  const handleChange = event => {
      
    const v = event.target.value;
    const { id } = props;
    const value = event.target.value;
    
    setFormInfo({ 
      ...formInfo,
      [event.target.name]: v,
      error: '' 
    });
    
  }


  const handleChange2 = event => {
    console.log("handle change 222")
    
    //resets search if user erases first search term
    if (currentSearchTerm != event){

      setStatus("..Search")
      setShowStatus(false)
      setShowStatusCheck(false)
    
    } 
    
    
    setFormInfo({ 
      address: event
    });
    
  }

    
  return (

    <>

      {console.log("rendering lookupSection")}
        
      <Lookup_Section_Wrapper>

        <h1 style={{gridArea: "title", padding: "25px 10px 10px 10px", lineHeight: "1.5em", textAlign: "center"}}> Find your Florida State Legistlators </h1>
        <LookupForm firstMatch={firstMatch} setFirstMatch={setFirstMatch} coordinates={coordinates} setCoordinates={setCoordinates} showStatusCheck={showStatusCheck} setShowStatusCheck={setShowStatusCheck} status={status} setStatus={setStatus} currentSearchTerm={currentSearchTerm} setCurrentSearchTerm={setCurrentSearchTerm} showStatus={showStatus} setShowStatus={setShowStatus} showStatusBar={showStatusBar} setShowStatusBar={setShowStatusBar} buttonDisabled={buttonDisabled} setButtonDisabled={setButtonDisabled} showCards={showCards} setShowCards={setShowCards} setMinimalResults={setMinimalResults} handleChange={handleChange} handleChange2={handleChange2}formInfo={formInfo} setFormInfo={setFormInfo} setResults={setResults} style={{gridArea: "form"}}/>

        <Results>
          <ResultCardOne showCards={showCards} results={results} />

          <ResultCardTwo showCards={showCards} results={results} />
        </Results>
        
      </Lookup_Section_Wrapper>
    
    </>


  )

}


export default props => <Look_Up_Section {...props} />