import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import Spinner from '../Spinner'

const apiUrl = window.localStorage.getItem('apiUrl')

const OrderForm = () => {
  const id = useParams().id
  const [error, setError] = useState()
  const [isLoaded, setIsLoaded] = useState(false)
  const [_order, setOrder] = useState()

  const handleModify = (e) => {
    e.preventDefault()
    const form = e.target

    var order = {
      client_email: form[0].value,
      delivery_phone: form[1].value,
      delivery_address: form[2].value,
      validated: form[3].checked,
      delivered: form[4].checked
    }

    axios.put(apiUrl + '/order/' + _order._id, { order })
      .then(
        res => window.location.assign('/orders'),
        error => setError(error)
      )
  }

  useEffect(() => {
    if (id) {
      axios.get(apiUrl + '/order/' + id)
        .then(
          res => {
            setOrder(res.data)
            setIsLoaded(true)
          },
          error => setError(error)
        )
    }
  }, [id])

  var content = []

  if (!id) {
    content.push(<div className='error' key='error'>Error: L'id de commande ne peut être nul</div>)
  } else if (isLoaded) {
    content.push(
      <>
        <h3 className='subtitle'>Modification de la commande n°{_order._id}</h3>
        <form action='' key='modify' onSubmit={handleModify}>
          <div className='field is-horizontal'>
            <label htmlFor='email' className='label column'>Email du Client</label>
            <input type='email' name='email' id='email' defaultValue={_order.client_email} className='control column' />
          </div>
          <div className='field is-horizontal'>
            <label htmlFor='phone' className='label column'>N° de Téléphone livraison</label>
            <input type='tel' name='phone' id='phone' defaultValue={_order.delivery_phone} className='control column' />
          </div>
          <div className='field is-horizontal'>
            <label htmlFor='address' className='label column'>Adresse de livraison</label>
            <input type='text' name='address' id='address' defaultValue={_order.delivery_address} className='control column' />
          </div>
          <div className='field is-horizontal'>
            <label htmlFor='validated' className='label column'>Envoyée</label>
            <div className='control column'>
              <div className='checkbox'>
                <input type='checkbox' name='validated' id='validated' defaultChecked={_order.validated} />
              </div>
            </div>
          </div>
          <div className='field is-horizontal'>
            <label htmlFor='delivered' className='label column'>Livrée</label>
            <div className='control column'>
              <div className='checkbox'>
                <input type='checkbox' name='delivered' id='delivered' defaultChecked={_order.delivered} />
              </div>
            </div>
          </div>
          <div className='control'>
            <button type='submit' className='button'>submit</button>
          </div>
        </form>
      </>
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

export default OrderForm
