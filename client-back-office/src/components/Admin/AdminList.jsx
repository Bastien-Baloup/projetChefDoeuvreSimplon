import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import Spinner from '../Spinner'

const apiUrl = window.localStorage.getItem('apiUrl')

const AdminList = () => {
  const [error, setError] = useState()
  const [isLoaded, setIsLoaded] = useState(false)

  const [admins, setAdmins] = useState()

  useEffect(() => {
    axios.get(apiUrl + '/admin')
      .then(
        res => {
          setAdmins(res.data)
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
            <th>Nom de l&apos;admin</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(
            admin =>
              <tr key={admin._id}>
                <td>{admin.name}</td>
                <td>
                  <Link to={'/admins/delete/' + admin._id}>
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
      {content}
    </>
  )
}

export default AdminList
