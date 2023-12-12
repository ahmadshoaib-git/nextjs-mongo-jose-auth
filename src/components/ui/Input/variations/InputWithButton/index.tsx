import React, { HTMLProps } from 'react';
import { GrSearch } from 'react-icons/gr';

const SearchInput: React.FC<HTMLProps<HTMLInputElement>> = (props) => {
    return (
        <div className="relative px-4 py-[0.1rem] border border-2 bg-[#F5F5F5] border-smoke flex gap-[0.5rem] items-center rounded-full h-[2.2rem]">
            <button className="absolute right-0 h-full max-w-[8rem] w-full bg-darkBlue outline-none border-none">{props.name}</button>
            <input className="bg-[#F5F5F5] placeholder-darkBlue text-black min-w-[15rem] h-full border-none outline-none text-xs" {...props} />
        </div>
    );
};

export default SearchInput;

