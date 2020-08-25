import React, { useEffect } from 'react'
import { useCart } from 'react-ecommerce-hook'

import CartList from '../components/CartList'

const Cart = () => {
  const { state: { addedIds, quantityById } } = useCart()
  var key
  useEffect(() => {
    key = Date.now()
  }, [addedIds, quantityById])

  return (
    <div className='container'>
      <h2>Mon panier</h2>
      <CartList key={key} />
    </div>
  )
}

export default Cart
