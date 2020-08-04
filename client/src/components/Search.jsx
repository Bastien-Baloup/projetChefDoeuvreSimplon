import React, { useState } from 'react'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, Configure, SearchBox, SortBy, CurrentRefinements } from 'react-instantsearch-dom'
import Filters from './Filters'
import MyInfiniteHits from './InfiniteHits'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Search = ({ category }) => {
  const searchClient = algoliasearch('H2YGA5NBNG', '26b1badfb8cb68a219e300f7cd17df1e')
  const [searchState, setSearchState] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const onSearchStateChange = newSearchState => {
    setSearchState(oldSearchState => { return { ...oldSearchState, ...newSearchState } })
  }
  return (
    <>
      <InstantSearch
        searchClient={searchClient}
        indexName='demo_ecommerce'
        onSearchStateChange={onSearchStateChange}
        searchState={searchState}
      >
        {category ? <Configure filters={'categories:"' + category + '"'} /> : <SearchBox />}
        <div className='buttons'>
          <button onClick={() => setIsModalOpen(true)}>Filtrer <FontAwesomeIcon icon={faSlidersH} /></button>
          <SortBy
            items={[
              { value: 'demo_ecommerce', label: 'Price desc' },
              { value: 'price_asc', label: 'Price asc' },
              { value: 'popularity', label: 'Popularity' }
            ]}
            defaultRefinement='popularity'
          />
        </div>
        <CurrentRefinements />
        <MyInfiniteHits />

        <Filters
          setIsOpen={setIsModalOpen}
          isOpen={isModalOpen}
          onSearchStateChange={onSearchStateChange}
          searchState={searchState}
          searchClient={searchClient}
          withCategories={!category}
        />
      </InstantSearch>
    </>
  )
}

export default Search
