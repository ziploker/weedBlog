import styled from 'styled-components';

const Card = styled.div`
  box-sizing: border-box;
  max-width: 430px;
  //margin: 0 auto 20px;
  //padding: 0 2rem;
  
  //margin-top: 100px;

  background-color: #fff;
  border: 1px solid transparent;
  
  box-shadow: 0 1px 1px rgba(0,0,0,0.05);
  border-radius: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px 40px 0px 40px;
`;

const Input = styled.input`
  padding: 1rem;
  
  margin: 0px;
  width: 100%;
  height: 44px;
  padding-left: 50px;
  box-shadow: inset 0 1px 2px rgba(203,203,210,0.4);

  padding-right: 8px;

  font-size: 14px;
line-height: 1.42857;
color: #3f3f44;
background-color: #fff;
background-image: none;
border: 1px solid #cbcbd2;
border-radius: 4px;

  
`;

const Button = styled.button`
  background: linear-gradient(to bottom, #6371c7, #5563c1);
  border-color: #3f4eae;
  border-radius: 3px;
  padding: 1rem;
  color: white;
  font-weight: 700;
  width: 100%;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  
  cursor: pointer;
  
`;

const Logo = styled.img`
  width: 69px;
  height: 98px;
  
  margin: 0 0 40px;
  justify-self: center;
`;

const Error = styled.div`
  
  font-size: .5em;
  padding: 5px 12px;
  
`;

const RedX = styled.img`

  display: ${props => props.status == "pink" ? "initial" : "none"};

`;
const LoginWrapper = styled.div`
  position: relative;
  height: 100%;
  background-color: orange;
  display: grid;
  
  align-items: center;
  justify-content: center;
  grid-template-columns: minmax(200px, 430px);
  
  padding-top: 60px;
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;

`;

const InputIcon = styled.div`

position: absolute;
bottom: 13px;
margin-top: -9px;
left: 12px;
width: 18px;
height: 18px;

&::after{

  content: '';
  position: absolute;
  right: -11px;
  top: -10px;
  bottom: -10px;
  width: 1px;
  opacity: .5;
  background-color: rgba(212,212,212,0);
  background-image: linear-gradient(to top,rgba(212,212,212,0) 0,#d4d4d4 30%,#d4d4d4 70%,rgba(212,212,212,0) 100%);
}
  
`;

export { Form, Input, Button, Logo, Card, Error, RedX, LoginWrapper, InputIcon };