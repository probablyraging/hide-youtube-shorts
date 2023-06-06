import React from 'react';
import { useLocation } from 'react-router-dom';
import { Text } from '@nextui-org/react';
import { SettingsButton } from './index';

const PageHead = ({ darkMode, toggleDarkMode, title }) => {
    const location = useLocation();
    if (location.pathname === '/') title = 'Feed Pages';
    if (location.pathname === '/feed') title = 'Feed Pages';
    if (location.pathname === '/channel') title = 'Channel Pages';
    if (location.pathname === '/misc') title = 'Miscellaneous';
    if (location.pathname === '/stats') title = 'Statistics';
    if (location.pathname === '/disabled') title = 'Disabled';

    return (
        <div className={`relative flex justify-between w-full px-[18px] py-3 pb-1 ${darkMode ? 'bg-[#1a1c1e]' : 'bg-[#fff]'} drop-shadow-header rounded-br-[20px] rounded-bl-[20px]`}>
            <Text className='font-semibold select-none'>
                {title}
            </Text>
            <SettingsButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>

    )
}

export default PageHead;