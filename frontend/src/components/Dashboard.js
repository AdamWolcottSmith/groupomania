import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import GetPosts from './GetPosts'
import styled from 'styled-components';
import CreatePosts from './CreatePosts';

const Greeting = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 2rem;
`;

const Dashboard = ({ setAuth }) => {

  const [name, setName] = useState('')

  async function getName() {
    try {

      const response = await fetch('http://localhost:4000/dashboard/', {
        method: 'GET',
        headers: { token: localStorage.token }
      })

      const parseRes = await response.json()

      setName(parseRes.username)

    } catch (error) {
      console.error(error.message)
    }
  }

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    setAuth(false)
    toast.success('Logged out successfully')
  }

  useEffect(() => {
    getName()
  }, [])

  return (
    <Fragment>

      <Greeting>
        <h1>Hello {name}!</h1>
        <button className="btn btn-primary col-sm-2" onClick={e => logout(e)}>Log Out</button>
        <button className="btn btn-danger col-sm-2" onClick={e => logout(e)}>Delete Account</button>
      </Greeting>
      <CreatePosts />

      <GetPosts />

    </Fragment>
  )
}

export default Dashboard