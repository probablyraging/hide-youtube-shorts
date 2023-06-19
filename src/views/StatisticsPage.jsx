import { Button, Modal, Text } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { getStatistics, resetStatistics } from '../constants/popup';
import { useDarkMode } from '../theme';

const StatsPage = () => {
    const { darkMode } = useDarkMode();
    const [statistics, setStatistics] = useState({});
    const [visible, setVisible] = useState(false);

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

    const fetchStatisticData = async () => {
        try {
            const statisticData = await getStatistics();
            setStatistics(statisticData);
        } catch (error) {
            console.error('Error fetching switch data:', error);
        }
    };

    useEffect(() => {
        fetchStatisticData();
    }, []);

    const handleResetClick = () => {
        setVisible(true);
    };

    const handleConfirmClick = () => {
        resetStatistics();
        setStatistics({});
        setTimeout(() => {
            fetchStatisticData();
            setVisible(false);
        }, 100);
    };

    const closeHandler = () => {
        setVisible(false);
    };

    const renderStatisticRows = () => {
        return statisticPropertiesOrder.map((propertyName) => {
            const count = statistics[propertyName] || 0;
            const title = statisticTitles[propertyName] || '';

            return (
                <div key={propertyName} className={`flex justify-between items-center w-full px-4 py-1 rounded-[12px] ${darkMode ? 'hover:bg-[#1b1d21]' : 'hover:bg-[#e9e9e9]'}`}>
                    <Text className='text-[12px] font-medium'>{title}</Text>
                    <Text className={`font-semibold ${darkMode ? 'text-accentDark' : 'text-accentLight'}`}>{count.toLocaleString()}</Text>
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

            <Button
                onPress={handleResetClick}
                className={`h-[32px] ${darkMode ? 'bg-[#5086c3] hover:bg-[#4175b0]' : 'bg-[#3694ff] hover:bg-[#2c85e9]'}`}>
                Reset Statistics
            </Button>

            <Modal
                blur
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
                className='max-w-[385px] mx-[10px]'>
                <Modal.Header className='flex flex-col items-start'>
                    <Text className='font-semibold' size={16}>
                        Confirm Reset
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to reset your statistics?
                </Modal.Body>
                <Modal.Footer>
                    <Button flat auto color="none" onPress={closeHandler}>
                        Cancel
                    </Button>
                    <Button flat auto color="primary" onPress={handleConfirmClick}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default StatsPage;