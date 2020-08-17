import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import Spinner from '../Spinner'

const apiUrl = window.localStorage.getItem('apiUrl')

const ClientForm = () => {
  const id = useParams().id
  const [error, setError] = useState()
  const [isLoaded, setIsLoaded] = useState(false)
  const [_client, setClient] = useState()

  const handleModify = (e) => {
    e.preventDefault()
    const form = e.target

    var client = {
      email_address: form[0].value
    }

    axios.put(apiUrl + '/client/' + _client._id + '/a', { client })
      .then(
        res => window.location.assign('/clients'),
        error => setError(error)
      )
  }

  useEffect(() => {
    if (id) {
      axios.get(apiUrl + '/client/' + id + '/a')
        .then(
          res => {
            setClient(res.data)
            setIsLoaded(true)
          },
          error => setError(error)
        )
    }
  }, [])

  var content = []

  if (!id) {
    content.push(<div className='error' key='error'>Error: L'id du client ne peut être nul</div>)
  } else if (isLoaded) {
    content.push(
      <form action='' key='modify' onSubmit={handleModify}>
        <div className='field'>
          <label htmlFor='email' className='label'>Email du Client</label>
          <input type='email' name='email' id='email' defaultValue={_client.client_email} className='control' />
        </div>
        <div className='control'>
          <button type='submit' className='button'>submit</button>
        </div>
      </form>
    )
  } else {
    content.push(<Spinner key='spinner' />)
  }
  if (error) {
    content.push(<div className='error' key='error'>Error: {error.response !== undefined ? error.response.data.message : error.message}</div>)
  }
  return (
    <>{content}</>
  )
}

export default ClientForm
