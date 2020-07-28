import React from 'react'
import Card from '../components/Card'
import AliceCarousel from 'react-alice-carousel'

const Home = (props) => {
  const handleOnDragStart = (e) => e.preventDefault()
  var listArticles = props.articles.map(article => <Card article={article} key={article.id} onDragStart={handleOnDragStart} />)
  return (
    <>
      <h2>Accueil</h2>
      <div className='carouselContainer'>
        <AliceCarousel
          mouseTrackingEnabled
          responsive={
            {
              0: {
                items: 1
              },
              768: {
                items: 2
              },
              1024: {
                items: 3
              }
            }
          }
          stagePadding={{ paddingLeft: 0, paddingRight: 0 }}
          infinite={false}
          items={listArticles}
        />

      </div>
    </>
  )
}

export default Home
