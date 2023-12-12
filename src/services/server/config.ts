import mongoose from 'mongoose';

class DBService {
    private static _instance: any;
    constructor() {
        if (DBService._instance) {
            return DBService._instance;
        }
        DBService._instance = this;
        this.connectDB();
    }
    connectDB = () => {
        mongoose.connect(process.env.MONGO_URI!);

        mongoose.connection.on('connected', () => {
            console.log('Mongo has connected successfully ===>');
        });
        mongoose.connection.on('reconnected', () => {
            console.log('Mongo has reconnected ===>');
        });
        mongoose.connection.on('error', (error) => {
            console.log('Mongo connection has an error ===> ', error);
            mongoose.disconnect();
        });
        mongoose.connection.on('disconnected', () => {
            console.log('Mongo connection is disconnected ===>');
        });

        const database = mongoose.connection;
        database.on('error', (error: any) => {
            console.log(error);
        });

        database.once('connected', () => {
            console.log('Database Connected');
        });
    };
}
export default DBService;

