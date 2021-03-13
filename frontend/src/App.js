import React, { Fragment, useState, useEffect } from 'react'
import './App.css';
import Navbar from './components/navbar/Navbar';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

//components

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

toast.configure()

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

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
      <Navbar />
      <Router>
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
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to='/login' />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
