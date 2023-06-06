import React, { useState, useEffect } from 'react';
import { Text } from '@nextui-org/react';
import { getStatistics } from '../constants/popup';

const StatsPage = ({ darkMode }) => {
    const [statistics, setStatistics] = useState({});
    const statisticPropertiesOrder = [
        'navButton',
        'homeFeedShorts',
        'subFeedShorts',
        'trendFeedShorts',
        'shortsShelf',
        'searchResultShorts',
        'recommendedShorts',
        'channelTabs',
        'channelShorts',
        'playedAsRegular',
    ];

    const statisticTitles = {
        navButton: 'Hidden the Shorts navigation button',
        homeFeedShorts: 'Hidden Shorts in the Home feed',
        subFeedShorts: 'Hidden Shorts in the Subscriptions feed',
        trendFeedShorts: 'Hidden Shorts in the Trending feed',
        shortsShelf: 'Hidden Shorts shelves',
        searchResultShorts: 'Hidden Shorts in Search results',
        recommendedShorts: 'Hidden Shorts in the Recommended list',
        channelTabs: "Hidden the Shorts tab on Channel pages",
        channelShorts: "Hidden Shorts in the channel's Home tab",
        playedAsRegular: "Played Shorts as regular videos",
    };

    useEffect(() => {
        const fetchStatisticData = async () => {
            try {
                const statisticData = await getStatistics();
                setStatistics(statisticData);
            } catch (error) {
                console.error('Error fetching switch data:', error);
            }
        };

        fetchStatisticData();
    }, []);

    const renderStatisticRows = () => {
        return statisticPropertiesOrder.map((propertyName) => {
            const count = statistics[propertyName] || 0;
            const title = statisticTitles[propertyName] || '';

            return (
                <div key={propertyName} className={`flex justify-between items-center w-full px-4 py-1 rounded-[12px] ${darkMode ? 'hover:bg-[#1b1d21]' : 'hover:bg-[#e9e9e9]'}`}>
                    <Text className='text-[12px] font-medium'>{title}</Text>
                    <Text className='font-semibold text-accentLight'>{count.toLocaleString()}</Text>
                </div>
            );
        });
    };

    return (
        <div className='flex flex-col w-full h-full'>
            <div className={`w-full mt-6 mb-5`}>
                <Text className={`text-[12px] ${darkMode ? 'text-textAltDark' : 'text-textAlt'}`}>
                    Here is a breakdown of what HYS has done to make your browsing experience better
                </Text>
            </div>

            <Text blockquote className={`w-full p-0 mt-0`}>
                <div className={`flex justify-between px-4 rounded-tl-[12px] rounded-tr-[12px] ${darkMode ? 'bg-[#212329]' : 'bg-[#e1e1e1]'}`}>
                    <Text className='text-[14px] font-semibold'>Event</Text>
                    <Text className='text-[14px] font-semibold'>Times</Text>
                </div>

                {renderStatisticRows()}
            </Text>
        </div>
    );
};

export default StatsPage;