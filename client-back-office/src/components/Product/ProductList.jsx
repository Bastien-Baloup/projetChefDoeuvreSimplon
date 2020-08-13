import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import Spinner from '../Spinner'

const apiUrl = window.localStorage.getItem('apiUrl')

const ProductList = () => {
  const [error, setError] = useState()
  const [isLoaded, setIsLoaded] = useState(false)

  const [products, setProducts] = useState()

  useEffect(() => {
    axios.get(apiUrl + '/product')
      .then(
        res => {
          setProducts(res.data)
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
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>prix</th>
            <th>r&eacute;duction</th>
            <th>stocks</th>
            <th>date d&apos;ajout</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {products.map(
            product =>
              <tr key={product.name}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.sale}</td>
                <td>{product.stocks}</td>
                <td>{new Date(product.date).toLocaleDateString('fr-FR')}</td>
                <td><Link to={'/products/modify/' + product._id}><FontAwesomeIcon icon={faEdit} /></Link><Link to={'/products/delete/' + product._id}><FontAwesomeIcon icon={faTrash} /></Link></td>
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

export default ProductList
