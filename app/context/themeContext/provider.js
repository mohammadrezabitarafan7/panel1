'use client'
import { useState } from 'react'
import { ThemeContext } from './context.js'

const ThemeProvider = ({ children }) => {

    const [dark, setDark] = useState(true);

    const ChangeTheme = (isdark) => {
        setDark(isdark)
    }

    return (
        <ThemeContext.Provider value={{ dark, ChangeTheme}} >
            {children}
        </ThemeContext.Provider>
    )


}
export default ThemeProvider