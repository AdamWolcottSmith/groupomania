import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import GetPosts from './GetPosts'

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

      <div className="container">
        <div className="row">
          <h1 className="col-sm-1">Hello {name}!</h1>
          <button className="btn btn-primary col-sm-2" onClick={e => logout(e)}>Log Out </button>
        </div>
      </div>

      <GetPosts />

    </Fragment>
  )
}

export default Dashboard