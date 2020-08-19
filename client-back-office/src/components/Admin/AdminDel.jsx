import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import Spinner from '../Spinner'

const apiUrl = window.localStorage.getItem('apiUrl')

const AdminDel = () => {
  const id = useParams().id
  const [error, setError] = useState()
  const [isDeleted, setIsDeleted] = useState(false)

  useEffect(() => {
    axios.get(apiUrl + '/admin/' + id)
      .then(
        res => {
          var admin = res.data
          if (admin) {
            axios.delete(apiUrl + '/admin/' + admin._id)
              .then(
                res => setIsDeleted(true),
                error => {
                  setError(error)
                  console.log(error.response.data.message)
                }
              )
          } else {
            setError(new Error("l'admin " + id + " n'existe pas"))
          }
        },
        error => setError(error)
      )
  }, [id])

  var content = 'Une erreur inconnue est survenue'
  if (error) {
    content = <div className='error'>Error: {error.response ? error.response.data.message : error.message}</div>
  } else if (isDeleted) {
    content = <div className='success'>Le compte admin à été supprimé</div>
  } else {
    content = <Spinner />
  }
  return (
    <>
      <h3 className='subtitle'>Suppression d'un compte administrateur</h3>
      {content}
    </>
  )
}

export default AdminDel
