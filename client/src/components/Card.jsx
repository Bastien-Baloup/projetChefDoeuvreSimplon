import React from 'react'
import { Link } from 'react-router-dom'

class Card extends React.Component {
  render (_props) {
    var { article, product, inCarousel } = this.props
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
            <Link to={'/product/' + product.name} className='name'>{product.name}</Link>
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
