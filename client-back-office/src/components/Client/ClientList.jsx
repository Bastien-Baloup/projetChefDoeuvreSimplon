import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import Spinner from '../Spinner'

const apiUrl = window.localStorage.getItem('apiUrl')

const ClientList = () => {
  const [error, setError] = useState()
  const [isLoaded, setIsLoaded] = useState(false)

  const [clients, setClients] = useState()

  useEffect(() => {
    axios.get(apiUrl + '/client')
      .then(
        res => {
          setClients(res.data)
          setIsLoaded(true)
        },
        error => setError(error)
      )
  }, [])

  var content = <div />

  if (error) {
    content = <div className='error'>Error: {error.message}</div>
  } else if (isLoaded) {
    content =
      <table className='table is-hoverable'>
        <thead>
          <tr>
            <th>Nom du client</th>
            <th>Adresse email du client</th>
            <th>N° de tel. du client</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(
            client =>
              <tr key={client._id}>
                <td>{client.full_name}</td>
                <td>{client.email_address}</td>
                <td>{client.phone_number}</td>
                <td>
                  <Link to={'/clients/modify/' + client._id}>
                    <span className='icon'>
                      <FontAwesomeIcon icon={faEdit} />
                    </span>
                  </Link>
                  <Link to={'/clients/delete/' + client._id}>
                    <span className='icon has-text-danger'>
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </Link>
                </td>
              </tr>
          )}
        </tbody>
      </table>
  } else {
    content = <Spinner />
  }

  return (
    <>
      <h3 className='subtitle'>Liste des clients</h3>
      {content}
    </>
  )
}

export default ClientList
