import { Text } from '@nextui-org/react';
import { useLocation } from 'react-router-dom';
import { useDarkMode } from '../theme';
import { SettingsButton } from './index';

const titleNameMap = {
    "/": "Feed Pages",
    "/feed": "Feed Pages",
    "/channel": "Channel Pages",
    "/misc": "Miscellaneous",
    "/stats": "Statistics",
    "/disabled": "Disabled",
}

const PageHead = () => {
    const location = useLocation();
    const { darkMode } = useDarkMode();
    
    const title = titleNameMap[location.pathname];

    return (
        <div className={`relative flex justify-between w-full px-[18px] py-3 pb-1 ${darkMode ? 'bg-[#1a1c1e]' : 'bg-[#fff]'} drop-shadow-header rounded-br-[20px] rounded-bl-[20px]`}>
            <Text className='font-semibold select-none'>
                {title}
            </Text>
            <SettingsButton  />
        </div>

    )
}

export default PageHead;