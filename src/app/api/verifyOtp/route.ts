import { NextRequest, NextResponse } from 'next/server';
import { verifyOtpRequestValidator } from './verifyOtp.validation';
import { UserService } from '@/services/server/user';
import { signJWT, decodeJWT } from '@/utils/helpers';

export async function POST(request: NextRequest) {
    try {
        const { otp } = await request.json();
        const temporaryToken = request.cookies.get('temporary-token')?.value;
        if (!temporaryToken) return NextResponse.json({ error: 'Unable to authenticate' }, { status: 400 });
        const decodedTokenData = decodeJWT(temporaryToken);
        const email = decodedTokenData?.email as string;
        const isValid = verifyOtpRequestValidator.safeParse({ email, otp });
        console.log(isValid);
        if (!isValid.success) return NextResponse.json({ error: isValid.error.issues[0].message }, { status: 400 });
        let existingUserData = await UserService.getUser(email);
        console.log(existingUserData);
        if (existingUserData.length === 0) return NextResponse.json({ error: 'Unable to verify, user does not exists.' }, { status: 400 });
        if (existingUserData.otp !== otp) return NextResponse.json({ error: 'Unable to verify, invalid otp.' }, { status: 400 });
        existingUserData = await UserService.verifyUser(email);
        const accessToken = await signJWT(
            {
                id: existingUserData.id,
                email: existingUserData.email,
                username: existingUserData.username,
            },
            { exp: '24h' },
        );

        const response = NextResponse.json({ userData: existingUserData, redirect: '/' }, { status: 200 });
        response.cookies.set('temporary-token', '', { httpOnly: true, expires: new Date(0) });
        response.cookies.set({
            name: 'access_token',
            value: accessToken,
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 1,
        });
        return response;
    } catch (error) {
        // Exception Handling
        console.log(error);
        return NextResponse.json({
            message: error,
        });
    }
}

