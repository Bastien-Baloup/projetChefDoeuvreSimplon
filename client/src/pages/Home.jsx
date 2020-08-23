import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../components/Card'
import Carousel from '../components/Carousel'
import Spinner from '../components/Spinner'

const apiUrl = window.localStorage.getItem('apiUrl')

const Home = (props) => {
  const [error, setError] = useState()
  const [isArtcilesLoaded, setIsArticlesLoaded] = useState(false)
  const [isNewLoaded, setIsNewLoaded] = useState(false)

  const [articles, setArticles] = useState()
  const [newAndSales, setNewAndSales] = useState()

  useEffect(() => {
    axios.get(apiUrl + '/article/last/15')
      .then(
        res => {
          setArticles(res.data)
          setIsArticlesLoaded(true)
        },
        error => setError(error)
      )
    axios.get(apiUrl + '/product/last/15')
      .then(
        res => {
          setNewAndSales(res.data)
          setIsNewLoaded(true)
        },
        error => setError(error)
      )
  }, [])

  const handleOnDragStart = (e) => e.preventDefault()
  if (!error && isArtcilesLoaded && isNewLoaded) {
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
          isArtcilesLoaded
            ? (
              <Carousel items={listArticles} />
            ) : (
              <Spinner />
            )
        )}
      {!error &&
        (
          isNewLoaded
            ? (
              <Carousel items={listNew} />
            ) : (
              <Spinner />
            )
        )}
    </>
  )
}

export default Home
