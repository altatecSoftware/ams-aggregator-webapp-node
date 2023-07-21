import mongoose from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
})

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
})

describe('Database connection tests', () => {

    it('It should connect to the in-memory database', async () => {
        expect(mongoose.connection.readyState).toBe(1);
    })

    it('It should successfully disconnect from the database', async () => {
        await mongoose.disconnect()
        expect(mongoose.connection.readyState).toBe(0)
    })
})