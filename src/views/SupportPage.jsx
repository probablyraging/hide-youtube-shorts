import React from 'react';
import { Text, Button, Spacer } from '@nextui-org/react';
import { support } from '../assets';

const StatsPage = ({ darkMode }) => {
    return (
        <div className='flex flex-col justify-center items-center text-center w-full mt-[15%]'>
            <img src={support} width={64} height={64} />

            <Text className={`text-[22px] mb-3`}>
                Something wrong?
            </Text>

            <Text className={`text-[16px] ${darkMode ? 'text-textAltDark' : 'text-textAlt'}`}>
                Join the Discord support server
            </Text>
            <Button
                onPress={() => { window.open("https://discord.gg/HAFP4P7Dfr", "_blank") }}
                className={`h-[32px] ${darkMode ? 'bg-[#5086c3] hover:bg-[#4175b0]' : 'bg-[#3694ff] hover:bg-[#2c85e9]'}`}>
                <i className="bi bi-discord text-[16px] mr-2 mt-[2px]"></i> Discord
            </Button>

            <Spacer y={1} />

            <Text className={`text-[16px] ${darkMode ? 'text-textAltDark' : 'text-textAlt'}`}>
                Open a support ticket on GitHub
            </Text>
            <Button
                onPress={() => { window.open("https://github.com/ProbablyRaging/hide-youtube-shorts/issues/new/choose", "_blank") }}
                className={`h-[32px] ${darkMode ? 'bg-[#5086c3] hover:bg-[#4175b0]' : 'bg-[#3694ff] hover:bg-[#2c85e9]'}`}>
                <i className="bi bi-github text-[16px] mr-2 mt-[2px]"></i> GitHub
            </Button>
        </div>
    )
};

export default StatsPage;