
import React, { useState } from 'react'
import { Button, InputGroup, InputGroupAddon, Input } from 'reactstrap';

/**
 * Search Component
 * 
 */

const Search = ({searchForItem, searchType}) => {
  const [currentSearch, updateSearch] = useState('')
  const searches = {
    'movie': 'a movie...',
    'tv': 'a tv show...',
    'person': 'people...',
  }

  const updateCurrentSearch = (e) => {
    if(e.keyCode === 13) searchForItem(currentSearch)
  }

  return (
    <InputGroup>
      <Input
        placeholder={`Search for ${searches[searchType]}`}
        onKeyUp={(e) => updateCurrentSearch(e)}
        onChange={(e) => updateSearch(e.target.value)} />
        <i className="fas fa-search" />
        <InputGroupAddon addonType="append">
          <Button onClick={() => searchForItem(currentSearch)}>
            Search
          </Button>
        </InputGroupAddon>
    </InputGroup>
  )
}

export default Search