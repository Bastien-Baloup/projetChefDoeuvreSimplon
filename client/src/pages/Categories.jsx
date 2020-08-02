import React, { useState } from 'react'
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, Configure, SearchBox, SortBy, CurrentRefinements } from 'react-instantsearch-dom'
import Filters from '../components/Filters'
import MyInfiniteHits from '../components/InfiniteHits'

const Category = () => {
  const searchClient = algoliasearch('H2YGA5NBNG', '26b1badfb8cb68a219e300f7cd17df1e')
  const [searchState, setSearchState] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const onSearchStateChange = newSearchState => {
    setSearchState(oldSearchState => { return { ...oldSearchState, ...newSearchState } })
  }
  var { categoryName, order } = useParams()
  return (
    <>
      {order ? (
        <h3>requested category {categoryName} ordered by {order}</h3>
      ) : (
        <h3>requested category {categoryName}</h3>
      )}

      <InstantSearch
        searchClient={searchClient}
        indexName='demo_ecommerce'
        onSearchStateChange={onSearchStateChange}
        searchState={searchState}
      >
        <Configure filters={'categories:"' + categoryName + '"'} />
        <SearchBox />
        <SortBy
          items={[
            { value: 'demo_ecommerce', label: 'Price desc' },
            { value: 'price_asc', label: 'Price asc' },
            { value: 'popularity', label: 'Popularity' }
          ]}
          defaultRefinement='popularity'
        />
        <button onClick={() => setIsModalOpen(true)}>Filtrer</button>
        <CurrentRefinements />
        <MyInfiniteHits />

        <Filters
          setIsOpen={setIsModalOpen}
          isOpen={isModalOpen}
          onSearchStateChange={onSearchStateChange}
          searchState={searchState}
          searchClient={searchClient}
        />
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
