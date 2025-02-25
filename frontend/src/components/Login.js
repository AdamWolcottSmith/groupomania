import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import styled from 'styled-components'

const StyledLogin = styled.div`
  h1 {
    margin-top: 22%;
  }
`

const Login = ({ setAuth }) => {

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  })

  const { email, password } = inputs

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const onSubmitForm = async (e) => {
    e.preventDefault()
    try {

      const body = { email, password, }

      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const parseRes = await response.json()

      if (parseRes.token) {

        localStorage.setItem('token', parseRes.token)

        setAuth(true)
        toast.success('logged in successfully', { style: { backgroundColor: 'aquamarine', color: 'black' } })
      } else {
        setAuth(false)
        toast.error(parseRes)
      }

    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <StyledLogin>
      <h1 className="text-center">Login</h1>
      <form onSubmit={onSubmitForm}>
        <input type="email" name="email" placeholder="email" className="form-control my-3" value={email} onChange={e => onChange(e)} />
        <input type="password" name="password" placeholder="password" className="form-control my-3" value={password} onChange={e => onChange(e)} />
        <button className="btn btn-success btn-block">Log In</button>
      </form>
      <Link to='/register'>Register</Link>
    </StyledLogin>
  )
}

export default Login