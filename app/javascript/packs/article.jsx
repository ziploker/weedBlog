import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';


import LookupSection from './lookupSection.jsx'


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";



const ArticleSection = styled.div`


    
    padding: 0px 10px;
    display: grid;
    grid-template-rows: 125px 1fr;
    grid-template-columns: minmax(200px, 700px);
    grid-template-areas:

        "banner banner"
        "content ad  ";
    grid-gap: 15px;
    justify-content: center;
    justify-items: center;
    margin-top: 80px;

    @media screen and (min-width: 750px){
        display: grid;
        grid-template-columns: 1fr  minmax(200px, 700px) minmax(10px, 200px) 1fr;
        grid-gap: 20px;

        grid-template-areas:

        "banner banner banner banner"
        "  .   content   ad     .   ";
    }
`;


const HorizontalAds = styled.div`

    background-color: pink;
    width: 100%;
    grid-area: banner;

`;
const NewsAds = styled.div`
    
    background-color: pink;
    width: 100%;
    grid-area: ad;
`;



const NewsWrapper = styled.div`

    display: grid;
    grid-template-columns: 100%;
    justify-content: center;
    position: relative;
    grid-area: content;
/*  
    @media screen and (min-width: 750px){
        grid-template-columns: minmax(200px, 1fr);
        grid-auto-rows: minmax(100px, auto);
        
        grid-gap: 20px;
        justify-content: center;
        //justify-items: center;
        
    }

    @media screen and (min-width: 1111px){
        grid-template-columns:  minmax(245px, auto) minmax(245px, auto);
        grid-gap: 20px;
        justify-content: center;
        //justify-items: center;
    }

*/
`;


function Article(props){

    const [artData, setArtData] = useState({})
    const [artDataComments, setArtDataComments] = useState([])

    console.log("Article_PROPS", props)
    
    const slug = props.match.params.id
            
    useEffect ((props) => {

        
        const mode = process.env.NODE_ENV =="development" ? "http://127.0.0.1:3000" : "https://weedblog.herokuapp.com"
        axios.post(mode + "/blog/get_article_info", {
          
          data: { 
            slug: slug
            
          }
        },
        {withCredentials: true})
        .then(response => {
          

              console.log("article info Response", response)

              setArtData(response.data.article)
              setArtDataComments(response.data.comments)
          
          
        }).catch(error => {
          
          console.log("articleErrors", error)
          
          
        })
      
    




    },[])
    

    
    return (
    
        <>

        
        <ArticleSection>
            
           <HorizontalAds/>
            
            <NewsWrapper>
        
                <h1>{artData.title}</h1>

                <h5>{artData.date}</h5>
                
                <img src={artData.url} style={{width: "100%", justifySelf: "center"}}/>
                
                

                body: {artData.body} <br/>
                comment: 


                {artDataComments.map((item,i) => 
                
                    <ul key={i}>
                        {"id = " + item.id}
                        {item.body}
                        {item.comments.map((item,i) => 
                
                        <li style={{marginLeft: "15px", listStyleType: "none"}} key={i}>
                            
                            {item.body}
                            
                            
                        </li>
                
            )}
                        
                    </ul>
                    
                )}
                
            </NewsWrapper>  
            


            <NewsAds/>

            
        
        </ArticleSection>

        
        
        </>
    );
}


export default Article;


/*



*/

  

