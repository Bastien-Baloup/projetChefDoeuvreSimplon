import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import Spinner from '../Spinner'

const apiUrl = window.localStorage.getItem('apiUrl')

const ProductDel = () => {
  const id = useParams().id
  const [error, setError] = useState()
  const [isDeleted, setIsDeleted] = useState(false)

  useEffect(() => {
    if (id) {
      axios.delete(apiUrl + '/product/' + id)
        .then(
          res => setIsDeleted(true),
          error => {
            setError(error)
            console.log(error.response.data.message)
          }
        )
    } else {
      setError(new Error("le produit d'id " + id + " n'existe pas"))
    }
  }, [])

  var content = 'Une erreur inconnue est survenue'
  if (error) {
    content = <div className='error'>Error: {error.response ? error.response.data.message : error.message}</div>
  } else if (isDeleted) {
    content = <div className='success'>Le produit à été supprimé</div>
  } else {
    content = <Spinner />
  }
  return (
    <>
      {content}
    </>
  )
}

export default ProductDel
