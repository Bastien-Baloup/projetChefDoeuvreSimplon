import React, { useState } from 'react'
import axios from 'axios'

const apiUrl = window.localStorage.getItem('apiUrl')

const AdminForm = () => {
  const [error, setError] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target

    const admin = {
      title: form[0].value,
      admin: form[1].value,
      date: form[2].value,
      content: form[3].value,
      excerpt: form[4].value,
      imgSrc: form[5].value
    }

    axios.post(apiUrl + '/admin/', { admin })
      .then(
        res => window.location.assign('/admin'),
        error => setError(error)
      )
  }

  var content = []

  content.push(
    <form action='' key='modify' onSubmit={handleSubmit}>
      <div className='field'>
        <label htmlFor='name' className='label'>Email du Admin</label>
        <input type='text' name='name' id='name' className='control' />
      </div>
      <div className='field'>
        <label htmlFor='login' className='label'>Identifiant de connexion</label>
        <input type='text' name='login' id='login' className='control' />
      </div>
      <div className='field'>
        <label htmlFor='password' className='label'>Email du Admin</label>
        <input type='password' name='password' id='password' className='control' />
      </div>
      <div className='control'>
        <button type='submit' className='button'>submit</button>
      </div>
    </form>
  )

  if (error) {
    content.push(<div className='error' key='error'>Error: {error.response !== undefined ? error.response.data.message : error.message}</div>)
  }
  return (
    <>{content}</>
  )
}

export default AdminForm
