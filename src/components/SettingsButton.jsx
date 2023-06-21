import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Dropdown, Switch } from '@nextui-org/react';
import { SunIcon, MoonIcon } from '../constants/icons';
import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CoffeeIcon from '@mui/icons-material/Coffee';
import CircleIcon from '@mui/icons-material/Circle';
import { getSwitchStates, updateSwitchState } from '../constants/popup';

const SettingsButton = ({ darkMode, toggleDarkMode }) => {
    const [mainState, setMainState] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSwitchData = async () => {
            try {
                const switchData = await getSwitchStates();
                setMainState(switchData.toggleState);
            } catch (error) {
                console.error('Error fetching switch data:', error);
            }
        };

        fetchSwitchData();
    }, []);

    const updateSwitch = async () => {
        await updateSwitchState('toggleState');
        setMainState(!mainState);
        if (!mainState === false) navigate('/disabled');
        if (!mainState === true) navigate('/');
    };

    const handleClick = (action) => {
        if (action === 'website') window.open('https://hideshorts.com/');
        if (action === 'github') window.open('https://github.com/probablyraging/hide-youtube-shorts');
        if (action === 'help') window.open('https://discord.gg/HAFP4P7Dfr');
        if (action === 'review') window.open('https://chrome.google.com/webstore/detail/hide-youtube-shorts/aljlkinhomaaahfdojalfmimeidofpih/reviews');
        if (action === 'coffee') window.open('https://www.buymeacoffee.com/probablyraging');
    };

    return (
        <div className={`${darkMode ? 'text-[#e9e9e9]' : 'text-[#3b3b3b]'} cursor-pointer`}>
            <Dropdown closeOnSelect={false} placement="bottom-right">

                <Badge
                    content=""
                    color={`${mainState ? 'success' : 'error'}`}
                    placement="bottom-left"
                    shape="circle"
                    variant="dot"
                    size="md"
                    verticalOffset="10%"
                    className='cursor-default'>
                    <Dropdown.Trigger>
                        <i className='bi bi-gear text-[22px] hover:text-[#3694ff] transition-colors duration-200 cursor-pointer'></i>
                    </Dropdown.Trigger>
                </Badge>

                <Dropdown.Menu
                    css={{ border: `1px solid ${darkMode ? '#2f2f2f' : '#dbdbdb'}`, borderRadius: '16px', padding: '4px' }}
                    variant='light' aria-label="settings">

                    <Dropdown.Item
                        textValue='power'
                        className={`${darkMode ? 'hover:bg-[#232323] text-[#ecedee]' : 'hover:bg-[#f5f5f5] text-[#000]'}`}
                        key="power"
                        css={{ fontSize: '14px' }}>
                        <div className='flex items-center justify-between'>
                            <div className='w-full' onClick={updateSwitch}>
                                {mainState ? 'Enabled' : 'Disabled'}
                            </div>
                            <Switch
                                id="power-switch"
                                checked={mainState}
                                onChange={updateSwitch}
                                size="xs"
                                iconOn={<CircleIcon className='text-[#17C964]' />}
                                iconOff={<CircleIcon className='text-[#F31260]' />}
                            />
                        </div>
                    </Dropdown.Item>

                    <Dropdown.Item
                        textValue='theme'
                        className={`${darkMode ? 'hover:bg-[#232323] text-[#ecedee]' : 'hover:bg-[#f5f5f5] text-[#000]'}`}
                        key="theme"
                        css={{ fontSize: '14px' }}
                        withDivider>
                        <div className='flex items-center justify-between'>
                            <div className='w-full' onClick={toggleDarkMode}>
                                {darkMode ? 'Dark' : 'Light'}
                            </div>
                            <Switch
                                id="theme-switch"
                                checked={!darkMode}
                                onChange={toggleDarkMode}
                                size="xs"
                                iconOn={<SunIcon filled />}
                                iconOff={<MoonIcon filled />}
                            />
                        </div>
                    </Dropdown.Item>

                    <Dropdown.Item
                        textValue='website'
                        className={`${darkMode ? 'hover:bg-[#232323] text-[#ecedee]' : 'hover:bg-[#f5f5f5] text-[#000]'}`}
                        icon={<LanguageIcon className={`w-[18px] ${darkMode ? 'text-[#a570c6]' : 'text-[#a570c6]'}`} />}
                        key="website"
                        css={{ fontSize: '14px' }}
                        withDivider>
                        <div onClick={() => handleClick('website')}>
                            Website
                        </div>
                    </Dropdown.Item>

                    <Dropdown.Item
                        textValue='github'
                        className={`${darkMode ? 'hover:bg-[#232323] text-[#ecedee]' : 'hover:bg-[#f5f5f5] text-[#000]'}`}
                        icon={<GitHubIcon className={`w-[18px] ${darkMode ? 'text-[#4f4f4f]' : 'text-[#373737]'}`} />}
                        key="github"
                        css={{ fontSize: '14px' }}>
                        <div onClick={() => handleClick('github')}>
                            GitHub
                        </div>
                    </Dropdown.Item>

                    <Dropdown.Item
                        textValue='help & support'
                        className={`${darkMode ? 'hover:bg-[#232323] text-[#ecedee]' : 'hover:bg-[#f5f5f5] text-[#000]'}`}
                        icon={<i className={`bi bi-discord w-[18px] h-[24px] text-[17px] ${darkMode ? 'text-[#515cd6]' : 'text-[#404eed]'}`}></i>}
                        key="support"
                        css={{ fontSize: '14px' }}>
                        <div onClick={() => handleClick('help')}>
                            Help & Support
                        </div>
                    </Dropdown.Item>

                    <Dropdown.Item
                        textValue='review'
                        className={`${darkMode ? 'hover:bg-[#232323] text-[#ecedee]' : 'hover:bg-[#f5f5f5] text-[#000]'}`}
                        icon={<ThumbUpAltIcon className={`w-[18px] ${darkMode ? 'text-[#3694ff]' : 'text-[#3694ff]'}`} />}
                        key="review"
                        css={{ fontSize: '14px' }}>
                        <div onClick={() => handleClick('review')}>
                            Leave A Review
                        </div>
                    </Dropdown.Item>

                    <Dropdown.Item
                        textValue='coffee'
                        className={`${darkMode ? 'hover:bg-[#232323] text-[#ecedee]' : 'hover:bg-[#f5f5f5] text-[#000]'}`}
                        icon={<CoffeeIcon className={`w-[18px] ${darkMode ? 'text-[#e1cd4a]' : 'text-[#e1cd4a]'}`} />}
                        key="coffee"
                        css={{ fontSize: '14px' }}>
                        <div onClick={() => handleClick('coffee')}>
                            Buy Me A Coffee
                        </div>
                    </Dropdown.Item>
                </Dropdown.Menu>

            </Dropdown>
        </div>
    )
}

export default SettingsButton;