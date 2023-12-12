import { AiOutlineDollar } from 'react-icons/ai';
import { BsCreditCard2Front } from 'react-icons/bs';
import { AiOutlineSafety } from 'react-icons/ai';
import { SlPeople } from 'react-icons/sl';
import { MdInstallMobile } from 'react-icons/md';
import { CiDeliveryTruck } from 'react-icons/ci';

const menuLinks = [
    { name: 'Home', url: '/' },
    { name: 'Female', url: '/female' },
    { name: 'Kids', url: '/kids' },
    { name: 'All Products', url: '/products' },
];

const footerProductMenu = [
    {
        icon: <AiOutlineDollar className="text-2xl" />,
        title: 'Great value',
        description: 'We offer competitive prices on over 100 million items.',
    },
    {
        icon: <CiDeliveryTruck className="text-2xl" />,
        title: 'Worldwide shopping',
        description: 'We ship to over 200 countries and regions, and our site comes in 12 languages.',
    },
    {
        icon: <BsCreditCard2Front className="text-2xl" />,
        title: 'Safe payment',
        description: 'Pay with the world’s most popular and secure payment methods.',
    },
    {
        icon: <AiOutlineSafety className="text-2xl" />,
        title: 'Shop with confidence',
        description: 'Our Buyer Protection policy covers your entire purchase journey.',
    },
    {
        icon: <SlPeople className="text-2xl" />,
        title: 'Help center',
        description: 'Round-the-clock assistance for a smooth shopping experience.',
    },
    {
        icon: <MdInstallMobile className="text-2xl" />,
        title: 'Shop better',
        description: 'Download the app for mobile-only features such as image search and discount games.',
    },
];

const footerCompanyLinks = [
    { name: 'About', url: '/' },
    { name: 'Terms of Use', url: '/' },
    { name: 'Privacy Policy', url: '/' },
    { name: 'How it Works', url: '/' },
    { name: 'Contact Us', url: '/' },
];

const footerSupportLinks = [
    { name: 'Support Career', url: '/' },
    { name: '24h Service', url: '/' },
    { name: 'Quick Chat', url: '/' },
];

const footerContactLinks = [
    { name: 'WhatsApp', url: '/' },
    { name: 'Support 24h', url: '/' },
];

const itemSize = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '4XL', '5XL'];

// const itemColor = ['#d81e5b', '#4c7782', '#cdff0a', '#622774', '#131d20', '#facf5e'];
const itemColor = [
    {
        color: '#d81e5b',
        name: 'Red',
    },
    {
        color: '#4c7782',
        name: 'Blue',
    },
    {
        color: '#cdff0a',
        name: 'Green',
    },
    {
        color: '#622774',
        name: 'Pink',
    },
    {
        color: '#131d20',
        name: 'Black',
    },
    {
        color: '#facf5e',
        name: 'Yellow',
    },
];

const getBaseUrl = () => 'http://localhost:3000';

export { menuLinks, footerProductMenu, footerCompanyLinks, footerSupportLinks, footerContactLinks, itemSize, itemColor, getBaseUrl };

