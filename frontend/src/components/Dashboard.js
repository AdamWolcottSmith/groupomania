import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';

const Greeting = styled.div`
  position: relative;
  top: 50px;
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
    // eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      <Greeting>
        <h2>Hello {user.username}!</h2>
      </Greeting>
    </Fragment>
  )
}

export default Dashboard