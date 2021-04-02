import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

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


const RightNav = ({ open, auth, setAuth, setOpen }) => {

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    setAuth(false)
    toast.success('Logged out successfully')
  }

  return (
    <Ul open={open}>
      <Link to='/dashboard' onClick={() => setOpen(!open)}>
        <li>Home</li>
      </Link>
      {auth ? (
        <Link to='/login' onClick={(e) => { logout(e); setOpen(!open) }} >
          <li>Log Out</li>
        </Link>
      ) : (
        <Link to='/login' onClick={() => setOpen(!open)}>
          <li>Login</li>
        </Link>
      )
      }
      {
        auth ? (
          <Link to='/login' onClick={(e) => { logout(e); setOpen(!open) }}>
            <li>Delete Account</li>
          </Link>
        ) : (
          <Link to='/register' onClick={() => setOpen(!open)}>
            <li>Signup</li>
          </Link>
        )
      }
    </Ul >
  )
}

export default RightNav
