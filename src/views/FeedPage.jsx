import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Link } from '@nextui-org/react';
import { Loader } from '../components';
import { getSwitchStates } from '../constants/popup';

const SwitchContainer = lazy(() => import('../components/SwitchContainer'));
const ModalDisplay = lazy(() => import('../components/ModalDisplay'));

const FeedPage = ({ darkMode }) => {
    const [switchState, setSwitchState] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSwitchData = async () => {
            try {
                const switchData = await getSwitchStates();
                setSwitchState(switchData);
            } catch (error) {
                console.error('Error fetching switch data:', error);
            }
        };

        fetchSwitchData();
    }, []);

    if (switchState.toggleState === false) navigate('/disabled');

    return (
        <Suspense fallback={<Loader darkMode={darkMode} />}>
            <div className='flex flex-col justify-center items-center w-full h-full'>

                <ModalDisplay />

                <div className={`w-full mt-6 mb-5`}>
                    <Text className={`text-[12px] ${darkMode ? 'text-textAltDark' : 'text-textAlt'}`}>
                        Control the view of Shorts videos on pages such as <Link isExternal href='https://www.youtube.com/' target='_blank'>Home</Link>, <Link isExternal href='https://www.youtube.com/feed/subscriptions' target='_blank'>Subscriptions</Link>, and <Link isExternal href='https://www.youtube.com/feed/trending' target='_blank'>Trending</Link>
                    </Text>
                </div>

                <div className='flex flex-col w-full'>
                    {/* Home */}
                    <SwitchContainer
                        title={'Home Feed Shorts'}
                        description={'Hide Shorts videos on the home page'}
                        darkMode={darkMode}
                        switchName={'toggleHomeFeedState'}
                        state={switchState.toggleHomeFeedState} />

                    <SwitchContainer
                        title={'Home Feed Lives'}
                        description={'Hide Live videos on the home page'}
                        darkMode={darkMode}
                        switchName={'toggleHomeFeedStateLives'}
                        state={switchState.toggleHomeFeedStateLives} />

                    <SwitchContainer
                        title={'Home Feed Premieres'}
                        description={'Hide Premiere videos on the home page'}
                        darkMode={darkMode}
                        switchName={'toggleHomeFeedStatePremieres'}
                        state={switchState.toggleHomeFeedStatePremieres} />

                    {/* Subscriptions */}
                    <SwitchContainer
                        title={'Subscriptions Feed Shorts'}
                        description={'Hide Shorts videos on the subscriptions page'}
                        darkMode={darkMode}
                        switchName={'toggleSubscriptionFeedState'}
                        state={switchState.toggleSubscriptionFeedState} />

                    <SwitchContainer
                        title={'Subscriptions Feed Lives'}
                        description={'Hide Live videos on the subscriptions page'}
                        darkMode={darkMode}
                        switchName={'toggleSubscriptionFeedStateLives'}
                        state={switchState.toggleSubscriptionFeedStateLives} />

                    <SwitchContainer
                        title={'Subscriptions Feed Premieres'}
                        description={'Hide Premiere videos on the subscriptions page'}
                        darkMode={darkMode}
                        switchName={'toggleSubscriptionFeedStatePremieres'}
                        state={switchState.toggleSubscriptionFeedStatePremieres} />

                    {/* Trending */}
                    <SwitchContainer
                        title={'Trending Feed Shorts'}
                        description={'Hide Shorts videos on the trending page'}
                        darkMode={darkMode}
                        switchName={'toggleTrendingFeedState'}
                        state={switchState.toggleTrendingFeedState} />
                </div>
            </div>
        </Suspense>
    )
}

export default FeedPage;