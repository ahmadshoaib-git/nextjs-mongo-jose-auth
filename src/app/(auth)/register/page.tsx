import React from 'react';
import Image from 'next/image';
import { SignUpForm } from '@/components/layout';
import { Logo } from '@/components/ui';
import { getCookies } from '@/utils/helpers';
import { redirect } from 'next/navigation';

const Register = () => {
    return (
        <main className="h-[100vh] w-full flex flex-col">
            <section className="grid grid-cols-2 h-full w-full">
                <div className="relative break-words w-full h-full border-none outline-none overflow-hidden bg-darkBlue flex justify-center items-center">
                    <Image src={'/img3.jpg'} fill alt="Metaverse" className={'!static !h-full !w-full'} />
                </div>
                <div className="break-words h-full flex flex-col justify-center items-center gap-[2rem]">
                    <Logo background="light" />
                    <div className="h-auto w-full max-w-[40rem]">
                        <SignUpForm />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Register;

