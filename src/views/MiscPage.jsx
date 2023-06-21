import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Text } from '@nextui-org/react';
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
                        description={'Hide the Shorts button on the navigation panel'}
                        darkMode={darkMode}
                        switchName={'toggleNavState'}
                        state={switchState.toggleNavState} />

                    <SwitchContainer
                        title={'Search Results'}
                        description={'Hide Shorts videos in search results'}
                        darkMode={darkMode}
                        switchName={'toggleSearchState'}
                        state={switchState.toggleSearchState} />

                    <SwitchContainer
                        title={'Recommended List'}
                        description={'Hide Shorts videos in the recommended list on video watch pages'}
                        darkMode={darkMode}
                        switchName={'toggleRecommendedState'}
                        state={switchState.toggleRecommendedState} />

                    <SwitchContainer
                        title={'Notification Menu'}
                        description={'Hide notifications about Shorts in the notification menu'}
                        darkMode={darkMode}
                        switchName={'toggleNotificationState'}
                        state={switchState.toggleNotificationState} />

                    <SwitchContainer
                        title={'Play In Regular Mode'}
                        description={'Play Shorts videos on a regular video page'}
                        darkMode={darkMode}
                        switchName={'toggleRegularState'}
                        state={switchState.toggleRegularState} />
                </div>
            </div>
        </Suspense>
    )
}

export default MiscPage;