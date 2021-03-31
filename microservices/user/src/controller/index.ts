import express from 'express';
import { json } from 'body-parser';
import { API } from '../config';
import { makeExpressCallback } from './express-callback';
import { addUser, buildAddUser } from './user';

export * from './user'

export const app = express();
const PORT = process.env.PORT || API.PORT;

app.use(json({limit: '50mb'}));

app.post(API.ABS_ENDPOINT_REGISTER, addUser);

app.listen(PORT, () => {
    console.log(`the service is running on port ${PORT}`)
});
