import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  

  li {
    padding: 18px 10px;
    text-decoration: none;
  }

  @media (max-width: 768px) {
  flex-flow: column nowrap;
  background-color: #0d2538;
  font-size: 2em;
  position: fixed;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
  top: 0;
  right: 0;
  height: 100vh; 
  width: 100%;
  padding-top: 3.5rem;
  transition: transform 0.3s ease-in-out;
  opacity: .94;

  li {
    color:  #fff;
  }
  }
`;


const RightNav = ({ open }) => {


  return (
    <Ul open={open}>
      <Link to='/login' >
        <li>Login</li>
      </Link>
      <Link to='/register'>
        <li>Signup</li>
      </Link>
      <Link to='/dashboard'>
        <li>Home</li>
      </Link>
    </Ul>
  )
}

export default RightNav
