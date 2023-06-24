import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Loader } from '../components';
import { getSwitchStates } from '../constants/popup';

const SwitchContainer = lazy(() => import('../components/SwitchContainer'));

const MiscPage = ({ darkMode }) => {
    const [switchState, setSwitchState] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const switchData = await getSwitchStates();
                setSwitchState(switchData);
            } catch (error) {
                console.error('Error fetching switch data:', error);
            }
        };

        fetchData();
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
                        state={switchState.toggleSearchState} />

                    <SwitchContainer
                        title={'Recommended List'}
                        description={chrome.i18n.getMessage('recommendedListDesc')}
                        darkMode={darkMode}
                        switchName={'toggleRecommendedState'}
                        state={switchState.toggleRecommendedState} />

                    <SwitchContainer
                        title={'Notification Menu'}
                        description={chrome.i18n.getMessage('notificationMenuDesc')}
                        darkMode={darkMode}
                        switchName={'toggleNotificationState'}
                        state={switchState.toggleNotificationState} />

                    <SwitchContainer
                        title={'Play In Regular Mode'}
                        description={chrome.i18n.getMessage('playInRegularModeDesc')}
                        darkMode={darkMode}
                        switchName={'toggleRegularState'}
                        state={switchState.toggleRegularState} />

                </div>
            </div>
        </Suspense>
    )
}

export default MiscPage;