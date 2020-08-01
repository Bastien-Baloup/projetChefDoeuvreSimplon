import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, Configure, SearchBox, InfiniteHits, SortBy } from 'react-instantsearch-dom'
import Filters from '../components/Filters'
import Card from '../components/Card'

const Search = () => {
  const searchClient = algoliasearch('H2YGA5NBNG', '26b1badfb8cb68a219e300f7cd17df1e')
  const Hit = ({ hit }) => <Card product={hit} />
  return (
    <InstantSearch searchClient={searchClient} indexName='demo_ecommerce'>
      <Configure />
      <SearchBox />
      <Filters withCategories />
      <SortBy
        items={[
          { value: 'demo_ecommerce', label: 'Price desc' },
          { value: 'price_asc', label: 'Price asc' },
          { value: 'popularity', label: 'Popularity' }
        ]}
        defaultRefinement='popularity'
      />
      <InfiniteHits hitComponent={Hit} />
    </InstantSearch>
  )
}

export default Search
