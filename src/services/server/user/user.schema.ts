import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
        required: [true, 'Please provide an OTP'],
    },
});

const User = mongoose.models.users || mongoose.model('users', userSchema); //in mongoDB if we create it like User it will convert it into users so our model will be all in lower case and plural. So instead of User DB will change it into users
export default User;

