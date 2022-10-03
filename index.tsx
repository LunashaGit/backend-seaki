import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config({path: './config/.env'})

require('./config/db');


const app: Express = express();

app.listen(process.env.PORT, () => {
    console.log('Listen ' + process.env.PORT);
})
