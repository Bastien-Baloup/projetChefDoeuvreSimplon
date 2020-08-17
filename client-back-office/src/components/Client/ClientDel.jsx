import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import Spinner from '../Spinner'

const apiUrl = window.localStorage.getItem('apiUrl')

const ClientDel = () => {
  const id = useParams().id
  const [error, setError] = useState()
  const [isDeleted, setIsDeleted] = useState(false)

  useEffect(() => {
    axios.get(apiUrl + '/client/' + id + '/a')
      .then(
        res => {
          var client = res.data
          if (client) {
            axios.delete(apiUrl + '/client/' + client._id + '/a')
              .then(
                res => setIsDeleted(true),
                error => {
                  setError(error)
                  console.log(error.response.data.message)
                }
              )
          } else {
            setError(new Error('le client ' + id + " n'existe pas"))
          }
        },
        error => setError(error)
      )
  }, [])

  var content = 'Une erreur inconnue est survenue'
  if (error) {
    content = <div className='error'>Error: {error.response ? error.response.data.message : error.message}</div>
  } else if (isDeleted) {
    content = <div className='success'>Le compte client à été supprimé</div>
  } else {
    content = <Spinner />
  }
  return (
    <>
      {content}
    </>
  )
}

export default ClientDel
