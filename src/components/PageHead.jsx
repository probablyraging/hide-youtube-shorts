import React from 'react';
import { useLocation } from 'react-router-dom';
import { Text, Tooltip } from '@nextui-org/react';
import { SettingsButton } from './index';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { feed_page, channel_page, misc_page, block_page, disabled_page } from '../assets';

const PageHead = ({ darkMode, toggleDarkMode }) => {
    const location = useLocation();
    const pageData = {
        '/': [chrome.i18n.getMessage('feedPageTitle'), feed_page, chrome.i18n.getMessage('feedPageDesc')],
        '/feed': [chrome.i18n.getMessage('feedPageTitle'), feed_page, chrome.i18n.getMessage('feedPageDesc')],
        '/channel': [chrome.i18n.getMessage('channelPageTitle'), channel_page, chrome.i18n.getMessage('channelPageDesc')],
        '/misc': [chrome.i18n.getMessage('miscPageTitle'), misc_page, chrome.i18n.getMessage('miscPageDesc')],
        '/block': [chrome.i18n.getMessage('blockPageTitle'), block_page, chrome.i18n.getMessage('blockPageDesc')],
        '/disabled': [chrome.i18n.getMessage('disabledPageTitle'), disabled_page, chrome.i18n.getMessage('disabledPageDesc')],
    };

    const [title, pageIcon, tooltipText] = pageData[location.pathname] || [];

    return (
        <div className={`relative flex justify-between items-center w-full px-[22px] py-2 pb-1 ${darkMode ? 'bg-[#1a1c1e]' : 'bg-[#fff]'} shadow-pageHead`}>
            <div className='flex flex-row items-center gap-2'>
                <img src={pageIcon} width={22} height={22} />
                <Text className='font-medium select-none'>
                    {title}
                </Text>
                <Tooltip
                    hideArrow
                    color='invert'
                    offset={0}
                    placement='bottom'
                    css={{ backgroundColor: darkMode ? '#1c1d20' : '#f7f7f7', border: `1px solid ${darkMode ? '#2f2f2f' : '#dbdbdb'}`, userSelect: 'none' }}
                    content={<Text className={`text-[12px] ${darkMode ? 'text-white' : 'text-black'}`}>{tooltipText}</Text>}>
                    <HelpOutlineIcon className='text-[16px] text-[gray]' />
                </Tooltip>
            </div>

            <SettingsButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
    );
}

export default PageHead;