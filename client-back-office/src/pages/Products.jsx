import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import ProductHeader from '../components/Product/ProductHeader'
import ProductList from '../components/Product/ProductList'
import ProductForm from '../components/Product/ProductForm'
import ProductDel from '../components/Product/ProductDel'
import Categories from '../components/Product/Categories'

const Products = () => {
  const path = useRouteMatch().path
  return (
    <>
      <ProductHeader />
      <div>
        <Switch>
          <Route exact path={path} key='list' component={ProductList} />
          <Route exact path={`${path}/new`} key='new' component={ProductForm} />
          <Route exact path={`${path}/modify/:id`} key='modify' component={ProductForm} />
          <Route exact path={`${path}/delete/:id`}>
            <ProductDel key='delete' />
            <ProductList />
          </Route>
          <Route exact path={`${path}/categories`} key='new' component={Categories} />
        </Switch>
      </div>
    </>
  )
}

export default Products
