import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Text } from '@nextui-org/react';
import { Loader } from '../components';
import { getSwitchStates } from '../constants/popup';

const SwitchContainer = lazy(() => import('../components/SwitchContainer'));

const ChannelPage = ({ darkMode }) => {
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
                        title={'Shorts Tab'}
                        description={'Hide the Shorts tab on channel pages'}
                        darkMode={darkMode}
                        switchName={'toggleTabState'}
                        state={switchState.toggleTabState} />

                    <SwitchContainer
                        title={'Home Tab Shorts'}
                        description={'Hide Shorts videos in the home tab on channel pages'}
                        darkMode={darkMode}
                        switchName={'toggleHomeTabState'}
                        state={switchState.toggleHomeTabState} />
                </div>
            </div>
        </Suspense>
    )
}

export default ChannelPage;