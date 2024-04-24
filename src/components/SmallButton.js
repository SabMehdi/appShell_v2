import React from 'react';

const SmallButton = ({ label, onClick }) => {
    return (
        <button onClick={onClick} className="px-10 py-2 bg-blue-500 text-white rounded">
            {label}
        </button>
    );
};

export default SmallButton;