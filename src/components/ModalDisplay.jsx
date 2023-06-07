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
                        What's New In 1.6.2
                    </Text>
                    <Text className='text-[12px]'>
                        June 6, 2023
                    </Text>
                </Modal.Header>
                <Modal.Body className='mt-[50px]'>
                    <Text className='added mb-4'>
                        Fill Empty Space
                    </Text>
                    <Text className='text-[13px] mb-2'>
                        With the new UI on the Subscriptions page we can no longer fill the empty space left behind when removing Shorts elements
                        <br></br>
                        <br></br>
                        I have added an option to fill the empty space with a placeholder image instead. See <a href='https://i.imgur.com/5QN2trt.png' target='_blank' rel='noopener noreferrer'>this example</a>
                        <br></br>
                        <br></br>
                        Enable/disable it in the Misc tab
                    </Text>

                    <Text className='changed mb-4'>
                        Old UI: All Videos Being Hidden
                    </Text>
                    <Text className='text-[13px] mb-2'>
                        Fixed an issue with the old UI on the Subscriptions page where all videos were being hidden
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