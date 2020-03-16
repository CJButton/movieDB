import React, { useEffect, useState } from 'react'
import ResultBody from './ResultBody'

import { fetchExtrasInfo } from '../requests'

/**
 * Person
 */
type PersonType = {
  id: string,
  name: string,
  known_for_department: string,
  gender: number
}

interface RenderGender {
  [key: string]: string
}

const Person = (props: PersonType) => {
  const {id, name, known_for_department, gender} = props
  const [bio, updateBio] = useState('')

  const renderGender: RenderGender = {
    1: 'Female',
    2: 'Male',
  }

  useEffect(() => {
    const fetchExtras = async () => {
      const { biography }: { biography: string} = await fetchExtrasInfo('person', id)
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
      displayVotes={false}
    />
  )
}

export default Person