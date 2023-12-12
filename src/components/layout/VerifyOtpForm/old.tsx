'use client';
import React, { KeyboardEvent } from 'react';
import Link from 'next/link';

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    password: string;
    confirmPassword: string;
};

const newArray = new Array(6).fill('');

function SignUpForm() {
    const [currentIndex, setCurrentIndex] = React.useState<number>(0);
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        newArray[currentIndex] = event.target.value;
        if (currentIndex + 1 < 6) setCurrentIndex(currentIndex + 1);
        if (event.target.nextSibling) event.target.nextSibling?.focus();
    };
    const checkKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        const { code, currentTarget } = event;
        console.log(currentTarget, code);
        if (code === '8' && currentTarget.value === '') {
            if (currentIndex - 1 > -1) setCurrentIndex(currentIndex - 1);
        }
    };
    const inputStyles = '!bg-[#F5F5F5] placeholder-darkGrey text-black h-full w-full border-none outline-none text-sm';
    const inputWrapper = (selected: boolean) =>
        `relative px-4 py-[0.1rem] border border-2 !bg-[#F5F5F5] border-smoke flex gap-[0.5rem] items-center rounded-full h-[3rem] ${
            selected && '!border-darkBlue'
        }`;
    return (
        <div className="p-[3rem] h-full w-full">
            {/***** First Name *****/}
            {/***** Button *****/}
            <div className="flex flex-col gap-[0.4rem] items-center">
                <div className="flex gap-[0.2rem]">
                    {new Array(6).fill('-').map((_, index) => {
                        return (
                            <div className={inputWrapper(currentIndex === index)}>
                                <input
                                    key={index}
                                    className={inputStyles}
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete="one-time-code"
                                    maxLength={1}
                                    onFocus={(e) => e.target.select()}
                                    onChange={handleInput}
                                    onKeyDown={checkKeyPress}
                                    autoFocus={currentIndex === index}
                                />
                            </div>
                        );
                    })}
                </div>
                <button type="submit" className="w-full h-[3rem] red-gradient text-white font-medium rounded-full">
                    Submit
                </button>
            </div>
        </div>
    );
}

export default SignUpForm;

