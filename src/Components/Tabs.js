import React, { useEffect, useState } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames'
/**
 * Tabs Component
 * Takes an array of objects
 * Updates the parent after selection
 */
const Tabs = ({tabItems, setParentTab}) => {
  const [currentTab, updateLocalTab] = useState(tabItems[0].value)

  useEffect(() => {
    setParentTab(currentTab)
  })

  return (
    <Nav tabs>
      {tabItems.map((item => (
        <NavItem key={`tab-item-${item.value}`}>
          <NavLink
            className={classnames({ active: currentTab === item.value })}
            onClick={() => { updateLocalTab(item.value) }} >
            { item.title }
          </NavLink>
        </NavItem>
      )))}
    </Nav>
  )
}

Tabs.propTypes = {
  tabItems: PropTypes.array.isRequired,
  setParentTab: PropTypes.func.isRequired,
}

export default Tabs