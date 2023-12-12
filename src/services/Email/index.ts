import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_ID,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
    },
});

let mailOptions = (to: string, subject: string, otp: string) => {
    return {
        from: process.env.NEXT_PUBLIC_EMAIL_ID,
        to: to,
        subject: subject,
        text: `Your OTP from O DINE MARKET for account verification is [${otp}]. OTP Code will remain valid till 24 hours.`,
    };
};

export class EmailService {
    static async SendMail(to: string, subject: string, otp: string) {
        try {
            transporter.sendMail(mailOptions(to, subject, otp), function (error, info) {
                if (error) throw error;
                else console.log('Email sent: ' + info.response);
            });
        } catch (error) {
            console.error('Unable to Send Email: ', error);
            throw error;
        }
    }
}

