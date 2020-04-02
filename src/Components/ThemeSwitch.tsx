import React, { useState } from 'react'
import { CustomInput } from 'reactstrap'

const ThemeSwitch = () => {
    const [theme, setTheme] = useState('Dark')

    const updateTheme = () => {
        const newTheme = theme === 'Dark' ? 'Light' : 'Dark';
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    }

    return(
        <CustomInput 
            onClick={() => updateTheme()}
            type="switch" 
            id="exampleCustomSwitch" 
            name="customSwitch" 
            label={`${theme} Theme`}
            className="theme-switch"
            />
    )
}

export default ThemeSwitch