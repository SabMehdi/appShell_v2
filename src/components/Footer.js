import React from 'react';

const Footer = ({ text }) => {
    return (
        <footer className="fixed bottom-0 left-0 w-full text-center">
            {text}
        </footer>
    );
};

export default Footer;