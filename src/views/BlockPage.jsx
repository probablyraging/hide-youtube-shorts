import React, { useState, useEffect } from 'react';
import { Text, Input, Button, Table, styled } from '@nextui-org/react';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import { Badge } from '../components';
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

    const buttonColor = !inputValue.length ?
        darkMode ? 'bg-[#3d3f41]' : 'bg-[#bbbbbb]' :
        darkMode ? `bg-[#5086c3] hover:bg-[#4175b0]` : 'bg-[#3694ff] hover:bg-[#2c85e9]';

    return (
        <div className='flex flex-col justify-center items-center w-full h-full'>
            <div className='flex flex-col w-full mt-4'>

                <div className={`switch-container flex flex-col justify-between pl-4 pr-4 py-4 ${darkMode ? 'border-[#2d2d2d]' : 'border-[#d5d5d5]'}`}>
                    <div className='flex items-center gap-1'>
                        <Text className='text-[14px] font-medium'>Block Channels</Text>
                        <Badge content='NEW' />
                    </div>

                    <Text className={`text-[12px] ${darkMode ? 'text-textAltDark' : 'text-textAlt'} pr-5 mb-8`}>{chrome.i18n.getMessage('blockChannelsDesc')}</Text>
                    <div className='flex flex-row gap-2 mb-8'>
                        <Input
                            clearable
                            className='h-[32px] w-[315px]'
                            labelLeft={<AlternateEmailIcon className={`w-[16px] ${darkMode ? 'text-[#d2d2d2]' : 'text-[#262626]'}`} />}
                            placeholder="MrBeast"
                            aria-label='channel name'
                            helperText={chrome.i18n.getMessage('blockInputHelper')}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)} />
                        <Button
                            auto
                            disabled={!inputValue.length}
                            className={`h-[32px] ${buttonColor}`}
                            onPress={blockListAdd}>
                            <Text className='flex justify-center items-center text-[20px] text-[#f8f8f8] font-semibold'>
                                <PersonOffOutlinedIcon />
                            </Text>
                        </Button>
                    </div>

                    {blockListData.length > 0 ? (
                        <>
                            <Table
                                css={{ backgroundColor: darkMode ? '#1f2125' : '' }}
                                aria-label="block list data">
                                <Table.Header>
                                    <Table.Column>Blocklist</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {blockListData.map((item, index) => (
                                        <Table.Row key={index}>
                                            <Table.Cell>
                                                <div className='flex'>
                                                    <div className='w-full'>
                                                        <Text className='text-[12px]'>
                                                            {item.length <= 30 ? (
                                                                item
                                                            ) : (
                                                                item.slice(0, 32) + '..'
                                                            )}
                                                        </Text>
                                                    </div>
                                                    <IconButton onClick={() => blockListRemove(item)}>
                                                        <i className={`bi bi-trash text-[18px] ml-2 ${darkMode ? 'text-[#b23c65] hover:text-[#912c50]' : 'text-[#F31260] hover:text-[#be0848]'}`}></i>
                                                    </IconButton>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>

                            <Button
                                auto
                                className={`h-[32px] mt-6 ${darkMode ? 'bg-[#b23c65] hover:bg-[#912c50]' : 'bg-[#F31260] hover:bg-[#be0848]'}`}
                                color='error'
                                onPress={blockListClear}>
                                {chrome.i18n.getMessage('removeAllBlocks')}
                            </Button>
                        </>
                    ) : (
                        <Table
                            css={{ backgroundColor: darkMode ? '#1f2125' : '' }}
                            aria-label="block list data">
                            <Table.Header>
                                <Table.Column>Blocklist</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row key='1'>
                                    <Table.Cell>
                                        <Text className='text-[12px]'>
                                            {chrome.i18n.getMessage('emptyBlocklist')}
                                        </Text>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    )}
                </div>
            </div>
        </div >
    )
};

export default BlockPage;