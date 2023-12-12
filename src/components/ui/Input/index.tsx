import React, { HTMLProps } from 'react';

type Props = HTMLProps<HTMLInputElement> & { error?: boolean };

const Input: React.FC<Props> = (props) => {
    return (
        <div
            className={`relative px-4 py-[0.1rem] border border-2 bg-[#F5F5F5] border-smoke flex gap-[0.5rem] items-center rounded-full h-[3rem] ${
                props?.error && '!border-cartRed'
            }`}
        >
            <input className="bg-[#F5F5F5] placeholder-darkBlue text-black h-full border-none outline-none text-sm" {...props} />
        </div>
    );
};

export default Input;

