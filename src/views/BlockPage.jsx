import React, { useState, useEffect } from 'react';
import { Text, Input, Button, Table, styled } from '@nextui-org/react';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { InfoTooltip, Badge } from '../components';
import { getBlockList, updateBlockList } from '../constants/popup';

const BlockPage = ({ darkMode }) => {
    const [blockListData, setBlockListData] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const blockList = await getBlockList();
                setBlockListData(blockList);
            } catch (error) {
                console.error('Error fetching switch data:', error);
            }
        };

        fetchData();
    }, []);

    const updateBlockListData = async (value, action) => {
        await updateBlockList(value, action);
        const updatedBlockList = await getBlockList();
        setBlockListData(updatedBlockList);
    };

    function blockListAdd() {
        if (/^\s*$/.test(inputValue)) return;
        updateBlockListData(inputValue, 'add');
        setInputValue('');
    }

    function blockListRemove(item) {
        updateBlockListData(item, 'remove');
    }

    function blockListClear() {
        updateBlockListData('', 'clear');
    }

    const IconButton = styled('button', {
        dflex: 'center',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        padding: '0',
        margin: '0',
        bg: 'transparent',
        transition: '$default',
        '&:hover': {
            opacity: '0.8'
        },
        '&:active': {
            opacity: '0.6'
        }
    });

    return (
        <div className='flex flex-col justify-center items-center w-full h-full'>
            <div className='flex flex-col w-full mt-4'>

                <div className={`switch-container flex flex-col justify-between pl-4 pr-4 py-4 ${darkMode ? 'border-[#2d2d2d]' : 'border-[#d5d5d5]'}`}>
                    <Text className='flex items-center gap-1 text-[14px] font-medium'>Block Channels <InfoTooltip content='Channel handles are case sensitive' /> <Badge content='NEW' /></Text>
                    <Text className={`text-[12px] ${darkMode ? 'text-textAltDark' : 'text-textAlt'} pr-5 mb-2`}>{chrome.i18n.getMessage('blockChannelsDesc')}</Text>
                    <div className='flex flex-row gap-2 mb-4'>
                        <Input
                            clearable
                            className='h-[32px] w-[300px]'
                            labelLeft={<AlternateEmailIcon className={`w-[16px] ${darkMode ? 'text-[#d2d2d2]' : 'text-[#262626]'}`} />}
                            placeholder="MrBeast"
                            aria-label='channel name'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)} />
                        <Button
                            auto
                            className='h-[32px]'
                            onPress={blockListAdd}>
                            Add
                        </Button>
                    </div>

                    {blockListData.length > 0 && (
                        <>
                            <Table
                                css={{ backgroundColor: darkMode ? '#1f2125' : '' }}
                                aria-label="block list data">
                                <Table.Header>
                                    <Table.Column>Blocked Channel</Table.Column>
                                    <Table.Column>Action</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {blockListData.map((item, index) => (
                                        <Table.Row key={index}>
                                            <Table.Cell>{item}</Table.Cell>
                                            <Table.Cell>
                                                <IconButton onClick={() => blockListRemove(item)}>
                                                    <DeleteOutlineIcon className="text-[#FF0080] ml-2" />
                                                </IconButton>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>

                            <Button
                                auto
                                className='h-[32px] mt-6'
                                color='error'
                                onPress={blockListClear}>
                                Clear Block List
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
};

export default BlockPage;