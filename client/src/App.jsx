import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { CartProvider, useCart } from 'use-cart'

import './assets/css/styles.min.css'

import Home from './pages/Home'
import Header from './components/Header'
import News from './pages/News'
import Categories from './pages/Categories'
import SearchPage from './pages/SearchPage'
import Article from './pages/Article'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Success from './pages/Success'
import Error from './pages/Error'
import NoMatch from './pages/NoMatch'

window.localStorage.setItem('apiUrl', 'https://slicedice.ddns.net:3080')

const App = () => {
  const loadCartFromStorage = () => {
    if (window.localStorage.getItem('cart')) return JSON.parse(window.localStorage.getItem('cart'))
    else return []
  }

  const SaveCartToStorage = () => {
    const { items } = useCart()
    useEffect(() => {
      console.log('saved')
      window.localStorage.setItem('cart', JSON.stringify(items))
    }, [items])
    return (
      <></>
    )
  }

  return (
    <BrowserRouter>
      <CartProvider initialCart={loadCartFromStorage()}>
        <SaveCartToStorage />
        <Header />
        <main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/actualites' component={News} />
            <Route path='/categorie/:categoryName' component={Categories} />
            <Route path='/recherche' component={SearchPage} />
            <Route path='/article/:title' component={Article} />
            <Route path='/product/:name' component={Product} />
            <Route path='/panier' component={Cart} />
            <Route path='/success' component={Success} />
            <Route path='/error' component={Error} />
            <Route path='*' component={NoMatch} />
          </Switch>
        </main>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
