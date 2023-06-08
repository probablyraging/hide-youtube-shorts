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
                        What's New In 1.6.6
                    </Text>
                    <Text className='text-[12px]'>
                        June 8, 2023
                    </Text>
                </Modal.Header>
                <Modal.Body className='mt-[50px]'>
                    <Text className='added mb-4'>
                        Lives & Premieres
                    </Text>
                    <Text className='text-[13px] mb-2'>
                        Added the option to hide Live and Premiere videos in the Home and Subscriptions feeds. This feature currently only works on the <a href='https://i.imgur.com/j6i2yB4.png' target='_blank'>new YouTube UI</a>.
                        <br></br><br></br>
                        Enabled/disable it in the Feed Pages tab
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