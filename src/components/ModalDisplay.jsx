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
                        What's New In 1.6.11
                    </Text>
                    <Text className='text-[12px]'>
                        June 13, 2023
                    </Text>
                </Modal.Header>
                <Modal.Body className='mt-[50px]'>
                    <Text className='added mb-4'>
                        Support On Discord
                    </Text>
                    <Text className='text-[13px] mb-2'>
                        HYS now has a Discord server for support, suggestions, and feedback. You can join via the settings menu or by <a href="https://discord.gg/HAFP4P7Dfr" target='_blank'>clicking here</a>
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