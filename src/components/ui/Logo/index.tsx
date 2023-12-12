import React from 'react';

interface Props {
    background: 'dark' | 'light';
}

const Logo = ({ background = 'light' }: Props) => {
    return (
        <div className={`text-lg font-bold ${background === 'light' ? 'text-darkBlue' : 'text-white'} uppercase flex justify-center items-center italic`}>
            <span className="bg-cartRed  pl-[0.3rem] pr-[0.5rem] py-[0.2rem] text-white mr-[0.2rem]">O Dine</span>Market
        </div>
    );
};

export default Logo;

