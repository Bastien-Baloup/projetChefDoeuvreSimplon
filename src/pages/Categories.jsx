import React from 'react'
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom'

const Category = () => {
  var { categoryName, order } = useParams()
  return (
    <>
      {order ? (
        <h3>requested category {categoryName} ordered by {order}</h3>
      ) : (
        <h3>requested category {categoryName}</h3>
      )}
    </>
  )
}

const Categories = () => {
  const path = useRouteMatch().path

  return (
    <>
      <h2>Catégories</h2>

      <Switch>
        <Route path={`${path}/:categoryName/:order`}>
          <Category />
        </Route>
        <Route path={`${path}/:categoryName`}>
          <Category />
        </Route>
        <Route exact path={path}>
          <h3>Please select a category</h3>
        </Route>
      </Switch>
    </>
  )
}

export default Categories
