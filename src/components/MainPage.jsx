import React from 'react';

const MainPage = ({ children }) => {
    return (
        <div className="flex flex-col max-h-[518px] max-w-[450px] overflow-scroll p-4 pt-0">
            {children}
        </div>
    );
};

export default MainPage;