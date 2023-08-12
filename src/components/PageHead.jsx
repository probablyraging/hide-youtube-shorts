import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Text, Tooltip } from '@nextui-org/react';
import { SettingsButton } from './index';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { feed_page, channel_page, misc_page, block_page, disabled_page, premium } from '../assets';
import { checkPremium } from '../constants/popup';

const PageHead = ({ darkMode, toggleDarkMode }) => {
    const [isPremium, setIsPremium] = useState(false);
    const location = useLocation();
    const pageData = {
        '/': [chrome.i18n.getMessage('feedPageTitle'), feed_page, chrome.i18n.getMessage('feedPageDesc')],
        '/feed': [chrome.i18n.getMessage('feedPageTitle'), feed_page, chrome.i18n.getMessage('feedPageDesc')],
        '/channel': [chrome.i18n.getMessage('channelPageTitle'), channel_page, chrome.i18n.getMessage('channelPageDesc')],
        '/misc': [chrome.i18n.getMessage('miscPageTitle'), misc_page, chrome.i18n.getMessage('miscPageDesc')],
        '/block': [chrome.i18n.getMessage('blockPageTitle'), block_page, chrome.i18n.getMessage('blockPageDesc')],
        '/disabled': [chrome.i18n.getMessage('disabledPageTitle'), disabled_page, chrome.i18n.getMessage('disabledPageDesc')],
        '/premium': ['Get Pro', premium, 'Get HYS Pro'],
        '/premiumactive': ['Pro Active', premium, 'Pro active']
    };

    useEffect(() => {
        const checkIfPremium = async () => {
            try {
                const premiumData = await checkPremium();
                setIsPremium(premiumData);
            } catch (error) {
                console.error('Error checking premium status:', error);
            }
        }

        checkIfPremium();
    }, []);

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

            <div className='flex gap-6 justify-center items-center'>
                {isPremium ? (
                    <Link to={'/premium'}>
                        <div className='flex justify-center items-center w-[110px] h-[32px] bg-[#ffc107] rounded-xl hover:bg-[#efb811]'>
                            <img className='mr-2' src={premium} width={18} height={18} />
                            <Text className='text-white text-sm font-semibold'>
                                Get Pro
                            </Text>
                        </div>
                    </Link>
                ) : null}

                <SettingsButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </div>

        </div>
    );
}

export default PageHead;