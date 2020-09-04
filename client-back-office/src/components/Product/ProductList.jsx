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
    content = <div className='error'>Error: {error.response ? error.response.data.message : error.message}</div>
  } else if (isLoaded) {
    content =
      <table className='table is-hoverable'>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Cat&eacute;gorie</th>
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
                <td>{product.categories}</td>
                <td>{product.price}</td>
                <td>{product.sale}</td>
                <td>{product.stock}</td>
                <td>{new Date(product.addDate).toLocaleDateString('fr-FR')}</td>
                <td>
                  <Link to={'/products/modify/' + product._id}>
                    <span className='icon'>
                      <FontAwesomeIcon icon={faEdit} />
                    </span>
                  </Link>
                  <Link to={'/products/delete/' + product._id}>
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
      <h3 className='subtitle'>Liste des produits</h3>
      {content}
    </>
  )
}

export default ProductList
