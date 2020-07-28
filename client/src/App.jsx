import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './assets/css/styles.min.css'

import Home from './pages/Home'
import Header from './components/Header'
import News from './pages/News'
import Categories from './pages/Categories'

const App = () => {
  var categories = ['Cell Phones', 'Cell Phones Accessories', 'Cell Phones Cases & Clips', 'iPhone Accessories']
  var lastArticles = [
    {
      name: 'article1',
      excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
      img: 'https://picsum.photos/id/0/300/400'
    },
    {
      name: 'article2',
      excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
      img: 'https://picsum.photos/id/160/300/400'
    },
    {
      name: 'article3',
      excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
      img: 'https://picsum.photos/id/119/300/400'
    }
  ]

  return (
    <BrowserRouter>
      <Header categories={categories} />

      <main>
        <Switch>
          <Route
            exact path='/'
            render={
              (props) => (
                <Home {...props} articles={lastArticles} />
            )}
          />
          <Route exact path='/actualites' component={News} />
          <Route path='/categorie' component={Categories} />
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default App
