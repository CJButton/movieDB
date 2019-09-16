import React, { useEffect, useState } from 'react'
import { Row } from 'reactstrap'

import { fetchExtrasInfo } from '../requests'
// import PropTypes from 'prop-types'

/**
 * Person
 */
const Person = ({id, name, known_for_department, gender}) => {
  const [bio, updateBio] = useState(null)
  const displayGender = () => {
    switch(gender) {
      case 1:
        return 'Female'
      case 2:
        return 'Male'
      default:
        return 'Not specified'
    }
  }

  useEffect(() => {
    const fetchExtras = async () => {
      const {biography} = await fetchExtrasInfo('person', id)
      updateBio(biography)
    }
    fetchExtras()
  }, [id])

  return(
    <div className='person-wrapper'>
      <Row>
        <h5 className='person-name'>{name}</h5>
      </Row>
      <Row className='person-extras'>
        { !!known_for_department && 
          <p className='person-department'>
            Known for: {known_for_department}
          </p>
        }
        { known_for_department && !!gender && <p className='extras_hyphen'>-</p> }
        { !!gender && 
          <p className='person-gender'>
            Gender: {displayGender()}
          </p>
        }
      </Row>
      <Row>
        <p className='person-bio'>{bio}</p>
      </Row>
    </div>
  )
}

export default Person