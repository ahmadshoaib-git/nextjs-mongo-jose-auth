export interface IUser {
    username: string;
    email: string;
    password: string;
    verified?: boolean;
    otp?: string;
}

