import React from 'react';
import { Text } from '@nextui-org/react';
import { plug } from '../assets';

const Disabled = ({ darkMode }) => {
    return (
        <div className='flex flex-col justify-center items-center text-center w-full mt-[25%]'>
            <img src={plug} width={64} height={64} />

            <Text className={`text-[22px] mb-3`}>
                {chrome.i18n.getMessage('disabledOne')}
            </Text>

            <Text className={`text-[16px] mb-6 ${darkMode ? 'text-textAltDark' : 'text-textAlt'}`}>
                {chrome.i18n.getMessage('disabledTwo')}
            </Text>

            <Text className={`text-[16px] ${darkMode ? 'text-textAltDark' : 'text-textAlt'}`}>
                {chrome.i18n.getMessage('disabledThreeA')} <i className='bi bi-gear text-[16px]'></i> {chrome.i18n.getMessage('disabledThreeB')}
            </Text>
        </div>
    )
}

export default Disabled;