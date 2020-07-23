import styled from 'styled-components';

const Card = styled.div`
  box-sizing: border-box;
  max-width: 430px;
  margin-bottom: 20px;
  //padding: 0 2rem;
  
  //margin-top: 100px;

  background-color: #fff;
  border: 1px solid transparent;
  
  box-shadow: 0 1px 1px rgba(0,0,0,0.05);
  border-radius: 8px;
`;

const H2 = styled.h2`

  margin: 0 20px;
  line-height: 1.5;
  font-size: 24px;
       

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 40px 0px 40px;
`;

const FormItem = styled.div`

  position: relative;
  margin: 0 0 20px 0;
  padding: 0;



`;

const Label = styled.label`

  height: 100%;
  line-height: 44px;
  
  color: #62748e;
  
  //font-weight: bold;
  


  display: inline-block;
  position:absolute;
  left: 52px;
  
  transition: all 150ms ease-in;
  color: #9FA5C4;
  pointer-events: none;

  
  
  
  transform: ${props => props.className == "field-active" ? "translateY(-22px)" : 0};
  font-size: .6em;
  
  text-shadow: 1px 0 0 #fff, -1px 0 0 #fff, 2px 0 0 #fff, -2px 0 0 #fff, 0 1px 0 #fff, 0 -1px 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff;
          
              

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
  
  filter: none;
  
  
`;

const Button = styled.button`
  background: linear-gradient(to bottom, #6371c7, #5563c1);
  border-color: #3f4eae;
  border-radius: 3px;
  padding: 1rem;
  color: white;
  font-weight: 700;
  width: 100%;:
  margin-bottom: 1rem;
  font-size: 0.8rem;
  
  cursor: pointer;
  
`;

const Logo = styled.img`
  width: 51px;
  height: 51px;
  
  //margin: 0 0 40px;
  justify-self: center;
`;

const ErrorWrapper = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 30px;
  line-height: .7em;


`;
const ErrorMsg = styled.h4`
  
  font-size: .5em;
  padding: 5px 12px;
  
`;

const RedX = styled.img`

  display: ${props => props.status == "" ? "none" : "initial"};
  height: 15px;


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
  padding-bottom: 20px;
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;

`;

const LogoWrapper = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 10px 15px;

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

export { Form, Input, Button, Logo, Card, RedX, LoginWrapper, 
  InputIcon, LogoWrapper, H2, FormItem, Label, ErrorMsg, ErrorWrapper };