import React from 'react';
import { Text } from '@nextui-org/react';
import { Switch } from '@nextui-org/react';
import { Badge, InfoTooltip } from '../components'
import { updateSwitchState } from '../constants/popup';

const SwitchContainer = ({ darkMode, title, description, switchName, state, isNew, hasInfo }) => {
    return (
        <div className={`switch-container flex flex-row justify-between items-center pl-4 pr-4 py-4 ${darkMode ? 'border-[#2d2d2d]' : 'border-[#d5d5d5]'}`}>
            <div className='flex flex-col justify-between'>
                <div className='flex items-center gap-1'>
                    <Text className='text-[14px] font-medium'>{title}</Text>
                    {hasInfo && <InfoTooltip darkMode={darkMode} ></InfoTooltip>}
                    {isNew && <Badge content={'new'} darkMode={darkMode} ></Badge>}
                </div>
                <Text className={`text-[12px] ${darkMode ? 'text-textAltDark' : 'text-textAlt'} pr-5`}>{description}</Text>
            </div>
            <Switch
                onChange={() => updateSwitchState(switchName)}
                checked={state}
                size="sm"
                initialChecked />
        </div>
    )
}

export default SwitchContainer;