import React, { useState } from 'react'
import Card from '../components/Card'
import ItemsCarousel from 'react-items-carousel'

const Home = (props) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const chevronWidth = 30
  var listArticles = props.articles.map(article => <Card article={article} key={article.id} />)
  return (
    <>
      <h2>Accueil</h2>

    </>
  )
}

export default Home
