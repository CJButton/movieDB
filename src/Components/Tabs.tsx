import React, { useEffect, useState } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'
/**
 * Tabs Component
 * Takes an array of objects
 * Updates the parent after selection
 */
type TabsType = {
  initialTab: string | undefined,
  tabItems: Array<{title: string, value: string}>,
  setParentTab: (arg0: string) => void
}

const Tabs = ({initialTab, tabItems, setParentTab}: TabsType) => {
  const [currentTab, updateLocalTab] = useState<string>(initialTab || tabItems[0].value)

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

export default Tabs