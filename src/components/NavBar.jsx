import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLabelRoundedIcon from '@mui/icons-material/VideoLabelRounded';
import SpeedIcon from '@mui/icons-material/Speed';
import BarChartIcon from '@mui/icons-material/BarChart';
import Paper from '@mui/material/Paper';

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
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
                filter: 'drop-shadow(2px 4px 6px #00000042)',
                backgroundColor: darkMode ? '#1a1c1e' : '',
            }}
        >
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                sx={{
                    height: '42px',
                    borderTopLeftRadius: '20px',
                    borderTopRightRadius: '20px',
                    backgroundColor: darkMode ? '#1a1c1e' : '',
                }}
            >
                <Link to={navDisabled ? '/disabled' : '/feed'} className='flex w-full'>
                    <BottomNavigationAction
                        className={`${darkMode ? 'hover:bg-[#202225]' : 'hover:bg-[#f5f5f5]'} transition-colors duration-200`}
                        icon={<SubscriptionsIcon className='w-[20px]' />}
                        sx={{
                            height: '100%',
                            color: value === 0 ? navButtonColorActive : navButtonColorDefault,
                            backgroundColor: value === 0 ? darkMode ? '#202225' : '#f5f5f5' : '',
                            borderTopLeftRadius: '20px',
                            borderTopRightRadius: '20px'
                        }} />
                </Link>

                <Link to={navDisabled ? '/disabled' : '/channel'} className='flex w-full'>
                    <BottomNavigationAction
                        className={`${darkMode ? 'hover:bg-[#202225]' : 'hover:bg-[#f5f5f5]'} transition-colors duration-200`}
                        icon={<VideoLabelRoundedIcon className='w-[20px]' />}
                        sx={{
                            height: '100%',
                            color: value === 1 ? navButtonColorActive : navButtonColorDefault,
                            backgroundColor: value === 1 ? darkMode ? '#202225' : '#f5f5f5' : '',
                            borderTopLeftRadius: '20px',
                            borderTopRightRadius: '20px'
                        }} />
                </Link>

                <Link to={navDisabled ? '/disabled' : '/misc'} className='flex w-full'>
                    <BottomNavigationAction
                        className={`${darkMode ? 'hover:bg-[#202225]' : 'hover:bg-[#f5f5f5]'} transition-colors duration-200`}
                        icon={<SpeedIcon />}
                        sx={{
                            height: '100%',
                            color: value === 2 ? navButtonColorActive : navButtonColorDefault,
                            backgroundColor: value === 2 ? darkMode ? '#202225' : '#f5f5f5' : '',
                            borderTopLeftRadius: '20px',
                            borderTopRightRadius: '20px'
                        }} />
                </Link>

                <Link to={navDisabled ? '/disabled' : '/stats'} className='flex w-full'>
                    <BottomNavigationAction
                        className={`${darkMode ? 'hover:bg-[#202225]' : 'hover:bg-[#f5f5f5]'} transition-colors duration-200`}
                        icon={<BarChartIcon />}
                        sx={{
                            height: '100%',
                            color: value === 3 ? navButtonColorActive : navButtonColorDefault,
                            backgroundColor: value === 3 ? darkMode ? '#202225' : '#f5f5f5' : '',
                            borderTopLeftRadius: '20px',
                            borderTopRightRadius: '20px'
                        }} />
                </Link>
            </BottomNavigation>
        </Paper>
    )
}

export default NavBar;