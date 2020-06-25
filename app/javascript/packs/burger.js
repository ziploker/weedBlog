// Burger.js
import React from 'react';
import { bool, func } from 'prop-types';
import StyledBurger from './burger.styled'





const Burger = (props) => {
  return (
    <StyledBurger open={props.open} onClick={() => {props.setOpen(!props.open)}}>
      <div />
      <div />
      <div />
    </StyledBurger>
    
  )
}


Burger.propTypes = {
    open: bool.isRequired,
    setOpen: func.isRequired,
  };
export default props => <Burger {...props}/>;