import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SinglePost from './posts/SinglePost';
import CreatePosts from './posts/CreatePosts';
import GetPosts from './posts/GetPosts';

const Greeting = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 2rem;
`;

const Dashboard = ({ setAuth }) => {

  const [name, setName] = useState('')
  const [posts, setPosts] = useState([])

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
      <BrowserRouter>
        <Greeting>
          <h1>Hello {name}!</h1>
          <button className="btn btn-primary col-sm-2" onClick={e => logout(e)}>Log Out</button>
          <button className="btn btn-danger col-sm-2" onClick={e => logout(e)}>Delete Account</button>
        </Greeting>
        <CreatePosts posts={posts} setPosts={setPosts} />
        <GetPosts posts={posts} setPosts={setPosts} />

        {/* <Route exact path='/dashboard' component={() => <GetPosts posts={posts} setPosts={setPosts} />} /> */}
        <Route exact path='/dashboard/post/:id' component={SinglePost}></Route>

      </BrowserRouter>
    </Fragment>
  )
}

export default Dashboard