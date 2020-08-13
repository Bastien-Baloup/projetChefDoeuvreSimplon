import React from 'react'
import axios from 'axios'

const apiUrl = window.localStorage.getItem('apiUrl')

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target

    const credentials = {
      login: form[0].value,
      password: form[1].value
    }

    axios.post(apiUrl + '/auth/admin/login', { credentials })
      .then(
        res => {
          window.localStorage.setItem('token', res.data.token)
          window.localStorage.setItem('isLoggedIn', true)
          axios.defaults.headers.common.Authorization = window.localStorage.getItem('token')
          console.log('loged')
          console.log(window.localStorage.getItem('isLoggedIn'))
          window.location.assign('/')
        },
        error => console.log(error)
      )
  }
  return (
    <form action='' onSubmit={handleSubmit}>
      <label htmlFor='login'>Login</label>
      <input type='text' name='login' id='login' />
      <label htmlFor='password'>Password</label>
      <input type='password' name='password' id='password' />
      <button type='submit'>Ok</button>
    </form>
  )
}

export default Login
