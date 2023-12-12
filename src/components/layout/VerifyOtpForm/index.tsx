'use client';
import React from 'react';
import OtpInput from 'react18-input-otp';
import { UserClientService } from '@/services/client/user';
import { useRouter } from 'next/navigation';
import { BiRefresh } from 'react-icons/bi';
import toast from 'react-hot-toast';

interface Props {
    email: string;
    token: string;
}

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    password: string;
    confirmPassword: string;
};

function VerifyOtpForm({ email, token }: Props) {
    const [otp, setOtp] = React.useState('');
    const [verifyOtpLoading, setVerifyOtpLoading] = React.useState<boolean>(false);
    const [redirectLoginLoading, setRedirectLoginLoading] = React.useState<boolean>(false);
    const { replace } = useRouter();
    const handleChange = (enteredOtp: string) => {
        setOtp(enteredOtp);
    };
    const handleSubmit = async () => {
        try {
            if (verifyOtpLoading || redirectLoginLoading) return;
            setVerifyOtpLoading(true);
            if (!token || !otp) return;
            const res = await UserClientService.verifyUser(token, otp);
            console.log(res);
            if (res.statusText === 'OK') {
                toast.success(`User verified and logged in successfully!`);
                replace('/');
            }
        } catch (err) {
            console.log(err);
        } finally {
            setVerifyOtpLoading(false);
        }
    };

    const handleMoveToLogin = async () => {
        debugger;
        try {
            if (verifyOtpLoading || redirectLoginLoading) return;
            setRedirectLoginLoading(true);
            if (!token) return;
            await UserClientService.verifyUserLogout(token);
            replace('/Login');
        } catch (err) {
            console.log(err);
        } finally {
            setRedirectLoginLoading(false);
        }
    };

    const inputContainerStyles = 'px-4 py-[0.1rem] border border-2 !bg-[#F5F5F5] border-smoke flex gap-[0.5rem] items-center rounded-md !h-[3rem] !w-[3rem]';
    const inputActiveStyles = '!outline-0 !border-cartRed';
    console.log(redirectLoginLoading);
    return (
        <div className="p-[3rem] h-full w-full">
            {/***** First Name *****/}
            {/***** Button *****/}
            <div className="flex flex-col gap-[1rem] items-center">
                <p className="text-md text-center">Please insert otp sent on your email: {email}</p>
                <OtpInput
                    value={otp}
                    onChange={handleChange}
                    inputStyle={inputContainerStyles}
                    focusStyle={inputActiveStyles}
                    numInputs={6}
                    separator={<span className="px-[0.5rem] text-lg">-</span>}
                />
                <button
                    type="submit"
                    disabled={otp.length < 6}
                    onClick={handleSubmit}
                    className={`flex items-center justify-center w-full h-[3rem] mt-[1rem] font-medium rounded-full ${
                        otp.length < 6 ? '!bg-smoke !text-darkGrey' : 'red-gradient text-white'
                    }`}
                >
                    <span className="mr-[0.25rem]">Submit</span>
                    <span className="text-white">{verifyOtpLoading && <BiRefresh className="text-2xl rotate-circular" />}</span>
                </button>
                <div className="flex text-darkBlue text-sm">
                    Already have an account?{' '}
                    <div onClick={() => handleMoveToLogin()} className="flex items-center underline text-blue ml-[0.2rem] cursor-pointer">
                        <span>Login</span>{' '}
                        <span className="ml-[0.05rem] mr-[0.2rem]">{redirectLoginLoading && <BiRefresh className="text-md rotate-circular-sm" />}</span>
                    </div>{' '}
                    here.
                </div>
            </div>
        </div>
    );
}

export default VerifyOtpForm;

