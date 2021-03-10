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

   setName(parseRes.first_name)

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
   <h1>Hello {name}!</h1>
   <button className="btn btn-primary" onClick={e => logout(e)}>Log Out </button>
   <GetPosts />
  </Fragment>
 )
}

export default Dashboard