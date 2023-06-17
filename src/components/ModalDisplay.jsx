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
                className='max-h-[440px]'
            >
                <Modal.Header className='absolute flex flex-col items-start top-0'>
                    <Text className='font-semibold' size={16}>
                        What's New In 1.6.13
                    </Text>
                    <Text className='text-[12px]'>
                        June 17, 2023
                    </Text>
                </Modal.Header>
                <Modal.Body className='mt-[50px]'>
                    <Text className='added mb-4'>
                        Increased Performance
                    </Text>
                    <Text className='text-[13px] mb-2'>
                        I have changed the way the extension hides videos, opting to use stylesheets over javascript logic, this should result in;
                        <ul>
                            <li>
                                Significantly less system resource usage
                            </li>
                            <li>
                                Videos and other elements being hidden long before the page finishes loading
                            </li>
                            <li>
                                The ability to toggle options on/off and see the changes in real time, without needing to refresh the page
                            </li>
                            <li>
                                A much nicer user experience overall 🙂
                            </li>
                        </ul>
                        If you have any issues at all, please feel free to join the Discord support server by <a href="https://discord.gg/HAFP4P7Dfr" target="_blank">clicking here</a>
                    </Text>

                    <Text className='removed mb-4'>
                        Statistics Tab
                    </Text>
                    <Text className='text-[13px] mb-2'>
                        I decided to remove the statistics tab as it will no longer work with the changes mentioned above
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