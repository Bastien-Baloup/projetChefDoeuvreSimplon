import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import Spinner from '../Spinner'

const apiUrl = window.localStorage.getItem('apiUrl')

const OrderDel = () => {
  const id = useParams().id
  const [error, setError] = useState()
  const [isDeleted, setIsDeleted] = useState(false)

  useEffect(() => {
    axios.get(apiUrl + '/order/byId/' + id)
      .then(
        res => {
          var order = res.data
          if (order) {
            axios.delete(apiUrl + '/order/' + order._id)
              .then(
                res => setIsDeleted(true),
                error => {
                  setError(error)
                  console.log(error.response.data.message)
                }
              )
          } else {
            setError(new Error('la commande ' + id + " n'existe pas"))
          }
        },
        error => setError(error)
      )
  }, [])

  var content = 'Une erreur inconnue est survenue'
  if (error) {
    content = <div className='error'>Error: {error.response ? error.response.data.message : error.message}</div>
  } else if (isDeleted) {
    content = <div className='success'>La commande à été supprimé</div>
  } else {
    content = <Spinner />
  }
  return (
    <>
      <h3 className='subtitle'>Suppression d'une commande</h3>
      {content}
    </>
  )
}

export default OrderDel
