import React from 'react';
import { Text, Tooltip } from '@nextui-org/react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const InfoTooltip = ({ darkMode, content }) => {
    return (
        <div className={`flex justify-center items-center select-none`}>
            <Tooltip
                hideArrow
                color='invert'
                offset={0}
                css={{ backgroundColor: darkMode ? '#1c1d20' : '#f7f7f7', border: `1px solid ${darkMode ? '#2f2f2f' : '#dbdbdb'}` }}
                content={<Text className={`text-[12px] ${darkMode ? 'text-white' : 'text-black'}`}>This feature only works on the <a href='https://i.imgur.com/j6i2yB4.png' target='_blank'>new YouTube UI</a></Text>}>
                <HelpOutlineIcon className='text-[16px] text-[gray]' />
            </Tooltip>
        </div>
    )
}

export default InfoTooltip;