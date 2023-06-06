import React from 'react';
import { Switch } from '@nextui-org/react';
import { SunIcon, MoonIcon } from '../constants/icons';

const ThemeSwitch = ({ darkMode, toggleDarkMode }) => {
    return (
        <>
            <Switch
                id="theme-switch"
                checked={!darkMode}
                onChange={toggleDarkMode}
                size="xs"
                iconOn={<SunIcon filled size={20} />}
                iconOff={<MoonIcon filled size={20} />}
            />
        </>
    )
}

export default ThemeSwitch;