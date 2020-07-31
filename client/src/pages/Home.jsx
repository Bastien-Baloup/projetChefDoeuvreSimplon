import React from 'react'
import Card from '../components/Card'
import Carousel from '../components/Carousel'

const Home = (props) => {
  const handleOnDragStart = (e) => e.preventDefault()
  var listArticles = props.articles.map(article => <Card article={article} key={article.id} onDragStart={handleOnDragStart} inCarousel />)
  var listNew = props.new.map(product => <Card product={product} key={product.id} onDragStart={handleOnDragStart} inCarousel />)
  return (
    <>
      <h2>Accueil</h2>
      <Carousel items={listArticles} />
      <Carousel items={listNew} />
    </>
  )
}

export default Home
