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
                        What's New In 1.6.15.4
                    </Text>
                    <Text className='text-[12px]'>
                        Aug 14, 2023
                    </Text>
                </Modal.Header>
                <Modal.Body className='mt-[50px]'>
                    <Text className='added mb-4'>
                        Fixed Pro Prices
                    </Text>
                    <Text className='text-[13px] mb-2'>
                        Fixed the prices on the 'Get Pro' screen which were showing incorrectly, but were shown correctly on the checkout screen
                        <br></br><br></br>
                        HYS Monthly - <strong>$2.50</strong> p/mo
                        <br></br>
                        HYS Yearly - <strong>$25.00</strong> p/yr
                        <br></br><br></br>
                        Use code <strong>'HYSSAVE30'</strong> at checkout to save <strong>30% off</strong> your first month/year
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