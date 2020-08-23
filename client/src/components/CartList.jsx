import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCart } from 'use-cart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { loadStripe } from '@stripe/stripe-js'

import Spinner from '../components/Spinner'

const apiUrl = window.localStorage.getItem('apiUrl')
const stripePromise = loadStripe('pk_test_51HIvljFICXrfazILVECnk723gCMTshEVd6hm2BmJkIceyW7LGbRYaj3Pe96qOzFyf85Z2qVMojgHaDBIt3M0pokY00GvT4IinF')

const CartList = () => {
  const [products, setProducts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState()

  const { items, addItem, removeItem, removeLineItem, clearCart } = useCart()
  var totalPrice = 0

  useEffect(() => {
    setProducts([])
    var promises = []
    items.forEach(
      item => {
        promises.push(axios.get(apiUrl + '/product/' + item.sku).then(res => res.data))
      }
    )
    Promise.all(promises)
      .then(
        values => {
          setProducts(oldProducts => [...oldProducts, ...values])
        },
        error => {
          setError(error)
        }
      )
  }, [items])

  useEffect(() => {
    if (products.length === items.length) setIsLoaded(true)
    else setIsLoaded(false)
  }, [products, items])

  const handleClick = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise

    // Call your backend to create the Checkout Session
    const response = await axios.post(apiUrl + '/checkout/create-session', { items })

    const session = await response.data

    // When the customer clicks on the button, redirect them to Checkout.
    const _items = items
    clearCart()
    const result = await stripe.redirectToCheckout({ sessionId: session.id })

    if (result.error) {
      setError(result.error)
      window.localStorage.setItem('cart', JSON.stringify(_items))
    }
  }
  return (
    <>
      {error && <div className='error' key='error'>Error: {error.response !== undefined ? error.response.data.message : error.message}</div>}
      {isLoaded &&
        <div key='cartContent' className='cart-content'>
          <ul>
            {products.map(
              product => {
                if (items.filter(item => item.sku === product._id)[0]) {
                  var newPrice
                  var totalProductPrice = product.price * items.filter(item => item.sku === product._id)[0].quantity
                  if (product.sale !== 0) {
                    newPrice = product.price - (product.price * product.sale / 100)
                    totalProductPrice = newPrice * items.filter(item => item.sku === product._id)[0].quantity
                  }
                  totalPrice += totalProductPrice
                }
                return (
                  <li key={product._id} className='cart-content-item'>
                    <div className='imgContainer'>
                      <img src={product.imgSrc} alt='' />
                    </div>
                    <h3>{product.name}</h3>
                    <table>
                      <thead>
                        <tr>
                          <th>Prix/u</th>
                          <th>Qte.</th>
                          <th>Prix</th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <p className='price'>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(newPrice || product.price)}</p>
                          </td>
                          <td>
                            <p className='count'>{items.filter(item => item.sku === product._id)[0] && items.filter(item => item.sku === product._id)[0].quantity}</p>
                            <div className='button-count'>
                              <button
                                className='button button-count-up'
                                onClick={() => {
                                  if (items.filter(item => item.sku === product._id)[0].quantity < product.stock) {
                                    addItem(product._id)
                                  } else {
                                    setError(new Error('Pas plus de stock disponible'))
                                  }
                                }}
                              >
                                <FontAwesomeIcon icon={faCaretUp} />
                              </button>
                              <button
                                className='button button-count-down'
                                onClick={() => {
                                  removeItem(product._id)
                                  setProducts([])
                                }}
                              >
                                <FontAwesomeIcon icon={faCaretDown} />
                              </button>
                            </div>
                          </td>
                          <td>
                            <p className='total'>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalProductPrice)}</p>
                          </td>
                          <td>
                            <button className='button button-remove' onClick={() => { removeLineItem(product._id); setProducts([]) }}><FontAwesomeIcon icon={faTimes} /></button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <hr />
                  </li>
                )
              }
            )}
            {items.length === 0 && <li key='emptyCart'>Votre panier est vide</li>}
          </ul>
          <p className='total'>Total: {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalPrice)}</p>
          <button className='button button-checkout' onClick={handleClick} disabled={items.length === 0 || products.length === 0}>
            Valider la commande
          </button>
        </div>}
      {!error && !isLoaded && <Spinner key='spinner' />}
    </>
  )
}

export default CartList
