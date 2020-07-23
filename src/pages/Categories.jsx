import React from 'react'
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, Configure, SearchBox, InfiniteHits } from 'react-instantsearch-dom'

const Category = () => {
  const searchClient = algoliasearch('H2YGA5NBNG', '26b1badfb8cb68a219e300f7cd17df1e')
  var { categoryName, order } = useParams()
  return (
    <>
      {order ? (
        <h3>requested category {categoryName} ordered by {order}</h3>
      ) : (
        <h3>requested category {categoryName}</h3>
      )}

      <InstantSearch searchClient={searchClient} indexName='demo_ecommerce'>
        <Configure filters={'brand:' + categoryName} />
        <SearchBox />
        <InfiniteHits />
      </InstantSearch>

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
