import { Switch, Text } from '@nextui-org/react';
import React from 'react';
import { turbo } from '../assets';
import { Badge, InfoTooltip } from '../components';
import { updateSwitchState } from '../constants/popup';

const SwitchContainer = ({ darkMode, title, description, switchName, state, isNew, hasInfo }) => {
    return (
        <>
            {title === 'TURBO' ? (
                <Text blockquote className='flex flex-row justify-between pl-4 pr-4 py-2 mt-2 mb-2 drop-shadow-card'>
                    <div className='flex flex-col justify-between'>
                        <div className='flex items-center gap-1'>
                            <img width={18} height={18} src={turbo} />
                            <Text className='text-[14px] font-semibold gradient-anim'>{title}</Text>
                        </div>
                        <Text className={`text-[10px] ${darkMode ? 'text-textAltDark' : 'text-textAlt'} pr-5`}>{description}</Text>
                    </div>
                    <Switch
                        onChange={() => updateSwitchState(switchName)}
                        checked={state}
                        size="xs"
                        initialChecked />
                </Text>
            ) : (
                <Text blockquote className='flex flex-row justify-between pl-4 pr-4 py-2 mt-2 mb-2 drop-shadow-card'>
                    <div className='flex flex-col justify-between'>
                        <div className='flex items-center gap-1'>
                            <Text className='text-[14px] font-medium'>{title}</Text>
                            {hasInfo && <InfoTooltip darkMode={darkMode} ></InfoTooltip>}
                            {isNew && <Badge content={'new'} darkMode={darkMode} ></Badge>}
                        </div>
                        <Text className={`text-[10px] ${darkMode ? 'text-textAltDark' : 'text-textAlt'} pr-5`}>{description}</Text>
                    </div>
                    <Switch
                        onChange={() => updateSwitchState(switchName)}
                        checked={state}
                        size="xs"
                        initialChecked />
                </Text>
            )}
        </>

    )
}

export default SwitchContainer;