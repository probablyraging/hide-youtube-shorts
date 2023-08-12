import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Loader } from '../components';
import { getSwitchStates, checkPremium } from '../constants/popup';

const SwitchContainer = lazy(() => import('../components/SwitchContainer'));

const MiscPage = ({ darkMode }) => {
    const [switchState, setSwitchState] = useState({});
    const [isPremium, setIsPremium] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
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

        fetchData();
        checkIfPremium();
    }, []);

    return (
        <Suspense fallback={<Loader darkMode={darkMode} />}>
            <div className='flex flex-col justify-center items-center w-full h-full'>
                <div className='flex flex-col w-full mt-4'>
                    <SwitchContainer
                        title={'Shorts Navigation Button'}
                        description={chrome.i18n.getMessage('shortsNavigationButtonDesc')}
                        darkMode={darkMode}
                        switchName={'toggleNavState'}
                        state={switchState.toggleNavState} />

                    <SwitchContainer
                        title={'Search Results'}
                        description={chrome.i18n.getMessage('searchResultsDesc')}
                        darkMode={darkMode}
                        switchName={'toggleSearchState'}
                        state={switchState.toggleSearchState}
                        premiumFeature={true}
                        hasPremium={isPremium} />

                    <SwitchContainer
                        title={'Recommended List'}
                        description={chrome.i18n.getMessage('recommendedListDesc')}
                        darkMode={darkMode}
                        switchName={'toggleRecommendedState'}
                        state={switchState.toggleRecommendedState}
                        premiumFeature={true}
                        hasPremium={isPremium} />

                    <SwitchContainer
                        title={'Notification Menu'}
                        description={chrome.i18n.getMessage('notificationMenuDesc')}
                        darkMode={darkMode}
                        switchName={'toggleNotificationState'}
                        state={switchState.toggleNotificationState}
                        premiumFeature={true}
                        hasPremium={isPremium} />

                    <SwitchContainer
                        title={'Play In Regular Mode'}
                        description={chrome.i18n.getMessage('playInRegularModeDesc')}
                        darkMode={darkMode}
                        switchName={'toggleRegularState'}
                        state={switchState.toggleRegularState}
                        premiumFeature={true}
                        hasPremium={isPremium} />

                </div>
            </div>
        </Suspense>
    )
}

export default MiscPage;