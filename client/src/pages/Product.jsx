import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useCart } from 'use-cart'

import Spinner from '../components/Spinner'

const apiUrl = window.localStorage.getItem('apiUrl')

const Product = () => {
  const { name } = useParams()
  const [product, setProduct] = useState()
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState()
  const { addItem } = useCart()

  useEffect(() => {
    axios.get(apiUrl + '/product/byName/' + name)
      .then(
        res => {
          setProduct(res.data)
          setIsLoaded(true)
        },
        error => setError(error)
      )
  }, [name])

  var content = []
  if (error) content.push(<div className='error' key='error'>Error: {error.response !== undefined ? error.response.data.message : error.message}</div>)
  else if (isLoaded) {
    const tagList = product.tags.map(tag => <li key={tag}>{tag}</li>)
    var newPrice
    if (product.sale !== 0) {
      newPrice = product.price - (product.price * product.sale / 100)
    }
    content.push(
      <div key='product'>
        <div className='above'>
          <img src={product.imgSrc} alt='' />
          <div className='side'>
            <h2>{product.name}</h2>
            <div className='priceWrapper'>
              {newPrice
                ? (
                  <>
                    <p className='label'>Prix initial: </p>
                    <p className='sale'>-{product.sale}&#37;</p>
                    <p className='oldPrice'>&nbsp;{product.price}&euro;&nbsp;</p>
                    <p className='label'>Prix réduit: </p>
                    <p className='newPrice'>{newPrice}&euro;</p>
                  </>
                ) : (
                  <>
                    <p className='label'>Prix: </p>
                    <p className='price'>{product.price}&euro;</p>
                  </>
                )}
            </div>
            <button className='button' onClick={() => addItem(product._id, 1)} disabled={product.stock <1}><FontAwesomeIcon icon={faShoppingCart} />{product.stock > 0 ? ' Ajouter au panier' : ' Indisponible'} </button>
            <p className='stock label'>{product.stock} exemplaires en stock</p>
          </div>
        </div>
        <div className='below'>
          <div>
            <p className='label'>Description du produit :</p>
            <ReactMarkdown source={product.description} className='description' />
          </div>
          <div className='infoComplement'>
            <p className='label'>Categorie : </p>
            <p className='categorie'>{product.categories}</p>
            <p className='label'>Mot-cl&eacute;s: </p>
            <ul className='tags'>
              {tagList}
            </ul>
          </div>
        </div>
      </div>
    )
  } else {
    content.push(<Spinner key='loading' />)
  }
  return (
    <div className='productWrapper'>
      {content}
    </div>
  )
}

export default Product
