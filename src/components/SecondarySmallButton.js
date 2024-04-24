import React from 'react';

const SecondarySmallButton = ({ label, onClick }) => {
    return (
        <button onClick={onClick} className="w-36 h-7.5 bg-keiken-blue text-white font-roboto text-base leading-[18.75px] opacity-0 rounded-none">
            {label}
        </button>
    );
};

export default SecondarySmallButton;