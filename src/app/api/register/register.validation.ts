import { z } from 'zod';

export const userValidator = z
    .object({
        username: z.string().nonempty(),
        email: z.string().email().nonempty(),
        password: z.string().nonempty(),
    })
    .strict();

