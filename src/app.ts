import express, { Application } from 'express'
import * as dotenv from 'dotenv';
dotenv.config();

const app: Application = express();

const port = process.env.SERVER_PORT ?? '8080'

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})