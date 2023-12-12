import { z } from 'zod';

export const verifyOtpRequestValidator = z
    .object({
        email: z.string().email().nonempty(),
        otp: z.string().nonempty().length(6),
    })
    .strict();

