import React, {Component, useEffect, useState, useRef} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import $ from 'jquery';
//import lilDownArrow from '../../../../'
//import '../components/fix.js'
import slugify from 'react-slugify'





const Section = styled.section`

    //background: rgb(136,189,188);
    //background: radial-gradient(circle, rgba(136,189,188,1) 0%, rgba(158,190,189,0.9612044646960347) 41%);
    //background: #F7C562;
    //height: 100vh;
    //min-height: 400px;
    position: relative;

`;


const Form = styled.form`

  display: grid;
  //grid-template-columns: 90%;
  grid-gap: 1.5rem;

`;


const FormWrapper = styled.div`

  display: flex;
  justify-content: center;
  padding: 20px;
`;

const OptionWrapper = styled.div`


`;


const formData = new FormData();



function CommentForm(props) {


  const [state, setState] = React.useState({

    
    comment: '',
    error: ''
    
    //emailIsFocused: false,
    //company: '',
    //companyIsFocused: false,
    //zip: '',
    //zipIsFocused: false,
    //message: '',
    //messageIsFocused: false,
    //error: '',
    //activeIndex: null

  })
    
   
  
  const handleAdd = e => {
    
    e.preventDefault();
    
    if (validForm()) {


     
     
     formData.append('event[comment]', state.comment);
     formData.append('event[articleID]', props.articleID);
     formData.append('event[commentID]', props.commentID);
     
     
     

     console.log("formdata from handle add");
     console.log(formData);

      
      //get token for form submission
      const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");  
      
      $.ajax({
          
        url: '/comments',
        headers: {
          
          'X-CSRF-Token': csrf
        },
        method: 'POST',
        data: 
          formData,
          contentType: false,
          processData: false
            
          
        ,
        success: function(data) {
          //props.handleAdd(data);
          //setState({

            //focussed: (props.focussed) || false,
            //comment: ''
            
          //});

          //props.setState("done")
          
          props.setArtDataComments(data.comments)
          
          setState({...state,comment: ''})
    
        },
        error: function(xhr, status, error) {
          alert('Comment did not reach server: ', error);
        }
      })
    } else {
      alert('Please type a comment.');
    }
  }

  
  const validForm = () => {
    if (state.comment ) {
      return true;
    } else {
      return false;
    }
  }

  
  const handleChange = event => {
    console.log("handle change from form")
    console.log(event)

    const v = event.target.value;

    const { id } = props;
    const value = event.target.value;
    console.log("nameeeeee = " + event.target.name)
    console.log("valluuee = " + event.target.value)
    console.log("focus = " + event.target.tagger)
    
    
    if (event.target.name == "title"){

      setState({ 
        ...state,
        slug: slugify(v),
        [event.target.name]: v,
        error: '' 
      });

    }else{
    
      setState({ 
        ...state,
        [event.target.name]: v,
        error: '' 
      });
      //return onChange(id, value);
    }
  }
  
  
  const getClass = () =>{
      
    if(state.focus === true)
      return "field focussed";
    else
      return "field";

  }

  const handleImageChange = event => {

    console.log("chd");
    console.log(event.target);
    formData.append('event[image]', event.target.files[0]);
  }

  const { focussed, value, error, label } = state;
  const { id, type, locked } = props;
  //const fieldClassName = `field ${(locked ? focussed : focussed || value) && 'focussed'}`;
  //const fcn = state.nameIsFocused ? "xxxfocused" : "xxxNotfocused"
  
  return(

    <FormWrapper>
      <Form className="form-inline" onSubmit={handleAdd} enctype="multipart/form-data" >
        
        
        <div className="field" >
        
          <input type="text"
            index={1}
            
            className="form-control"
            name="comment"
            
            placeholder="say something...."
            
            value={state.comment}
            onChange={handleChange} 
          />
        </div>

       
        
        
          

        
        <button type="submit" className="btn btn-primary">Add</button>
      </Form>
    </FormWrapper>
  )
}


//const ReCaptcha = styled.div``;







export default props => <CommentForm {...props} />;
