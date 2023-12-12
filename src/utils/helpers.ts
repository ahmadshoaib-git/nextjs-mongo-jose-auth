import { SignJWT, decodeJwt, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export const getCookies = () => cookies();

export const signJWT = (payload: any, options: { exp: string }) => {
    try {
        const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);
        const alg = 'HS256';
        return new SignJWT(payload).setProtectedHeader({ alg }).setExpirationTime(options.exp).setIssuedAt().setSubject(payload.sub).sign(secret);
    } catch (error) {
        throw error;
    }
};

export const verifyJWT = async <T>(token: string): Promise<T> => {
    try {
        return (await jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET))).payload as T;
    } catch (error) {
        console.log(error);
        throw new Error('Your token has expired.');
    }
};

export const decodeJWT = (token: string) => {
    try {
        const jwt = decodeJwt(token);
        return jwt;
    } catch (error) {
        console.log(error);
        throw new Error('Your JWT is invalid');
    }
};

