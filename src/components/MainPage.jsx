import React from 'react';

const MainPage = ({ children }) => {
    return (
        <div className="flex flex-col max-h-[396px] max-w-[400px] overflow-scroll p-4 pt-0 pb-8">
            {children}
        </div>
    );
};

export default MainPage;