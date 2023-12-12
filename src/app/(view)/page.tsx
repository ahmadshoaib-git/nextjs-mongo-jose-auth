import { getCookies } from '@/utils/helpers';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default function Home() {
    // const token = getCookies().get('access_token');
    // if (!token) {
    //     redirect('/login');
    // }
    return <main className="h-auto w-full flex flex-col gap-[2rem] justify-center items-center">Welcome! You are logged in !</main>;
}

