import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { feed_page, channel_page, misc_page, support_page, disabled_page } from '../assets';

const NavBar = ({ darkMode }) => {
    const [value, setValue] = useState(0);
    const location = useLocation();
    const navDisabled = location.pathname === '/disabled' ? true : false;

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setValue(0);
                break;
            case '/feed':
                setValue(0);
                break;
            case '/channel':
                setValue(1);
                break;
            case '/misc':
                setValue(2);
                break;
            case '/stats':
                setValue(3);
                break;
            default:
                setValue(99);
        }
    }, [location.pathname]);

    const navButtonColorDefault = darkMode ? '#ecedee' : '#3b3b3b';
    const navButtonColorActive = darkMode ? '#5086c3' : '#3694ff';

    return (
        <Paper
            elevation={3}
            sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 999,
                backgroundColor: darkMode ? '#1a1c1e' : '',
            }}
        >
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                sx={{
                    height: '45px',
                    backgroundColor: darkMode ? '#1a1c1e' : '',
                }}
            >
                <Link to={navDisabled ? '/disabled' : '/feed'} className='flex w-full'>
                    <BottomNavigationAction
                        className={`${darkMode ? 'hover:bg-[#202225]' : 'hover:bg-[#f5f5f5]'} transition-colors duration-200`}
                        icon={<img src={feed_page} width={20} height={20} />}
                        sx={{
                            height: '100%',
                            color: value === 0 ? navButtonColorActive : navButtonColorDefault,
                            backgroundColor: value === 0 ? darkMode ? '#202225' : '#f5f5f5' : '',
                            borderTopLeftRadius: '6px',
                            borderTopRightRadius: '6px'
                        }} />
                </Link>

                <Link to={navDisabled ? '/disabled' : '/channel'} className='flex w-full'>
                    <BottomNavigationAction
                        className={`${darkMode ? 'hover:bg-[#202225]' : 'hover:bg-[#f5f5f5]'} transition-colors duration-200`}
                        icon={<img src={channel_page} width={20} height={20} />}
                        sx={{
                            height: '100%',
                            color: value === 1 ? navButtonColorActive : navButtonColorDefault,
                            backgroundColor: value === 1 ? darkMode ? '#202225' : '#f5f5f5' : '',
                            borderTopLeftRadius: '6px',
                            borderTopRightRadius: '6px'
                        }} />
                </Link>

                <Link to={navDisabled ? '/disabled' : '/misc'} className='flex w-full'>
                    <BottomNavigationAction
                        className={`${darkMode ? 'hover:bg-[#202225]' : 'hover:bg-[#f5f5f5]'} transition-colors duration-200`}
                        icon={<img src={misc_page} width={20} height={20} />}
                        sx={{
                            height: '100%',
                            color: value === 2 ? navButtonColorActive : navButtonColorDefault,
                            backgroundColor: value === 2 ? darkMode ? '#202225' : '#f5f5f5' : '',
                            borderTopLeftRadius: '6px',
                            borderTopRightRadius: '6px'
                        }} />
                </Link>

                <Link to={navDisabled ? '/disabled' : '/support'} className='flex w-full'>
                    <BottomNavigationAction
                        className={`${darkMode ? 'hover:bg-[#202225]' : 'hover:bg-[#f5f5f5]'} transition-colors duration-200`}
                        icon={<img src={support_page} width={20} height={20} />}
                        sx={{
                            height: '100%',
                            color: value === 3 ? navButtonColorActive : navButtonColorDefault,
                            backgroundColor: value === 3 ? darkMode ? '#202225' : '#f5f5f5' : '',
                            borderTopLeftRadius: '6px',
                            borderTopRightRadius: '6px'
                        }} />
                </Link>
            </BottomNavigation>
        </Paper>
    )
}

export default NavBar;