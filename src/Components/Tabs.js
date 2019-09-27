import React, { useEffect, useState } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import PropTypes from 'prop-types'
import classnames from 'classnames'
/**
 * Tabs Component
 * Takes an array of objects
 * Updates the parent after selection
 */
const Tabs = ({tabItems, setParentTab, initialTab}) => {
  const [currentTab, updateLocalTab] = useState(initialTab || tabItems[0].value)

  useEffect(() => {
    setParentTab(currentTab)
  })

  return (
    <Nav className='nav-wrapper' tabs fill>
      {tabItems.map((item => (
        <NavItem 
          className={classnames({ active: currentTab === item.value })}
          key={`tab-item-${item.value}`}>
          <NavLink
            className={classnames({ active: currentTab === item.value })}
            onClick={() => { updateLocalTab(item.value) }} >
            <h5>{ item.title }</h5>
          </NavLink>
        </NavItem>
      )))}
    </Nav>
  )
}

Tabs.propTypes = {
  tabItems: PropTypes.array.isRequired,
  setParentTab: PropTypes.func.isRequired,
  intialTab: PropTypes.string,
}

Tabs.defaultProps = {
  initialTab: null
}

export default Tabs