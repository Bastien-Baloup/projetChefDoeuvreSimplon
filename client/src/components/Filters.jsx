import React from 'react'
import { RefinementList, RangeInput } from 'react-instantsearch-dom'

class Filters extends React.Component {
  render (_props) {
    var { withCategories } = this.props
    return (
      <aside>
        <RefinementList attribute='brand' />
        {withCategories && <RefinementList attribute='categories' />}
        <RangeInput attribute='price' />
      </aside>
    )
  }
}

export default Filters
