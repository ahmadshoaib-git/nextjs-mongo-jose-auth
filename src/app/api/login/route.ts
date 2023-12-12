// import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { userValidator } from './login.validation';
import { UserService } from '@/services/server/user';
import bcrypt from 'bcrypt';
import OTPGenerator from 'otp-generator';
import { signJWT } from '@/utils/helpers';
import { EmailService } from '@/services/Email/index';

export async function POST(request: NextRequest) {
    try {
        console.log('================= LOGIN ===================');
        const { email, password } = await request.json();
        console.log(email, password);
        const isValid = userValidator.safeParse({ email, password });
        console.log(isValid);
        if (!isValid.success) return NextResponse.json({ error: isValid.error.issues[0].message }, { status: 400 });
        const existingUserData = await UserService.getUser(email);
        console.log(existingUserData);
        if (existingUserData.length === 0) return NextResponse.json({ error: 'Unable to verify, user does not exists.' }, { status: 400 });
        console.log(existingUserData);
        if (!existingUserData.verified) {
            console.log('user not verified');
            const otp = OTPGenerator.generate(6, { specialChars: false });
            EmailService.SendMail(email, 'Verification Code - O DINE MARKET', otp);
            const updatedData = await UserService.updateOtp(existingUserData.email, otp);
            console.log(updatedData);
            const jwtToken = await UserService.getTemporaryToken(existingUserData.id, existingUserData.username, email);
            if (!jwtToken) return NextResponse.json({ error: 'Unable to generate temporary access token' }, { status: 500 });
            const response = NextResponse.json({ redirect: '/verifyOtp' }, { status: 200 });
            response.cookies.set({
                name: 'temporary-token',
                value: `${jwtToken}`,
                httpOnly: false,
                maxAge: 60 * 60 * 24 * 1,
            });
            return response;
        }
        const isValidPassword = await bcrypt.compare(password, existingUserData.userPassword);
        if (!isValidPassword) return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        const accessToken = await signJWT(
            {
                id: existingUserData.id,
                email: existingUserData.email,
                firstName: existingUserData.firstName,
                lastName: existingUserData.lastName,
            },
            { exp: '24h' },
        );
        const response = NextResponse.json({ redirect: '/' }, { status: 200 });
        response.cookies.set({
            name: 'access_token',
            value: accessToken,
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 1,
        });
        return response;
    } catch (error) {
        // Exception Handling
        return NextResponse.json({
            message: error,
        });
    }
}

