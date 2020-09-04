import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Spinner from '../Spinner'

const apiUrl = window.localStorage.getItem('apiUrl')

const OrderRead = () => {
  const id = useParams().id
  const [error, setError] = useState()
  const [isLoaded, setIsLoaded] = useState(false)
  const [order, setOrder] = useState()
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (id) {
      axios.get(apiUrl + '/order/' + id)
        .then(
          res => {
            var promises = []
            setOrder(res.data)
            var _order = res.data
            _order.products.forEach(
              product => promises.push(
                axios.get(apiUrl + '/product/' + product.product_id).then(res => res.data)
              ))

            Promise.all(promises)
              .then(
                _products => {
                  _products.forEach(_product => {
                    setProducts(oldProducts => [...oldProducts, { name: _product.name, quantity: _order.products.filter(__product => __product.product_id === _product._id)[0].count }])
                  })
                })
              .then(() => setIsLoaded(true))
          },
          error => setError(error)
        )
    }
  }, [id])
  var content = []

  if (!id) {
    content.push(<div className='error' key='error'>Error: L'id de commande ne peut être nul</div>)
  } else if (isLoaded) {
    var productList = []
    products.forEach(
      product => {
        productList.push(
          <tr key={product.name}>
            <td>{product.name}</td>
            <td>{product.quantity}</td>
          </tr>
        )
      }
    )
    content.push(
      <div key='read'>
        <h3 className='subtitle'>Commande n°{order._id}</h3>
        <div className='level'>
          <div className='level-left'>
            <p className='level-item'>Email du client&nbsp;: </p>
            <p className='level-item'>{order.client_email}</p>
          </div>
        </div>
        <div className='level'>
          <div className='level-left'>
            <p className='level-item'>Adresse de livraison&nbsp;: </p>
            <p className='level-item'>{order.delivery_address}</p>
          </div>
        </div>
        <div className='level'>
          <div className='level-left'>
            <p className='level-item'>Prix&nbsp;: </p>
            <p className='level-item'>{order.price}</p>
          </div>
        </div>
        <table className='table is-hoverable'>
          <thead>
            <tr>
              <th>Nom du produit</th>
              <th>quantité</th>
            </tr>
          </thead>
          <tbody>
            {productList}
          </tbody>
        </table>
      </div>
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

export default OrderRead
