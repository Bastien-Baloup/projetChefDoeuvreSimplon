import React from 'react'
import { InstantSearch, RefinementList, RangeInput, connectRefinementList, connectRange } from 'react-instantsearch-dom'
import ReactModal from 'react-modal'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

ReactModal.setAppElement('#root')
const VirtualRefinementList = connectRefinementList(() => null)
const VirtualRange = connectRange(() => null)

const Filters = ({ withCategories, searchClient, searchState, onSearchStateChange, isOpen, setIsOpen }) => {
  return (
    <>
      <VirtualRefinementList attribute='brand' />
      {withCategories && <VirtualRefinementList attribute='categories' />}
      <VirtualRange attribute='price' />
      <InstantSearch
        searchClient={searchClient}
        indexName='demo_ecommerce'
        onSearchStateChange={onSearchStateChange}
        searchState={searchState}
      >
        <ReactModal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
        >
          <button onClick={() => setIsOpen(false)}><FontAwesomeIcon icon={faTimes} /></button>
          <RefinementList attribute='brand' />
          {withCategories && <RefinementList attribute='categories' />}
          <RangeInput attribute='price' />
        </ReactModal>
      </InstantSearch>
    </>
  )
}

export default Filters
