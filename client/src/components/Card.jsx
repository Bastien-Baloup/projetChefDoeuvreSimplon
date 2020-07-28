import React from 'react'
import { Link } from 'react-router-dom'

class Card extends React.Component {
  render (_props) {
    var { article, product } = this.props
    if (product) {
      product.sale = 0
      product.id = Math.round(Math.random() * 10)
      var reducedPrice = product.price * (1 - (product.sale / 100))
    }
    return (
      <div className='card'>
        {product && (
          <div className='product'>
            <Link to={'/product/' + product.name} className='img'><img src={product.image} alt={'image du produit ' + product.name} /></Link>
            <Link to={'/product/' + product.name}>{product.name}</Link>
            {(product.sale !== 0) ? (
              <>
                <p className='oldPrice'>{product.price + '€'}</p>
                <p className='price'>{reducedPrice + '€'}</p>
              </>
            ) : (
              <p className='price'>{product.price + '€'}</p>
            )}
          </div>
        )}
        {article && (
          <div className='article'>
            <img src={article.img} alt='' />
            <div className='overlay' />
            <Link to={'/article/' + article.name}>{article.name}</Link>
            <p>{article.excerpt}</p>
          </div>
        )}
      </div>
    )
  }
}

export default Card
