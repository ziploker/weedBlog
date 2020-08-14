import React, {useEffect, useState, useRef} from 'react';
import styled, { ThemeProvider } from 'styled-components';
import LookupForm from '../packs/lookupForm.jsx'
import ResultCardOne from './resultCardOne.jsx'
import ResultCardTwo from './resultCardTwo.jsx'
import ResetButton from './newSearchButton.jsx'


const BottomHalf = styled.div`

  
  background-color: #D8DED9;
  



`;
const Lookup_Section_Wrapper = styled.div`
    
  display: grid;
  //grid-gap: 25px;
  padding: 25px;
  grid-template-columns: minmax(150px, 1fr);
  //grid-template-rows: 90px minmax(min-content, 360px) minmax(min-content, 360px);
  justify-content: center;
  justify-items: center;
  grid-template-areas:
          
          "banner"
          "subbanner"
          "form"
          "results";


  margin-top: 25px;
  //background-color: #F9F9F9;

/*  //screen and (min-width: 750px)\
*/
  //@media screen and (min-width: 500px){
      
  //    display: grid;
  //    //grid-gap: 25px;
  //    grid-template-rows: 20% 10% minmax(min-content, max-content) 1fr;
  //    grid-template-columns: minmax(min-content, max-content) minmax(min-content, max-content);
  //    grid-template-areas:
          
  //        "banner banner"
  //        "subbanner subbanner"
  //        "form form"
  //        "results results";
            
    //}
    
`;

const Banner = styled.h1`


  grid-area: banner; 
  padding: 60px 10px 0px 10px;
  margin-bottom: 20px;
  
  text-align: center;
  align-self: flex-end;
  line-height: 120%;
  

`;

const SubBanner = styled.h3`


  grid-area: subbanner; 
  
  
  text-align: center;

`;

const Results = styled.div`

    //background-color: ${props => props.theme.offWhite};

    display: grid;
    grid-template-columns: repeat( 2, minmax(210px,300px) );
    
    grid-gap: 30px;
    grid-area: results;
    padding: 20px 20px;
    

    @media screen and (max-width: 600px){

      grid-template-columns: minmax(210px,300px);

    }

    

    



`;

function Look_Up_Section (props, ref) {

  const [showCards, setShowCards] = React.useState( false )
  //const [results, setResults] = React.useState( {"one":{"name":"Annette Taddeo","firstName":"Annette","lastName":"Taddeo","image":"http://www.flsenate.gov/PublishedContent/Senators/2018-2020/Photos/s40_5331.jpg","id":"ocd-person/ea190b03-d1ca-4d75-89c7-dca745386db7","email":"taddeo.annette.web@flsenate.gov","chamber":"Senate","party":"Democrat","parent":"Florida Legislature","district":"40","fullDistrict":"Florida State Senate district 40"},"two":{"name":"Juan Alfonso Fernandez-Barquin","firstName":"","lastName":"","image":"https://www.myfloridahouse.gov//FileStores/Web/Imaging/Member/4709.jpg","id":"ocd-person/a8c88fee-1915-4907-ae37-5755c4bff446","email":"JuanF.Barquin@myfloridahouse.gov","chamber":"House","party":"Republican","parent":"Florida Legislature","district":"119","fullDistrict":"Florida State House district 119"}} );
  const [results, setResults] = React.useState( {"one": {}, "two": {} });

  const [showStatusSpinner, setShowStatusSpinner] = React.useState (false)
  const [showStatusCheck, setShowStatusCheck] = React.useState (false)

  const [status, setStatus] = React.useState ("")
  const [lastTermSearched, setLastTermSearched] = React.useState ('')

  const [coordinates, setCoordinates] = React.useState ({lat: '', lng: ''})

  const [searchButtonActive, setSearchButtonActive] = React.useState (false)
  
  const [formInfo, setFormInfo] = React.useState({
    
    address: ''
  
  })

  
  
  


  const handleChange2 = event => {
    console.log("handle change 222")
    
    //resets search if user erases first search term
    if (event != lastTermSearched){

      setStatus("")
      setShowStatusCheck(false)
    
    } 
    
    
    setFormInfo({ 
      address: event
    });
    

    //if (!formInfo.address ){
      
    //  setSearchButtonActive( true)
    //} else{

    //  setSearchButtonActive( false)

    //}
      
  }

    
  return (

    <BottomHalf >

      {console.log("rendering lookupSection")}
        
      <Lookup_Section_Wrapper>

        <Banner ref={ref}> Find Your State Representative </Banner>
        <SubBanner > ...and send them a messages </SubBanner>
        <LookupForm 
          setSearchButtonActive={setSearchButtonActive} 
          searchButtonActive={searchButtonActive} 
          
          coordinates={coordinates} 
          setCoordinates={setCoordinates} 
          showStatusCheck={showStatusCheck} 
          setShowStatusCheck={setShowStatusCheck} 
          status={status} 
          setStatus={setStatus} 
          lastTermSearched={lastTermSearched} 
          setLastTermSearched={setLastTermSearched} 
          showStatusSpinner={showStatusSpinner} 
          setShowStatusSpinner={setShowStatusSpinner} 
          showCards={showCards} 
          setShowCards={setShowCards} 
          
          handleChange2={handleChange2}
          formInfo={formInfo} 
          setFormInfo={setFormInfo} 
          setResults={setResults}
          
        />

        <Results>
          <ResultCardOne showCards={showCards} results={results} />

          <ResultCardTwo showCards={showCards} results={results} />
        </Results>
        
      </Lookup_Section_Wrapper>
    
    </BottomHalf> 


  )

}

const Newish = React.forwardRef(Look_Up_Section);


//export default props => <Look_Up_Section {...props} />

export default Newish;