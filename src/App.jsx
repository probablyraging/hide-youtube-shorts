import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NextUIProvider, CssBaseline } from '@nextui-org/react';
import { ChannelPage, FeedPage, MiscPage, BlockPage, Disabled } from './views';
import { NavBar, Loader, PageHead } from './components';
import { darkTheme, lightTheme } from './constants/themes';

const MainPage = lazy(() => import('./components/MainPage'));
const background = lazy(() => import('./constants/background'));
const mobile = lazy(() => import('./constants/mobile'));

const App = () => {
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
        const scrollbarTrackColor = isDarkMode ? '#1a1c1e' : '#fff';
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

    return (
        <BrowserRouter>
            <NextUIProvider theme={darkMode ? darkTheme : lightTheme}>
                <CssBaseline />

                <Suspense fallback={<Loader darkMode={darkMode} />}>
                    <PageHead darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

                    <MainPage>
                        <NavBar darkMode={darkMode} />

                        <Routes>
                            <Route path="/" element={<FeedPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
                            <Route path="/feed" element={<FeedPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
                            <Route path="/channel" element={<ChannelPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
                            <Route path="/misc" element={<MiscPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
                            <Route path="/block" element={<BlockPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
                            <Route path="/disabled" element={<Disabled darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
                            <Route path="*" element={<Navigate to='/' />} />
                        </Routes>
                    </MainPage>
                </Suspense>

            </NextUIProvider>
        </BrowserRouter>
    )
};

export default App;