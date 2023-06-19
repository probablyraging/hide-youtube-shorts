/* eslint-disable react-refresh/only-export-components */
import { CssBaseline, NextUIProvider } from '@nextui-org/react';
import { createContext, useContext, useEffect, useState } from 'react';
import { darkTheme, lightTheme } from './constants/themes';

export const DarkModeContext = createContext();

export const useDarkMode = () => {
    return useContext(DarkModeContext);
}

export const HideShortsThemeProvider = ({children}) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem('darkMode');
        if (storedTheme) {
            setDarkMode(storedTheme === 'true');
            updateScrollbarColors(storedTheme === 'true');
        } else {
            const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setDarkMode(prefersDarkMode);
            updateScrollbarColors(prefersDarkMode);
        }
    }, []);

    const updateScrollbarColors = (isDarkMode) => {
        const scrollbarTrackColor = isDarkMode ? '#121212' : '#fff';
        const scrollbarThumbColor = isDarkMode ? '#5086c3' : '#3694ff';
        document.documentElement.style.setProperty('--scrollbar-track-color', scrollbarTrackColor);
        document.documentElement.style.setProperty('--scrollbar-thumb-color', scrollbarThumbColor);
    };

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        updateScrollbarColors(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode.toString());
    };


    return  (
        <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
            <NextUIProvider theme={darkMode ? darkTheme : lightTheme}>
                <CssBaseline />
                {children}
            </NextUIProvider>
        </DarkModeContext.Provider>
    )
}