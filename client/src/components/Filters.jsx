import React from 'react'
import { RefinementList, RangeInput } from 'react-instantsearch-dom'

const Filters = ({ withCategories }) => {
  return (
    <aside>
      <RefinementList attribute='brand' />
      {withCategories && <RefinementList attribute='categories' />}
      <RangeInput attribute='price' />
    </aside>
  )
}

export default Filters
