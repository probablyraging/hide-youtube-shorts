import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../components';
import { getSwitchStates, checkPremium } from '../constants/popup';

const SwitchContainer = lazy(() => import('../components/SwitchContainer'));
const ModalDisplay = lazy(() => import('../components/ModalDisplay'));

const FeedPage = ({ darkMode }) => {
    const [switchState, setSwitchState] = useState({});
    const [isPremium, setIsPremium] = useState(true);
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

        const checkIfPremium = async () => {
            try {
                const premiumData = await checkPremium();
                setIsPremium(premiumData);
            } catch (error) {
                console.error('Error checking premium status:', error);
            }
        }

        fetchSwitchData();
        checkIfPremium();
    }, []);

    if (switchState.toggleState === false) navigate('/disabled');

    return (
        <Suspense fallback={<Loader darkMode={darkMode} />}>
            <div className='flex flex-col justify-center items-center w-full h-full'>

                <ModalDisplay />

                <div className='flex flex-col w-full mt-4'>
                    {/* Home */}
                    <SwitchContainer
                        title={'Home Feed Shorts'}
                        description={chrome.i18n.getMessage('homeFeedShortsDesc')}
                        darkMode={darkMode}
                        switchName={'toggleHomeFeedState'}
                        state={switchState.toggleHomeFeedState} />

                    <SwitchContainer
                        title={'Home Feed Lives'}
                        description={chrome.i18n.getMessage('homeFeedLivesDesc')}
                        darkMode={darkMode}
                        switchName={'toggleHomeFeedStateLives'}
                        state={switchState.toggleHomeFeedStateLives}
                        premiumFeature={true}
                        hasPremium={isPremium} />

                    <SwitchContainer
                        title={'Home Feed Premieres'}
                        description={chrome.i18n.getMessage('homeFeedPremieresDesc')}
                        darkMode={darkMode}
                        switchName={'toggleHomeFeedStatePremieres'}
                        state={switchState.toggleHomeFeedStatePremieres}
                        premiumFeature={true}
                        hasPremium={isPremium} />

                    {/* Subscriptions */}
                    <SwitchContainer
                        title={'Subscriptions Feed Shorts'}
                        description={chrome.i18n.getMessage('subFeedShortsDesc')}
                        darkMode={darkMode}
                        switchName={'toggleSubscriptionFeedState'}
                        state={switchState.toggleSubscriptionFeedState} />

                    <SwitchContainer
                        title={'Subscriptions Feed Lives'}
                        description={chrome.i18n.getMessage('subFeedLivesDesc')}
                        darkMode={darkMode}
                        switchName={'toggleSubscriptionFeedStateLives'}
                        state={switchState.toggleSubscriptionFeedStateLives}
                        premiumFeature={true}
                        hasPremium={isPremium} />

                    <SwitchContainer
                        title={'Subscriptions Feed Premieres'}
                        description={chrome.i18n.getMessage('subFeedPremieresDesc')}
                        darkMode={darkMode}
                        switchName={'toggleSubscriptionFeedStatePremieres'}
                        state={switchState.toggleSubscriptionFeedStatePremieres}
                        premiumFeature={true}
                        hasPremium={isPremium} />

                    {/* Trending */}
                    <SwitchContainer
                        title={'Trending Feed Shorts'}
                        description={chrome.i18n.getMessage('trendingFeedShortsDesc')}
                        darkMode={darkMode}
                        switchName={'toggleTrendingFeedState'}
                        state={switchState.toggleTrendingFeedState} />
                </div>
            </div>
        </Suspense>
    )
}

export default FeedPage;