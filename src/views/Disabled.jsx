import React from 'react';
import { Text } from '@nextui-org/react';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const Disabled = ({ darkMode }) => {
    return (
        <div className='flex flex-col justify-center items-center text-center w-full mt-[35%]'>
            <Text className={`text-[22px] mb-3`}>
                Extension disabled
            </Text>
            <Text className={`text-[16px] ${darkMode ? 'text-textAltDark' : 'text-textAlt'}`}>
                Press the <PowerSettingsNewIcon className='text-[16px]' /> button below to continue using the extension
            </Text>
        </div>
    )
}

export default Disabled;