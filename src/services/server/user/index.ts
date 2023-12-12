import * as jose from 'jose';
import CryptoJS from 'crypto-js';
import bcrypt from 'bcrypt';
import { IUser } from './user.interface';
import User from './user.schema';
import DBService from '../config';
import { signJWT } from '@/utils/helpers';

export class UserService {
    static async createUser(user: IUser) {
        try {
            new DBService();
            const salt = await bcrypt.genSalt(10); //genSalt will create a salt with the 10 rounds - Salt is a cryptographically secure random string that is added to a password before it's hashed,
            const hashPassword = await bcrypt.hash(user.password, salt); //it created a hash password. It requires 2 parameters 1. password from req body and 2. salt that we created
            console.log('hashPassword is ==========', hashPassword);
            const newUser = new User({
                username: user.username,
                email: user.email,
                password: hashPassword,
                otp: user.otp,
                isVerified: false,
            });
            const savedUser = await newUser.save();
            return savedUser;
        } catch (error) {
            console.log('========================================= >>>>>> createUser ');
            console.error('Error executing mongoose query:', error);
            throw error;
        }
    }
    static async getUser(email: string) {
        try {
            new DBService();
            const tempUser = await User.findOne({ email: email }).exec();
            return tempUser;
        } catch (error) {
            console.log('========================================= >>>>>> getUser');
            console.error('Error executing mongoose query:', error);
            throw error;
        }
    }
    static async updateOtp(email: string, otp: string) {
        try {
            console.log({ email, otp });
            new DBService();
            const filter = { email: email };
            const update = { otp: otp };
            let doc = await User.findOne(filter);
            console.log(doc);
            doc.otp = otp;
            const res = await doc.save();
            // const tempUser = await User.updateOne(filter, update, {
            //     new: true,
            // });
            // const res = await User.save();
            // let doc = await Character.findOne({ name: 'Jean-Luc Picard' });

            // // Document changed in MongoDB, but not in Mongoose
            // await Character.updateOne(filter, { name: 'Will Riker' });

            // // This will update `doc` age to `59`, even though the doc changed.
            // doc.age = update.age;
            // await doc.save();
            return res;
        } catch (error) {
            console.log('========================================= >>>>>> getUser');
            console.error('Error executing mongoose query:', error);
            throw error;
        }
    }
    static async getTemporaryToken(id: number, username: string, email: string) {
        try {
            const tokenData = {
                id,
                email,
                username,
            };
            const jwtToken = signJWT(tokenData, { exp: '24h' });
            return jwtToken;
        } catch (error) {
            console.log('========================================= >>>>>> getTemporaryToken');
            console.error('Error generating temporary token:', error);
            return null;
        }
    }
    static async verifyUser(email: string) {
        try {
            const filter = { email: email };
            const update = { isVerified: true };
            const tempUser = await User.findOneAndUpdate(filter, update, {
                new: true,
            });
            return tempUser;
        } catch (error) {
            console.log('========================================= >>>>>> verifyUser');
            console.error('Error executing mongoose query:', error);
            throw error;
        }
    }
}

