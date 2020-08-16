import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import Spinner from '../Spinner'

const apiUrl = window.localStorage.getItem('apiUrl')

const OrderList = () => {
  const [error, setError] = useState()
  const [isLoaded, setIsLoaded] = useState(false)

  const [orders, setOrders] = useState()

  useEffect(() => {
    axios.get(apiUrl + '/order')
      .then(
        res => {
          setOrders(res.data)
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
            <th>id</th>
            <th>E-mail du client</th>
            <th>Téléphone client</th>
            <th>Date de commande</th>
            <th>N° de facture</th>
            <th>N° de Livraison</th>
            <th>validé ?</th>
            <th>livré ?</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(
            order =>
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.client_email}</td>
                <td>{order.delivery_phone}</td>
                <td>{new Date(order.date).toLocaleDateString('fr-FR')}</td>
                <td>{order.billId}</td>
                <td>{order.trackingNumber}</td>
                <td>
                  <span className={'icon ' + (order.validated ? 'has-text-success' : 'has-text-warning')}>
                    <FontAwesomeIcon icon={order.validated ? faCheck : faTimes} />
                  </span>
                </td>
                <td>
                  <span className={'icon ' + (order.delivered ? 'has-text-success' : 'has-text-warning')}>
                    <FontAwesomeIcon icon={order.delivered ? faCheck : faTimes} />
                  </span>
                </td>
                <td>
                  <Link to={'/orders/modify/' + order._id}>
                    <span className='icon'>
                      <FontAwesomeIcon icon={faEdit} />
                    </span>
                  </Link>
                  <Link to={'/orders/delete/' + order._id}>
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

export default OrderList
