
import React, { useState } from 'react'
import { Button } from 'reactstrap';
import PropTypes from 'prop-types'

/**
 * Search Component
 * Displays search text and fires request for search
 */
const Search = ({searchForItem, searchType, initialSearch}) => {
  const [currentSearch, updateSearch] = useState(initialSearch)

  const searches = {
    'movie': ' a movie...',
    'tv': ' a tv show...',
    'person': ' people...',
  }

  const updateCurrentSearch = (e) => {
    if(e.keyCode === 13) searchForItem(currentSearch)
  }

  const searchForType = searches[searchType] || '...'

  return (
      <div className="input-icons"> 
        <i className="fa fa-search icon"></i>
        <input
          placeholder={`Search for${searchForType}`}
          onKeyUp={(e) => updateCurrentSearch(e)}
          onChange={(e) => updateSearch(e.target.value)}
          className="input-field"
          value={currentSearch}
          type="text" />
        <Button 
          className='search-button'
          onClick={() => searchForItem(currentSearch)}>
          Search
        </Button>
      </div>
  )
}

Search.propTypes = {
  searchType: PropTypes.string.isRequired,
  searchForItem: PropTypes.func.isRequired,
  initialSearch: PropTypes.string,
}

Search.defaultProps = {
  initialSearch: '',
}

export default Search