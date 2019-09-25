import React, { useEffect, useState } from 'react'
import ResultBody from './ResultBody'

import { fetchExtrasInfo } from '../requests'

/**
 * Person
 */
const Person = (props) => {
  const {id, name, known_for_department, gender} = props
  const [bio, updateBio] = useState('')

  const renderGender = {
    1: 'Female',
    2: 'Male',
  }

  useEffect(() => {
    const fetchExtras = async () => {
      const {biography} = await fetchExtrasInfo('person', id)
      updateBio(biography)
    }
    fetchExtras()
  }, [id])

  return(
    <ResultBody
      type={'person'}
      header={name}
      leftOfHyphen={known_for_department}
      rightOfHyphen={renderGender[gender] || 'Not specified'}
      overview={bio}
    />
    // <div className='person-wrapper'>
    //   <Row><h5 className='person-name'>{name}</h5></Row>
    //   <Row className='person-extras'>
    //     { !!known_for_department && <p className='person-department'>Known for: {known_for_department}</p> }
    //     { !!known_for_department && !!gender && <p className='extras_hyphen'>-</p> }
    //     { !!gender && <p className='person-gender'>Gender: { renderGender[gender] || 'Not specified' }</p> }
    //   </Row>
    //   <Row>
    //     <TruncateText text={bio} />
    //   </Row>
    // </div>
  )
}

export default Person