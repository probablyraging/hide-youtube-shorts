import CoffeeIcon from '@mui/icons-material/Coffee';
import GitHubIcon from '@mui/icons-material/GitHub';
import SettingsIcon from '@mui/icons-material/Settings';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { Dropdown, Switch } from '@nextui-org/react';
import { MoonIcon, SunIcon } from '../constants/icons';
import { useDarkMode } from '../theme';

const SettingsButton = () => {
    const {darkMode, toggleDarkMode} = useDarkMode();

    const handleClick = (action) => {
        if (action === 'github') window.open('https://github.com/probablyraging/hide-youtube-shorts');
        if (action === 'help') window.open('https://discord.gg/HAFP4P7Dfr');
        if (action === 'review') window.open('https://chrome.google.com/webstore/detail/hide-youtube-shorts/aljlkinhomaaahfdojalfmimeidofpih/reviews');
        if (action === 'coffee') window.open('https://www.buymeacoffee.com/probablyraging');
    };

    return (
        <div className={`${darkMode ? 'text-[#e9e9e9]' : 'text-[#3b3b3b]'} cursor-pointer`}>
            <Dropdown closeOnSelect={false} placement="bottom-right">

                <Dropdown.Trigger>
                    <SettingsIcon
                        className={`${darkMode ? 'hover:bg-[#383a3d]' : 'hover:bg-[#dfdfdf]'} hover:text-[#3694ff] transition-colors duration-200`}
                        sx={{ width: '28px', height: '28px', padding: '4px', backgroundColor: `${darkMode ? '#2f3235' : '#e9e9e9'}`, borderRadius: '8px' }} />
                </Dropdown.Trigger>

                <Dropdown.Menu
                    css={{ border: `1px solid ${darkMode ? '#2f2f2f' : '#dbdbdb'}`, borderRadius: '16px', padding: '4px' }}
                    variant='light' aria-label="settings">

                    <Dropdown.Item
                        textValue='theme'
                        key="theme" css={{ fontSize: '14px' }}>
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
                        textValue='github'
                        icon={<GitHubIcon className={`w-[18px]`} />}
                        key="github"
                        css={{ fontSize: '14px' }}
                        withDivider>
                        <div onClick={() => handleClick('github')}>
                            GitHub
                        </div>
                    </Dropdown.Item>

                    <Dropdown.Item
                        textValue='help & support'
                        icon={<i className="bi bi-discord w-[18px] h-[24px] text-[17px]"></i>}
                        key="support"
                        css={{ fontSize: '14px' }}>
                        <div onClick={() => handleClick('help')}>
                            Help & Support
                        </div>
                    </Dropdown.Item>

                    <Dropdown.Item
                        textValue='review'
                        icon={<ThumbUpAltIcon className={`w-[18px]`} />}
                        key="review"
                        css={{ fontSize: '14px' }}>
                        <div onClick={() => handleClick('review')}>
                            Leave A Review
                        </div>
                    </Dropdown.Item>

                    <Dropdown.Item
                        textValue='coffee'
                        icon={<CoffeeIcon className={`w-[18px]`} />}
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