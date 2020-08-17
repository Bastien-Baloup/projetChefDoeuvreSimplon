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
    <>
      <div className='navbar has-background-grey-lighter'>
        <div className='navbar-start'>
          <div className='navbar-item'>
            &nbsp;
          </div>
        </div>
      </div>
      <div className='section'>
        <div className='container'>
          <h2 className='title is-2'>Connexion</h2>
          <form action='' onSubmit={handleSubmit}>
            <div className='field is-horizontal'>
              <label htmlFor='login' className='label column'>Login</label>
              <input type='text' name='login' id='login' className='control column' />
            </div>
            <div className='field is-horizontal'>
              <label htmlFor='password' className='label column'>Password</label>
              <input type='password' name='password' id='password' className='control column' />
            </div>
            <div className='control column'>
              <button type='submit' className='button'>Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
