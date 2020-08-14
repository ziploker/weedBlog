import React from 'react';
//import { bool } from 'prop-types';
import StyledMenu from './menu.styled'
import {Link} from 'react-router-dom';

const Menu = (props) => {
  return (
    <StyledMenu open={props.open}>

      <ul>
                
                    
                    <li key={1}><a href="#">News</a></li>
                    <li key={2}>
                    
                        <a onClick={props.executeScroll}>Representative Lookup</a>
                    </li>
                    <li key={3}><a href="#">Store</a></li>
                    

                    <li key={4}>{props.carryState.loggedInStatus == "LOGGED_IN" ? [<Link key={"a"} to="/" onClick= {props.handleLogOutClick}> Logout | </Link>, <Link key={"b"} to="/edit">edit </Link>] :   [<Link key={"c"} to="/login"> Login |</Link>, <Link key={"d"} to="/signup"> Signup</Link>]  } </li>
                    
                    

                </ul>
      
    </StyledMenu>
  )
}

//Menu.propTypes = {
//open: bool.isRequired,

//}
export default props => <Menu {...props} />;



/*

<a href="/">
        <span role="img" aria-label="about us"></span>
        About us
      </a>
      <a href="/">
        <span role="img" aria-label="price"></span>
        Pricing
        </a>
      <a href="/">
        <span role="img" aria-label="contact"></span>
        Contact
        </a>

*/