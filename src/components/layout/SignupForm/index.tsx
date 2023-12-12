'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';
import Link from 'next/link';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { UserClientService } from '@/services/client/user';
import { useRouter } from 'next/navigation';
import { BiRefresh } from 'react-icons/bi';
import toast from 'react-hot-toast';
import axios from 'axios';

type FormData = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

function SignUpForm() {
    const [showPass, setShowPass] = React.useState<boolean>(true);
    const [showConfirmPass, setShowConfirmPass] = React.useState<boolean>(true);
    const [loader, setLoader] = React.useState<boolean>(false);
    const { replace } = useRouter();
    const schema: ZodType<FormData> = z
        .object({
            username: z.string().min(2).max(30),
            email: z.string().email(),
            password: z.string().min(5).max(20),
            confirmPassword: z.string().min(5).max(20),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: 'Passwords do not match',
            path: ['confirmPassword'],
        });

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const submitData = async (data: FormData) => {
        try {
            setLoader(true);
            const res = await UserClientService.registerUser({
                username: data.username,
                email: data.email,
                password: data?.password,
            });
            toast.success(`User registered successfully, please verify via OTP sent on your email ${data.email}`);
            replace('/verifyOtp');
        } catch (err) {
            toast.error(`Unable to register user.`);
            console.log(err);
        } finally {
            setLoader(false);
        }
    };

    const inputWrapper = (error: any) =>
        `relative px-4 py-[0.1rem] border border-2 !bg-[#F5F5F5] border-smoke flex gap-[0.5rem] items-center rounded-full h-[3rem] hover:border-darkGrey ${
            error && '!border-cartRed'
        }`;
    const inputStyles = '!bg-[#F5F5F5] placeholder-darkGrey text-black h-full w-full border-none outline-none text-sm';
    const errorText = '!text-cartRed text-sm ml-[1.1rem]';
    return (
        <div className="p-[3rem] h-full w-full">
            <form onSubmit={handleSubmit(submitData)} className="flex flex-col gap-[1rem]">
                {/***** First Name *****/}
                <div>
                    <div className={inputWrapper(errors.username)}>
                        <input placeholder="User name *" className={inputStyles} {...register('username')} />
                    </div>
                    {errors.username && <span className={errorText}> *{errors?.username?.message}</span>}
                </div>
                {/***** Email *****/}
                <div>
                    <div className={inputWrapper(errors.email)}>
                        <input placeholder="Email *" className={inputStyles} {...register('email')} />
                    </div>
                    {errors.email && <span className={errorText}> *{errors.email.message}</span>}
                </div>
                {/***** Password *****/}
                <div>
                    <div className={inputWrapper(errors.password)}>
                        <input placeholder="Password *" type={showPass ? 'password' : 'text'} className={inputStyles} {...register('password')} />
                        <div className="absolute right-[0.5rem] cursor-pointer" onClick={() => setShowPass(!showPass)}>
                            {showPass ? <AiFillEye className="text-xl" /> : <AiFillEyeInvisible className="text-xl" />}
                        </div>
                    </div>

                    {errors.password && <span className={errorText}> *{errors.password.message}</span>}
                </div>
                {/***** Confirm Password *****/}
                <div>
                    <div className={inputWrapper(errors.confirmPassword)}>
                        <input
                            placeholder="Confirm Password *"
                            type={showConfirmPass ? 'password' : 'text'}
                            className={inputStyles}
                            {...register('confirmPassword')}
                        />
                        <div className="absolute right-[0.5rem] cursor-pointer" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                            {showConfirmPass ? <AiFillEye className="text-xl" /> : <AiFillEyeInvisible className="text-xl" />}
                        </div>
                    </div>
                    {errors.confirmPassword && <span className={errorText}> *{errors.confirmPassword.message}</span>}
                </div>
                {/***** Button *****/}
                <div className="flex flex-col gap-[0.4rem] items-center">
                    <button
                        type="submit"
                        className="flex items-center justify-center w-full h-[3rem] mt-[1rem] font-medium rounded-full red-gradient text-white"
                    >
                        <span className="mr-[0.25rem]">Register</span>
                        <span className="text-white">{loader && <BiRefresh className="text-2xl rotate-circular" />}</span>
                    </button>
                    <p className="text-darkBlue text-sm">
                        Already have an account?{' '}
                        <Link href="/login" className="underline text-blue">
                            Login
                        </Link>{' '}
                        here.
                    </p>
                </div>
            </form>
        </div>
    );
}

export default SignUpForm;

