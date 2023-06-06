import React, { useState, useEffect } from 'react';
import { Text } from '@nextui-org/react';
import { getStatistics } from '../constants/popup';

const StatsPage = ({ darkMode }) => {
    const [statistics, setStatistics] = useState({});

    useEffect(() => {
        const fetchSwitchData = async () => {
            try {
                const statisticData = await getStatistics();
                setStatistics(statisticData);
            } catch (error) {
                console.error('Error fetching switch data:', error);
            }
        };

        fetchSwitchData();
    }, []);

    return (
        <div className='flex flex-col w-full h-full'>
            <div className={`w-full mt-6 mb-5`}>
                <Text className={`text-[12px] ${darkMode ? 'text-textAltDark' : 'text-textAlt'}`}>
                    Here is a breakdown of what HYS has done to make your browsing experience better
                </Text>
            </div>

            <Text blockquote className='w-full p-0 mt-0'>
                <div className={`flex justify-between items-center w-full px-4 py-1 rounded-[12px] ${darkMode ? 'hover:bg-[#1b1d21]' : 'hover:bg-[#e9e9e9]'}`}>
                    <Text className='text-[12px] font-medium'>
                        Hidden the Shorts navigation button
                    </Text>
                    <Text className='font-semibold text-accentLight'>
                        {statistics.navButton || 0}
                    </Text>
                </div>

                <div className={`w-full h-[1px] ${darkMode ? 'bg-[#353535]' : 'bg-[#bfbfbf]'}`}></div>

                <div className={`flex justify-between items-center w-full px-4 py-1 rounded-[12px] ${darkMode ? 'hover:bg-[#1b1d21]' : 'hover:bg-[#e9e9e9]'}`}>
                    <Text className='text-[12px] font-medium'>
                        Hidden Shorts shelves
                    </Text>
                    <Text className='font-semibold text-accentLight'>
                        {statistics.shortsShelf || 0}
                    </Text>
                </div>

                <div className={`w-full h-[1px] ${darkMode ? 'bg-[#353535]' : 'bg-[#bfbfbf]'}`}></div>

                <div className={`flex justify-between items-center w-full px-4 py-1 rounded-[12px] ${darkMode ? 'hover:bg-[#1b1d21]' : 'hover:bg-[#e9e9e9]'}`}>
                    <Text className='text-[12px] font-medium'>
                        Hidden Shorts on the Home feed
                    </Text>
                    <Text className='font-semibold text-accentLight'>
                        {statistics.homeFeedShorts || 0}
                    </Text>
                </div>

                <div className={`w-full h-[1px] ${darkMode ? 'bg-[#353535]' : 'bg-[#bfbfbf]'}`}></div>

                <div className={`flex justify-between items-center w-full px-4 py-1 rounded-[12px] ${darkMode ? 'hover:bg-[#1b1d21]' : 'hover:bg-[#e9e9e9]'}`}>
                    <Text className='text-[12px] font-medium'>
                        Hidden Shorts on the Subscriptions feed
                    </Text>
                    <Text className='font-semibold text-accentLight'>
                        {statistics.subFeedShorts || 0}
                    </Text>
                </div>

                <div className={`w-full h-[1px] ${darkMode ? 'bg-[#353535]' : 'bg-[#bfbfbf]'}`}></div>

                <div className={`flex justify-between items-center w-full px-4 py-1 rounded-[12px] ${darkMode ? 'hover:bg-[#1b1d21]' : 'hover:bg-[#e9e9e9]'}`}>
                    <Text className='text-[12px] font-medium'>
                        Hidden Shorts on the Trending feed
                    </Text>
                    <Text className='font-semibold text-accentLight'>
                        {statistics.trendFeedShorts || 0}
                    </Text>
                </div>

                <div className={`w-full h-[1px] ${darkMode ? 'bg-[#353535]' : 'bg-[#bfbfbf]'}`}></div>

                <div className={`flex justify-between items-center w-full px-4 py-1 rounded-[12px] ${darkMode ? 'hover:bg-[#1b1d21]' : 'hover:bg-[#e9e9e9]'}`}>
                    <Text className='text-[12px] font-medium'>
                        Hidden Shorts in Search results
                    </Text>
                    <Text className='font-semibold text-accentLight'>
                        {statistics.searchResultShorts || 0}
                    </Text>
                </div>

                <div className={`w-full h-[1px] ${darkMode ? 'bg-[#353535]' : 'bg-[#bfbfbf]'}`}></div>

                <div className={`flex justify-between items-center w-full px-4 py-1 rounded-[12px] ${darkMode ? 'hover:bg-[#1b1d21]' : 'hover:bg-[#e9e9e9]'}`}>
                    <Text className='text-[12px] font-medium'>
                        Hidden Shorts in the Recommended list
                    </Text>
                    <Text className='font-semibold text-accentLight'>
                        {statistics.recommendedShorts || 0}
                    </Text>
                </div>

                <div className={`w-full h-[1px] ${darkMode ? 'bg-[#353535]' : 'bg-[#bfbfbf]'}`}></div>

                <div className={`flex justify-between items-center w-full px-4 py-1 rounded-[12px] ${darkMode ? 'hover:bg-[#1b1d21]' : 'hover:bg-[#e9e9e9]'}`}>
                    <Text className='text-[12px] font-medium'>
                        Hidden Shorts on channel's Home tabs
                    </Text>
                    <Text className='font-semibold text-accentLight'>
                        {statistics.channelShorts || 0}
                    </Text>
                </div>

                <div className={`w-full h-[1px] ${darkMode ? 'bg-[#353535]' : 'bg-[#bfbfbf]'}`}></div>

                <div className={`flex justify-between items-center w-full px-4 py-1 rounded-[12px] ${darkMode ? 'hover:bg-[#1b1d21]' : 'hover:bg-[#e9e9e9]'}`}>
                    <Text className='text-[12px] font-medium'>
                        Hidden the Shorts tab on Channel pages
                    </Text>
                    <Text className='font-semibold text-accentLight'>
                        {statistics.channelTabs || 0}
                    </Text>
                </div>

                <div className={`w-full h-[1px] ${darkMode ? 'bg-[#353535]' : 'bg-[#bfbfbf]'}`}></div>

                <div className={`flex justify-between w-full px-4 py-1 rounded-[12px] ${darkMode ? 'hover:bg-[#1b1d21]' : 'hover:bg-[#e9e9e9]'}`}>
                    <Text className='text-[12px] font-medium'>
                        Played Shorts as regular videos
                    </Text>
                    <Text className='font-semibold text-accentLight'>
                        {statistics.playedAsRegular || 0}
                    </Text>
                </div>

            </Text>
        </div>
    )
}

export default StatsPage;