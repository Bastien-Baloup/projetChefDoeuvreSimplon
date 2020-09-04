import React from 'react'
import { InstantSearch, RefinementList, RangeInput, connectRefinementList, connectRange } from 'react-instantsearch-dom'
import ReactModal from 'react-modal'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

ReactModal.setAppElement('#root')
const VirtualRefinementList0 = connectRefinementList(() => null)
const VirtualRefinementList1 = connectRefinementList(() => null)
const VirtualRefinementList2 = connectRefinementList(() => null)
const VirtualRange = connectRange(() => null)

const Filters = ({ withCategories, searchClient, searchState, onSearchStateChange, isOpen, setIsOpen }) => {
  return (
    <>
      <VirtualRefinementList0 attribute='brand' />
      {withCategories && <VirtualRefinementList1 attribute='categories' />}
      <VirtualRefinementList2 attribute='tags' />
      <VirtualRange attribute='price' />
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <button className='close' onClick={() => setIsOpen(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <InstantSearch
          searchClient={searchClient}
          indexName='dev_projetFinal'
          onSearchStateChange={onSearchStateChange}
          searchState={searchState}
        >
          <div className='brand'>
            <h3>Marques :</h3>
            <RefinementList attribute='brand' limit={200} />
          </div>
          {
            withCategories &&
              <div className='category'>
                <h3>Categories :</h3>
                <RefinementList attribute='categories' limit={200} />
              </div>
          }
          <div className='tags'>
            <h3>Mot-clés :</h3>
            <RefinementList attribute='tags' limit={200} />
          </div>
          <div className='price'>
            <h3>Prix :</h3>
            <RangeInput attribute='price' translations={{ separator: '-' }} />
          </div>
        </InstantSearch>
      </ReactModal>
    </>
  )
}

export default Filters
