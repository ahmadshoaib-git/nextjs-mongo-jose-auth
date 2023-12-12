import '../globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'O Dine Market',
    description: 'Clothing brand market place.',
    icons: {
        icon: {
            url: '/logo.png',
            type: 'image/png',
        },
        shortcut: { url: '/logo.png', type: 'image/png' },
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <>
                    <Toaster />
                    {children}
                </>
            </body>
        </html>
    );
}

