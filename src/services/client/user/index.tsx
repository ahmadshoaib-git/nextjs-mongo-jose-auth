import { fetchWrapper } from '../../../utils/helpers';
import { getBaseUrl } from '@/utils';
import { IUser } from '@/services/server/user/user.interface';
import axios from 'axios';

export class UserClientService {
    static async registerUser(user: IUser) {
        try {
            return await axios.post('/api/register', user);
        } catch (error) {
            console.error('Error calling API:', error);
            throw error;
        }
    }
    static async loginUser(email: string, password: string) {
        try {
            return await axios.post(`${getBaseUrl()}/api/login`, {
                email: email,
                password: password,
            });
            // return fetch(`${getBaseUrl()}/api/login`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         email: email,
            //         password: password,
            //     }),
            // });
        } catch (error) {
            console.error('Error calling API:', error);
            throw error;
        }
    }
    static async verifyUser(token: string, otp: string) {
        try {
            return await axios.post(
                `${getBaseUrl()}/api/verifyOtp`,
                { otp: otp },
                {
                    headers: {
                        Authorization: token,
                    },
                },
            );
            // return fetch(`${getBaseUrl()}/api/verifyOtp`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         Authorization: token,
            //     },
            //     body: JSON.stringify({
            //         otp: otp,
            //     }),
            // });
        } catch (error) {
            console.error('Error calling API:', error);
            throw error;
        }
    }
    static async verifyUserLogout(token: string) {
        try {
            return await axios.post(`${getBaseUrl()}/api/verifyOtp/logout`, {
                headers: {
                    Authorization: token,
                },
            });
        } catch (error) {
            console.error('Error calling API:', error);
            throw error;
        }
    }
}

