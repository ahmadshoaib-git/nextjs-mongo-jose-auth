import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import OTPGenerator from 'otp-generator';
import { userValidator } from './register.validation';
import { UserService } from '@/services/server/user';
import { EmailService } from '@/services/Email';

export async function POST(request: NextRequest) {
    try {
        const { username, email, password } = await request.json();
        const isValid = userValidator.safeParse({ username, email, password });
        if (!isValid.success) return NextResponse.json({ error: isValid.error.issues[0].message }, { status: 400 });
        const existingUserData = await UserService.getUser(email);
        console.log(existingUserData);
        if (existingUserData?.length > 0) return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        const otp = OTPGenerator.generate(6, { specialChars: false });
        EmailService.SendMail(email, 'Verification Code - O DINE MARKET', otp);
        const salt = await bcrypt.genSalt(10); //genSalt will create a salt with the 10 rounds - Salt is a cryptographically secure random string that is added to a password before it's hashed,
        const hashPassword = await bcrypt.hash(password, salt); //it created a hash password. It requires 2 parameters 1. password from req body and 2. salt that we created
        const userData = await UserService.createUser({
            username,
            email,
            password: hashPassword,
            verified: false,
            otp,
        });
        console.log(userData);
        const jwtToken = await UserService.getTemporaryToken(userData?.id, username, email);
        console.log('jwtToken >', jwtToken);
        if (!jwtToken) return NextResponse.json({ error: 'Unable to generate temporary access token' }, { status: 500 });
        const response = NextResponse.json({ success: true }, { status: 200 });
        response.cookies.set({
            name: 'temporary-token',
            value: `${jwtToken}`,
            httpOnly: false,
            maxAge: 60 * 60 * 24 * 1,
        });
        return response;
    } catch (error) {
        // Exception Handling
        return NextResponse.json(
            {
                message: error,
            },
            { status: 500 },
        );
    }
}

