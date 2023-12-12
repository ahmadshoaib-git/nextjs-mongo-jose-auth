import React from 'react';
import Image from 'next/image';
import { Logo } from '@/components/ui';
import VerifyOtpForm from '@/components/layout/VerifyOtpForm';
import { verifyJWT, getCookies, decodeJWT } from '@/utils/helpers';
import { redirect } from 'next/navigation';

interface IDecodedToken {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    iat: number;
    exp: number;
}

const VerifyOtp = () => {
    const token = getCookies().get('temporary-token');
    let decodedData: IDecodedToken | any;
    if (token) {
        decodedData = decodeJWT(token.value);
    } else {
        redirect('/login');
    }
    return (
        <main className="h-[100vh] w-full flex flex-col">
            <section className="grid grid-cols-2 h-full w-full">
                <div className="relative break-words w-full h-full border-none outline-none overflow-hidden bg-darkBlue flex justify-center items-center">
                    <Image src={'/img3.jpg'} fill alt="Metaverse" className={'!static !h-full !w-full'} />
                </div>
                <div className="break-words h-full flex flex-col justify-center items-center gap-[2rem]">
                    <Logo background="light" />
                    <h3 className="text-lg text-center"> Welcome {`${decodedData?.username}`}</h3>
                    <div className="h-auto w-full max-w-[40rem]">
                        <VerifyOtpForm email={decodedData?.email} token={token?.value} />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default VerifyOtp;

