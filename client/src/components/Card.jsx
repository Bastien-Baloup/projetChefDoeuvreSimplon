import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Card = ({ article, product, inCarousel }) => {
  if (product) {
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
          <Link to={'/product/' + product.name} className='img'><img src={product.image} alt={'image du produit ' + product.name} /></Link>
          <Link to={'/product/' + product.name} title={product.name} className='name'>{product.name.substr(0, 50) + '\u2026'}</Link>
          {(product.sale !== 0) ? (
            <>
              <p className='oldPrice'>{product.price + '€'}</p>
              <p className='price'>{reducedPrice + '€'}</p>
            </>
          ) : (
            <p className='price'>{product.price + '€'}</p>
          )}
          <button><FontAwesomeIcon icon={faShoppingCart} /> Ajouter au panier</button>
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
