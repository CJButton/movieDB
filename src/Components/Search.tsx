
import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Input, Button, Row } from 'reactstrap';
import { useHistory, useLocation } from 'react-router-dom'

type SearchInterface = {
    [key: string]: string
}

const searches: SearchInterface = {
    'movie': ' a movie...',
    'tv': ' a tv show...',
    'person': ' people...',
}

const Search = () => {
    const history = useHistory()
    const location = useLocation()

    const [currentSearch, updateSearch] = useState('')
    const [searchType, updateType] = useState('')

    useEffect(() => {
        const searchType = location.pathname.slice(1) || 'movie'
        updateType(searchType)
    }, [location.pathname])

    const searchForType = searches[searchType] || '...'

    const searchForItem = (e: any) => {
        e.preventDefault()
        const newQuery = `${location.pathname}?query=${currentSearch}`
        history.push(newQuery)
    }

    return (
        <div className="input-icons"> 
            <Form onSubmit={searchForItem}>
                <FormGroup>
                    <Row>
                        <i className="fa fa-search icon"></i>
                        <Input
                            placeholder={`Search for${searchForType}`}
                            type="text" 
                            name="query"
                            onChange={(e) => updateSearch(e.target.value)}
                            className="input-field"
                            value={currentSearch}
                        />
                        <Button 
                            className='search-button'
                            type="submit"
                            onClick={searchForItem}>
                            Search
                        </Button>
                    </Row>
                </FormGroup>
            </Form>
        </div>
    )
}

export default Search