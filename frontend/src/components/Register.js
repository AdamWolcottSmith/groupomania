import React, { Fragment, useState } from 'react';

const Register = ({ setAuth }) => {

 const [inputs, setInputs] = useState({
  email: '',
  password: '',
  first_name: '',
  last_name: '',
 })

 const { email, password, first_name, last_name } = inputs

 const onChange = (e) => {
  setInputs({ ...inputs, [e.target.name]: e.target.value })
 }

 const onSubmitForm = async (e) => {
  e.preventDefault()
  try {

   const body = { email, password, first_name, last_name }

   const response = await fetch('http://localhost:4000/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
   })

   const parseRes = await response.json()


   localStorage.setItem('token', parseRes.token)

   setAuth(true)

  } catch (error) {
   console.error(error.message)
  }
 }

 return (
  <Fragment>
   <h1 className="text-center my-5">Register</h1>
   <form onSubmit={onSubmitForm}>
    <input type="email" name="email" placeholder="Email" className="form-control my-3" value={email} onChange={e => onChange(e)} />
    <input type="password" name="password" placeholder="Password" className="form-control my-3" value={password} onChange={e => onChange(e)} />
    <input type="text" name="first_name" placeholder="John" className="form-control my-3" value={first_name} onChange={e => onChange(e)} />
    <input type="text" name="last_name" placeholder="Smith" className="form-control my-3" value={last_name} onChange={e => onChange(e)} />
    <button className="btn btn-success btn-block">Sign Up</button>
   </form>
  </Fragment>
 )
}

export default Register