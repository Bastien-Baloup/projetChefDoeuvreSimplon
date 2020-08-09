import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Carousel from '../components/Carousel'
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const fetch = window.fetch
const apiUrl = 'http://localhost:3030'

const Home = (props) => {
  const [error, setError] = useState()
  const [isAtcilesLoaded, setIsArticlesLoaded] = useState(false)
  const [isNewLoaded, setIsNewLoaded] = useState(false)

  const [articles, setArticles] = useState()
  const [newAndSales, setNewAndSales] = useState()

  useEffect(() => {
    fetch(apiUrl + '/get/lastArticles').then(res => res.json())
      .then(
        result => {
          setArticles(result)
          setIsArticlesLoaded(true)
        },
        error => setError(error)
      )
    fetch(apiUrl + '/get/newAndSales').then(res => res.json())
      .then(
        result => {
          setNewAndSales(result)
          setIsNewLoaded(true)
        },
        error => setError(error)
      )
  }, [])

  const handleOnDragStart = (e) => e.preventDefault()
  if (!error && isAtcilesLoaded && isNewLoaded) {
    var listArticles = articles.map(article => <Card article={article} key={article.id} onDragStart={handleOnDragStart} inCarousel />)
    var listNew = newAndSales.map(product => <Card product={product} key={product.id} onDragStart={handleOnDragStart} inCarousel />)
  }
  return (
    <>
      <h2>Accueil</h2>
      {error
        ? (
          <div className='error'>Error: {error.message}</div>
        ) : (
          isAtcilesLoaded
            ? (
              <Carousel items={listArticles} />
            ) : (
              <div className='spinnerWrapp'><FontAwesomeIcon icon={faDiceD20} className='spinner' /></div>
            )
        )}
      {!error &&
        (
          isNewLoaded
            ? (
              <Carousel items={listNew} />
            ) : (
              <div className='spinnerWrapp'><FontAwesomeIcon icon={faDiceD20} className='spinner' /></div>
            )
        )}
    </>
  )
}

export default Home
