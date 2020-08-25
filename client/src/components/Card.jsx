import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useCart } from 'use-cart'

const Card = ({ article, product, inCarousel }) => {
  const { addItem } = useCart()
  if (product) {
    if (!product.objectID && product._id) product.objectID = product._id
    if (!product.dispo && product.stock) product.dispo = (product.stock > 0)
    var name = product.name
    if (product.name.length > 50) {
      name = product.name.substr(0, 50) + '\u2026'
    }
    product.id = Math.round(Math.random() * 10)
    if (product.sale) {
      var reducedPrice = product.price * (1 - (product.sale / 100))
    } else {
      product.sale = 0
    }
  }

  return (
    <div className={inCarousel ? 'card inCarousel' : 'card'}>
      {product && (
        <div className='product'>
          <Link to={'/product/' + product.name} className='img'><img src={product.image || product.imgSrc} alt={'image du produit ' + product.name} /></Link>
          <Link to={'/product/' + product.name} title={product.name} className='name'>{name}</Link>
          {(product.sale !== 0) ? (
            <>
              <p className='oldPrice'>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(product.price)}</p>
              <p className='price'>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(reducedPrice)}</p>
            </>
          ) : (
            <p className='price'>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(product.price)}</p>
          )}
          <button className='button' onClick={() => addItem(product.objectID, 1)} disabled={!product.dispo}><FontAwesomeIcon icon={faShoppingCart} />{product.dispo ? 'Ajouter au panier' : 'indisponible'} </button>
        </div>
      )}
      {article && (
        <div className='article'>
          <img src={article.imgSrc} alt='' />
          <div className='overlay' />
          <Link to={'/article/' + article.title}>{article.title}</Link>
          <p>{article.excerpt}</p>
        </div>
      )}
    </div>
  )
}

export default Card
