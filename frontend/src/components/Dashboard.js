import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';

const Greeting = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 2rem;
`;

const Dashboard = ({ user, setUser }) => {

  async function getName() {
    try {

      const response = await fetch('http://localhost:4000/dashboard/', {
        method: 'GET',
        headers: { token: localStorage.token }
      })

      const parseRes = await response.json()
      setUser(parseRes)

    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    getName()
  }, [])

  return (
    <Fragment>
      <Greeting>
        <h1>Hello {user.username}!</h1>
      </Greeting>
    </Fragment>
  )
}

export default Dashboard