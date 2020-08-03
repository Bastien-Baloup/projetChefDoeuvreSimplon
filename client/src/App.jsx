import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './assets/css/styles.min.css'

import Home from './pages/Home'
import Header from './components/Header'
import News from './pages/News'
import Categories from './pages/Categories'
import Search from './pages/Search'

const App = () => {
  var categories = [
    { id: 1, name: 'Cell Phones' },
    { id: 2, name: 'Cell Phones Accessories' },
    { id: 3, name: 'Cell Phones Cases & Clips' },
    { id: 4, name: 'iPhone Accessories' }
  ]
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
    },
    {
      name: 'article4',
      excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
      img: 'https://picsum.photos/id/120/300/400'
    },
    {
      name: 'article5',
      excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
      img: 'https://picsum.photos/id/130/300/400'
    },
    {
      name: 'article6',
      excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
      img: 'https://picsum.photos/id/161/300/400'
    },
    {
      name: 'article7',
      excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
      img: 'https://picsum.photos/id/162/300/400'
    },
    {
      name: 'article8',
      excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
      img: 'https://picsum.photos/id/163/300/400'
    },
    {
      name: 'article9',
      excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
      img: 'https://picsum.photos/id/164/300/400'
    },
    {
      name: 'article10',
      excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
      img: 'https://picsum.photos/id/165/300/400'
    },
    {
      name: 'article11',
      excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
      img: 'https://picsum.photos/id/166/300/400'
    },
    {
      name: 'article12',
      excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
      img: 'https://picsum.photos/id/167/300/400'
    },
    {
      name: 'article13',
      excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
      img: 'https://picsum.photos/id/168/300/400'
    },
    {
      name: 'article14',
      excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
      img: 'https://picsum.photos/id/169/300/400'
    },
    {
      name: 'article15',
      excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
      img: 'https://picsum.photos/id/170/300/400'
    },
    {
      name: 'article16',
      excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
      img: 'https://picsum.photos/id/171/300/400'
    },
    {
      name: 'article17',
      excerpt: 'lorem ipsum, dolor sit amet. Qui prom poquo et agnes solidare, deflagra ets. Sinsigram meni dolor.',
      img: 'https://picsum.photos/id/172/300/400'
    }
  ]
  var newAndSales = [
    {
      name: 'Samsung - Galaxy S7 32GB - Black Onyx (Verizon)',
      price: 679.99,
      image: 'https://cdn-demo.algolia.com/bestbuy-0118/4893100_sb.jpg'
    },
    {
      name: 'Samsung - Galaxy J3 (2016) 4G LTE with 16GB Memory Cell Phone (Unlocked) - White',
      price: 179.99,
      sale: 50,
      image: 'https://cdn-demo.algolia.com/bestbuy-0118/5320800_sb.jpg'
    },
    {
      name: 'Samsung - Galaxy S7 edge 32GB - Blue Coral (Verizon)',
      price: 779.99,
      image: 'https://cdn-demo.algolia.com/bestbuy-0118/5705352_sb.jpg'
    },
    {
      name: 'Samsung - Galaxy S7 32GB - Gold Platinum (Verizon)',
      price: 679.99,
      image: 'https://cdn-demo.algolia.com/bestbuy-0118/4893300_sb.jpg'

    },
    {
      name: 'Samsung - Galaxy S7 32GB - Black Onyx (AT&T)',
      price: 694.99,
      image: 'https://cdn-demo.algolia.com/bestbuy-0118/4897502_sb.jpg'
    },
    {
      name: 'Samsung - Galaxy S7 32GB - Black Onyx (Sprint)',
      price: 699.99,
      image: 'https://cdn-demo.algolia.com/bestbuy-0118/4894100_sb.jpg'
    },
    {
      name: 'Samsung - Galaxy S7 edge 4G LTE with 32GB Memory Cell Phone (Unlocked) - Titanium Silver',
      price: 769.99,
      image: 'https://cdn-demo.algolia.com/bestbuy-0118/5286507_sb.jpg'
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
              (props) => (<Home {...props} articles={lastArticles} new={newAndSales} />)
            }
          />
          <Route exact path='/actualites' component={News} />
          <Route path='/categorie' component={Categories} />
          <Route path='/recherche' component={Search} />
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default App
