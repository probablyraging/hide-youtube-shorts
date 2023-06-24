// ModalDisplay.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Text, Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';
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
                className='max-h-[440px]'
            >
                <Modal.Header className='absolute flex flex-col items-start top-0'>
                    <Text className='font-semibold' size={16}>
                        What's New In 1.6.15
                    </Text>
                    <Text className='text-[12px]'>
                        June 25, 2023
                    </Text>
                </Modal.Header>
                <Modal.Body className='mt-[50px]'>
                    <Text className='added mb-4'>
                        Major Update
                    </Text>
                    <Text className='text-[13px] mb-2'>
                        This update contains a lot of different additions and changes
                        <br></br>
                        <br></br>
                        Please <a href="https://github.com/ProbablyRaging/hide-youtube-shorts/releases/tag/1.6.15" target='_blank'>click here</a> for a full change log
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