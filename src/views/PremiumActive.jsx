import React from 'react';
import { Text } from '@nextui-org/react';
import { premium } from '../assets';

const PremiumActive = ({ darkMode }) => {
    return (
        <div className='flex flex-col justify-center items-center text-center w-full mt-[40%]'>
            <img src={premium} width={64} height={64} />

            <Text className={`text-[22px] mb-3`}>
                {chrome.i18n.getMessage('premiumOne')}
            </Text>

            <Text className={`text-[16px] mb-6 ${darkMode ? 'text-textAltDark' : 'text-textAlt'}`}>
                {chrome.i18n.getMessage('premiumTwo')}
            </Text>
        </div>
    )
}

export default PremiumActive;