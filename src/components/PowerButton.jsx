import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { getSwitchStates, updateSwitchState } from '../constants/popup';
import Loader from './Loader';

const PowerButton = ({ darkMode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [mainState, setMainState] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSwitchData = async () => {
            try {
                const switchData = await getSwitchStates();
                setMainState(switchData.toggleState);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching switch data:', error);
            }
        };

        fetchSwitchData();
    }, []);

    const updateSwitch = async () => {
        await updateSwitchState('toggleState');
        setMainState(!mainState);
        if (!mainState === false) navigate('/disabled');
        if (!mainState === true) navigate('/');
    };

    // if (isLoading) {
    //     return (
    //         <Loader />
    //     )
    // }

    if (mainState) {
        return (
            <div className={`absolute flex bottom-[4%] left-[45%] w-[47px] h-[47px] ${darkMode ? 'bg-[#1a1c1e]' : 'bg-[#fff]'} rounded-full z-[9999] shadow-actionBtn`} onClick={updateSwitch}>
                <Fab className={`m-auto ${darkMode ? `bg-[#5086c3] text-[#000]` : `bg-[#3694ff] text-[#fff]`} shadow-none`} size="small" aria-label="add">
                    <PowerSettingsNewIcon />
                </Fab>
            </div>
        )
    } else {
        return (
            <div className={`absolute flex bottom-[4%] left-[45%] w-[47px] h-[47px] ${darkMode ? 'bg-[#1a1c1e]' : 'bg-[#fff]'} rounded-full z-[9999] shadow-actionBtn`} onClick={updateSwitch}>
                <Fab className={`m-auto ${darkMode ? `bg-[#a5a5a5] text-[#000]` : `bg-[#a5a5a5] text-[#fff]`} shadow-none`} size="small" aria-label="add">
                    <PowerSettingsNewIcon />
                </Fab>
            </div>
        )
    }
}

export default PowerButton;