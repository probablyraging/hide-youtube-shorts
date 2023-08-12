import React, { useState } from 'react';
import { Text, Input, Button, Divider } from '@nextui-org/react';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { activatePremium } from '../constants/popup';
import { useNavigate } from 'react-router-dom';

const Premium = ({ darkMode }) => {
    const [inputValue, setInputValue] = useState('');
    const [statusSuccess, setStatusSuccess] = useState(false);
    const [statusError, setStatusError] = useState(false);
    const [statusMessage, setStatusMessage] = useState('Enter the email address you used during checkout');
    const navigate = useNavigate();

    async function initActivation() {
        const premiumData = await activatePremium(inputValue);
        if (premiumData.message) {
            setStatusSuccess(true);
            setStatusMessage('Pro subscription activated!');
            navigate('/premiumactive');
        } else {
            setStatusError(true);
            setStatusMessage(premiumData.error);
        }
        setInputValue('');
    }

    const handleClick = (action) => {
        if (action === 'monthly') window.open('https://buy.stripe.com/4gw8yX5m47iv4009AB');
        if (action === 'yearly') window.open('https://buy.stripe.com/dR62azdSA9qD544002');
    };

    const buttonColor = !inputValue.length ?
        darkMode ? 'bg-[#3d3f41]' : 'bg-[#bbbbbb]' :
        darkMode ? `bg-[#5086c3] hover:bg-[#4175b0]` : 'bg-[#3694ff] hover:bg-[#2c85e9]';

    return (
        <div className='flex flex-col justify-center items-center text-center w-full'>
            <div className='mt-8'>
                <Text className={`text-[16px] font-semibold ${darkMode ? 'text-textAltDark' : 'text-textAlt'}`}>
                    Activate Pro Subscription
                </Text>

                <div className='flex gap-2'>
                    <Input
                        className='h-[32px] w-[280px]'
                        labelLeft={<AlternateEmailIcon className={`w-[16px] ${darkMode ? 'text-[#d2d2d2]' : 'text-[#262626]'}`} />}
                        placeholder="email@example.com"
                        aria-label='email'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)} />
                    <Button
                        auto
                        disabled={!inputValue.length}
                        onPress={initActivation}
                        className={`h-[32px] ${buttonColor}`}>
                        <Text className='flex justify-center items-center text-[18px] text-[#f8f8f8] font-semibold'>
                            <i class="bi bi-check2"></i>
                        </Text>
                    </Button>
                </div>
            </div>

            {statusSuccess ? (
                <Text className={`text-[12px] text-[#74cf74] mt-1 mb-8`}>
                    {statusMessage}
                </Text>
            ) : statusError ? (
                <Text className={`text-[12px] text-[#df3b3b] mt-1 mb-8`}>
                    {statusMessage}
                </Text>
            ) : (
                <Text className={`text-[12px] mt-1 mb-8`}>
                    {statusMessage}
                </Text>
            )}

            <Divider className="mb-8" />

            <div>
                <Text className={`text-[16px] font-semibold ${darkMode ? 'text-textAltDark' : 'text-textAlt'}`}>
                    Buy Pro Subscription
                </Text>

                <div className={`flex items-center flex-col w-[300px] h-[200px] p-3 ${darkMode ? 'bg-[#16181a]' : 'bg-[#f1f3f5]'} rounded-lg mb-3`}>
                    <Text className={`${darkMode ? 'text-textAltDark' : 'text-textAlt'}`}>
                        Hide YouTube Shorts - Monthly
                    </Text>

                    <div className='flex mb-1'>
                        <Text className='text-[28px] text-[#3694ff] font-semibold'>
                            $8
                        </Text>
                        <div className='flex flex-col items-start mt-1 ml-1'>
                            <Text className='text-[14px]'>
                                per
                            </Text>
                            <Text className='text-[14px] leading-[0]'>
                                month
                            </Text>
                        </div>
                    </div>

                    <Button className='w-[100%] mb-4' onPress={() => handleClick('monthly')}>
                        Get Pro Monthly
                    </Button>

                    <Text className={`text-[12px] ${darkMode ? "text-textAltDark" : "text-textAlt"}`}>
                        Supported payment methods:
                    </Text>

                    <div className='flex gap-1'>
                        <img src="https://js.stripe.com/v3/fingerprinted/img/google_pay-ca6cc2f4ee364c7966f8fabf064849fe.svg" alt="" />
                        <img src="https://js.stripe.com/v3/fingerprinted/img/visa-fb36094822f73d7bc581f6c0bad1c201.svg" alt="" />
                        <img src="https://js.stripe.com/v3/fingerprinted/img/mastercard-86e9a2b929496a34918767093c470935.svg" alt="" />
                        <img src="https://js.stripe.com/v3/fingerprinted/img/amex-b933c9009eeaf8cfd07e789c549b8c57.svg" alt="" />
                    </div>
                </div>

                <div className={`flex items-center flex-col w-[300px] h-[200px] p-3 ${darkMode ? 'bg-[#16181a]' : 'bg-[#f1f3f5]'} rounded-lg mb-3`}>
                    <Text className={`${darkMode ? 'text-textAltDark' : 'text-textAlt'}`}>
                        Hide YouTube Shorts - Yearly
                    </Text>

                    <div className='flex mb-1'>
                        <Text className='text-[28px] text-[#3694ff] font-semibold'>
                            $70
                        </Text>
                        <div className='flex flex-col items-start mt-1 ml-1'>
                            <Text className='text-[14px]'>
                                per
                            </Text>
                            <Text className='text-[14px] leading-[0]'>
                                year
                            </Text>
                        </div>
                    </div>

                    <Button className='w-[100%] mb-4' onPress={() => handleClick('yearly')}>
                        Get Pro Yearly
                    </Button>

                    <Text className={`text-[12px] ${darkMode ? "text-textAltDark" : "text-textAlt"}`}>
                        Supported payment methods:
                    </Text>

                    <div className='flex gap-1'>
                        <img src="https://js.stripe.com/v3/fingerprinted/img/google_pay-ca6cc2f4ee364c7966f8fabf064849fe.svg" alt="" />
                        <img src="https://js.stripe.com/v3/fingerprinted/img/visa-fb36094822f73d7bc581f6c0bad1c201.svg" alt="" />
                        <img src="https://js.stripe.com/v3/fingerprinted/img/mastercard-86e9a2b929496a34918767093c470935.svg" alt="" />
                        <img src="https://js.stripe.com/v3/fingerprinted/img/amex-b933c9009eeaf8cfd07e789c549b8c57.svg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Premium;