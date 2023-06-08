import React from 'react';

const Badge = ({ darkMode, content }) => {
    return (
        <div className={`flex justify-center items-center px-[4px] py-0 ${darkMode ? 'bg-[#5086c3]' : 'bg-[#3694ff]'} rounded-full h-[16px] select-none`}>
            <span className='text-white text-[10px] font-semibold leading-[0]'>{content}</span>
        </div>
    )
}

export default Badge;