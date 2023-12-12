'use client';
import React from 'react';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';
import Link from 'next/link';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { UserClientService } from '@/services/client/user';
import { useRouter } from 'next/navigation';
import { BiRefresh } from 'react-icons/bi';

type FormData = {
    email: string;
    password: string;
};

function SignInForm() {
    const [showPass, setShowPass] = React.useState<boolean>(true);
    const [loader, setloader] = React.useState<boolean>(false);
    const schema: ZodType<FormData> = z.object({
        email: z.string().email(),
        password: z.string().min(5).max(20),
    });
    const { replace } = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const submitData = async (data: FormData) => {
        try {
            setloader(true);
            const res = await UserClientService.loginUser(data?.email, data?.password);
            console.log('IT WORKED', JSON.stringify(data));
            console.log(res.data);
            const response = res.data;
            if (response?.redirect) replace(response?.redirect);
        } catch (err) {
            console.log(err);
        } finally {
            setloader(false);
        }
    };

    const inputWrapper = (error: any) =>
        `relative px-4 py-[0.1rem] border border-2 !bg-[#F5F5F5] border-smoke flex gap-[0.5rem] items-center rounded-full h-[3rem] ${
            error && '!border-cartRed'
        }`;
    const inputStyles = '!bg-[#F5F5F5] placeholder-darkGrey text-black h-full w-full border-none outline-none text-sm';
    const errorText = 'text-cartRed text-sm ml-[1.1rem]';
    return (
        <div className="p-[3rem] h-full w-full">
            <form onSubmit={handleSubmit(submitData)} className="flex flex-col gap-[1rem]">
                <div>
                    <div className={inputWrapper(errors.email)}>
                        <input placeholder="Email *" className={inputStyles} {...register('email')} />
                    </div>
                    {errors.email && <span className={errorText}> *{errors.email.message}</span>}
                </div>

                <div>
                    <div className={inputWrapper(errors.password)}>
                        <input type={showPass ? 'password' : 'text'} placeholder="Password *" className={inputStyles} {...register('password')} />
                        <div className="absolute right-[0.5rem] cursor-pointer" onClick={() => setShowPass(!showPass)}>
                            {showPass ? <AiFillEye className="text-xl" /> : <AiFillEyeInvisible className="text-xl" />}
                        </div>
                    </div>
                    {errors.password && <span className={errorText}> *{errors.password.message}</span>}
                </div>
                <div className="flex flex-col gap-[0.4rem] items-center">
                    <button
                        type="submit"
                        className="flex items-center justify-center w-full h-[3rem] mt-[1rem] font-medium rounded-full red-gradient text-white"
                    >
                        <span className="mr-[0.25rem]">Sign In</span>
                        <span className="text-white">{loader && <BiRefresh className="text-2xl rotate-circular" />}</span>
                    </button>
                    <p className="text-darkBlue text-sm">
                        New Member?{' '}
                        <Link href="/register" className="underline text-blue">
                            Register
                        </Link>{' '}
                        here.
                    </p>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;

