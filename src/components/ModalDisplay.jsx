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
                        What's New In 1.6.15.3
                    </Text>
                    <Text className='text-[12px]'>
                        Aug 12, 2023
                    </Text>
                </Modal.Header>
                <Modal.Body className='mt-[50px]'>
                    <Text className='added mb-4'>
                        HYS Pro Features
                    </Text>
                    <Text className='text-[13px] mb-2'>
                        While the main features of HYS will always remain free, you may notice that some of the additional features are now gates by a 'pro' subscription. This is to help fund the development of HYS, so we can keep bringing you an awesome extension.
                        <br></br><br></br>
                        Use code 'HYSSAVE15' at checkout to save 15% off your first month.
                        <br></br><br></br>
                        Thank you for the continued support!
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