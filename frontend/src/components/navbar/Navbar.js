import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import Burger from './Burger'
import pic from '../../images/icon-left-font-monochrome-black.png'

const Nav = styled.nav`
  background-color: beige;
  z-index: 1;
  position: fixed;
  top: 0;
  width: 100%;
  height: 55px;
  border-bottom: 2px solid #f1f1f1;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;

  .logo {
    padding: 15px 0;

    .img-container {
      width: 234px;
      margin-top: -104px;
    }

    h1 {
      font-size: 24px;
      display: none;
    }
  }
`;

const Navbar = ({ auth, setAuth, user }) => {
  return (
    <Nav>
      <Link to='/dashboard' className="logo">
        <div className="img-container">
          <img className="img-fluid" src={pic} alt="Groupomania logo" />
          <h1 className="logo-overrides">Group-O-Mania</h1>
        </div>
      </Link>
      <Burger auth={auth} setAuth={setAuth} user={user} />
    </Nav>
  )
}

export default Navbar