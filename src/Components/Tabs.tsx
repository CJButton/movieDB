import React, { useState } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'
import { useHistory, useLocation } from 'react-router-dom'

type TabsType = {
    tabItems: Array<{ title: string, value: string }>
}

const Tabs = ({ tabItems }: TabsType) => {
    const history = useHistory()
    const location = useLocation()
    const [currentTab, updateLocalTab] = useState(location.pathname.slice(1))

    const redirectTo = (tabType: string) => {
        updateLocalTab(tabType)
        const search = location.search ? location.search: ''
        history.push(`/${tabType}${search}`)
    }

    return (
        <Nav className='nav-wrapper' tabs fill>
            {tabItems.map((item => {
                const { value, title } = item;
                return (
                    <NavItem 
                        className={classnames({ active: currentTab === value })}
                        key={`tab-item-${value}`}>
                        <NavLink
                            className={classnames({ active: currentTab === value })}
                            onClick={() => { redirectTo(value) }} >
                                <h5>{ title }</h5>
                        </NavLink>
                    </NavItem>
                )
            }))}
        </Nav>
    )
}

export default Tabs