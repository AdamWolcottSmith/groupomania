import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import styled from 'styled-components'

const StyledRegister = styled.div`
  h1 {
    margin-top: 22%;
  }
`

const Register = ({ setAuth }) => {

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    username: ''
  })

  const { email, password, username } = inputs

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const onSubmitForm = async (e) => {
    e.preventDefault()
    try {

      const body = { email, password, username }

      const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const parseRes = await response.json()


      if (parseRes.token) {

        localStorage.setItem('token', parseRes.token)

        setAuth(true)
        toast.success('Registered successfully', { style: { backgroundColor: 'aquamarine', color: 'black' } })
      } else {
        setAuth(false)
        toast.error(parseRes)
      }

    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <StyledRegister>
      <h1 className="text-center">Register</h1>
      <form onSubmit={onSubmitForm}>
        <input type="email" name="email" placeholder="Email" className="form-control my-3" value={email} onChange={e => onChange(e)} />
        <input type="password" name="password" placeholder="Password" className="form-control my-3" value={password} onChange={e => onChange(e)} />
        <input type="text" name="username" placeholder="John" className="form-control my-3" value={username} onChange={e => onChange(e)} />
        <button className="btn btn-success btn-block">Sign Up</button>
      </form>
      <Link to='/login'>Back to login</Link>
    </StyledRegister>
  )
}

export default Register