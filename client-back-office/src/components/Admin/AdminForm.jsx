import React, { useState } from 'react'
import axios from 'axios'

const apiUrl = window.localStorage.getItem('apiUrl')

const AdminForm = () => {
  const [error, setError] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target

    const admin = {
      name: form[0].value,
      login: form[1].value,
      password: form[2].value
    }

    axios.post(apiUrl + '/auth/admin/signup', { admin })
      .then(
        res => window.location.assign('/admins'),
        error => setError(error)
      )
  }

  var content = []

  content.push(
    <>
      <h3 className='subtitle'>Cr&eacute;ation d&apos;un compte administrateur</h3>
      <form action='' key='modify' onSubmit={handleSubmit}>
        <div className='field is-horizontal'>
          <label htmlFor='name' className='label column'>Email de l&apos;administrateur</label>
          <input type='text' name='name' id='name' className='control column' />
        </div>
        <div className='field is-horizontal'>
          <label htmlFor='login' className='label column'>Identifiant de connexion</label>
          <input type='text' name='login' id='login' className='control column' />
        </div>
        <div className='field is-horizontal'>
          <label htmlFor='password' className='label column'>Mot de passe</label>
          <input type='password' name='password' id='password' className='control column' />
        </div>
        <div className='control column'>
          <button type='submit' className='button'>submit</button>
        </div>
      </form>
    </>
  )

  if (error) {
    content.push(<div className='error' key='error'>Error: {error.response !== undefined ? error.response.data.message : error.message}</div>)
  }
  return (
    <>{content}</>
  )
}

export default AdminForm
