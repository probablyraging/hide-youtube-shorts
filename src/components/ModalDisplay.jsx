// ModalDisplay.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Text, Button } from '@nextui-org/react';
import { presentModal, handleCloseModal } from '../constants/popup';

const ModalDisplay = () => {
    const [shouldPresentModal, setShouldPresentModal] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const fetchModalState = async () => {
            try {
                const presentModalState = await presentModal();
                setShouldPresentModal(presentModalState);
                setVisible(presentModalState);
            } catch (error) {
                console.error('Error fetching switch data:', error);
            }
        };

        fetchModalState();
    }, []);

    const closeHandler = () => {
        handleCloseModal();
        setVisible(false);
    };

    return (
        shouldPresentModal && (
            <Modal
                closeButton
                blur
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
                className='max-h-[330px]'
            >
                <Modal.Header className='absolute flex flex-col items-start top-0'>
                    <Text className='font-semibold' size={16}>
                        What's New In 1.5.1
                    </Text>
                    <Text className='text-[12px]'>
                        June 6, 2023
                    </Text>
                </Modal.Header>
                <Modal.Body className='mt-[50px]'>
                    <Text className='added mb-0'>
                        Statistics Tab
                    </Text>
                    <Text className='text-[13px] mb-2'>
                        See a breakdown of how HYS has improved your experience on YouTube
                    </Text>

                    <Text className='added mb-0'>
                        Play As Regular Video
                    </Text>
                    <Text className='text-[13px] mb-2'>
                        Added the option to automatically play Shorts videos in a regular video page. Enable/disable it in the Misc tab
                    </Text>

                    <Text className='changed mb-0'>
                        New UI
                    </Text>
                    <Text className='text-[13px] mb-2'>
                        Updated the UI to be a little more elegant and reponsive
                    </Text>

                    <Text className='changed mb-0'>
                        Notification Menu
                    </Text>
                    <Text className='text-[13px] mb-2'>
                        Fixed an issue where enabling the option to hide Shorts in the notifcation menu would remove the entire menu
                    </Text>
                </Modal.Body>
                <Modal.Footer>
                    <Button flat color="none" className='w-full' onPress={closeHandler}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    );
};

export default ModalDisplay;