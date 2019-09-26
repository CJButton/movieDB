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
      displayVotes='false'
    />
  )
}

export default Person