import { Text } from '@nextui-org/react';
import { Suspense, lazy, useEffect, useState } from 'react';
import { Loader } from '../components';
import { getSwitchStates } from '../constants/popup';
import { useDarkMode } from '../theme';

const SwitchContainer = lazy(() => import('../components/SwitchContainer'));

const MiscPage = () => {
    const { darkMode } = useDarkMode();
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
                <div className={`w-full mt-6 mb-5`}>
                    <Text className={`text-[12px] ${darkMode ? 'text-textAltDark' : 'text-textAlt'}`}>
                        Miscellaneous options for hiding Shorts elements all across YouTube
                    </Text>
                </div>

                <div className='flex flex-col w-full'>
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

                    <SwitchContainer
                        title={'TURBO'}
                        description={'Boosts speed and efficiency at the cost of system resources'}
                        darkMode={darkMode}
                        switchName={'toggleTurboState'}
                        state={switchState.toggleTurboState} />
                </div>
            </div>
        </Suspense>
    )
}

export default MiscPage;