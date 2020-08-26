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
        indexName='dev_projetFinal'
        onSearchStateChange={onSearchStateChange}
        searchState={searchState}
      >
        {
          category
            ? (
              <Configure filters={'categories:"' + category + '"'} hitsPerPage={24} />
            ) : (
              <SearchBox />
            )
        }
        <div className='buttons'>
          <button onClick={() => setIsModalOpen(true)}>
            Filtrer&nbsp;
            <FontAwesomeIcon icon={faSlidersH} />
          </button>
          <SortBy
            items={[
              { value: 'dev_projetFinal', label: 'Nom' },
              { value: 'dev_price_asc', label: 'Prix asc' },
              { value: 'dev_price_desc', label: 'Prix desc' },
              { value: 'dev_sale', label: 'Promotions' }
            ]}
            defaultRefinement='dev_projetFinal'
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
