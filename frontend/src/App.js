import React, { Fragment, useState, useEffect } from 'react'
import './App.css';
import Navbar from './components/navbar/Navbar';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

//components

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import CreatePosts from './components/posts/CreatePosts';
import GetPosts from './components/posts/GetPosts';
import SinglePost from './components/posts/SinglePost';

toast.configure()

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState('')

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }

  async function isAuth() {
    try {
      const response = await fetch('http://localhost:4000/auth/is-verify', {
        method: 'GET',
        headers: { token: localStorage.token }
      })

      const parseRes = await response.json()

      parseRes === true ? setIsAuthenticated(true) :
        setIsAuthenticated(false)

    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    isAuth()
  }, [])

  return (
    <Fragment>
      <Router>

        <Navbar auth={isAuthenticated} setAuth={setAuth} />

        <div className="container">
          <Switch>
            <Route exact path='/login'
              render={props =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to='/dashboard' />
                )
              }
            />
            <Route exact path='/register'
              render={props =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to='/login' />
                )
              }
            />
            <Route exact path='/dashboard'
              render={props =>
                isAuthenticated ? (
                  <>
                    <Dashboard {...props} setAuth={setAuth} user={user} setUser={setUser} />
                    <CreatePosts posts={posts} setPosts={setPosts} />
                    <GetPosts posts={posts} setPosts={setPosts} />
                  </>
                ) : (
                  <Redirect to='/login' />
                )
              }>
            </Route>
            <Route exact path='/dashboard/post/:id'
              render={props =>
                isAuthenticated ? (
                  <SinglePost {...props} user={user} />
                ) : (
                  <Redirect to='/login' />
                )
              }>
            </Route>
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
