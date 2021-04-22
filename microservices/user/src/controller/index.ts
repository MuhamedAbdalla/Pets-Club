import express from "express";
import { json } from "body-parser";
import { API } from "../config";
import { register, getUser, login, updateUser } from "./user";
import { AddressInfo } from "node:net";
export * from "./user";

export const app = express();
const PORT = process.env.PORT || API.PORT;

app.use(json({ limit: "50mb" }));

app.post(API.ABS_ENDPOINT_REGISTER, register);
app.post(API.ABS_ENDPOINT_LOGIN, login);
app.get(API.USER.ABS_ENDPOINT, getUser);
app.put(API.USER.ABS_ENDPOINT, updateUser);

if (process.env.NODE_ENV == "PRODUCTION") {
    app.listen(PORT, () => {
        console.log(`the server is running on port ${PORT}`);
    });
} else {
    const server = app.listen(() => {
        const addInfo = <AddressInfo>server.address();
        console.log(`the server is running on port ${addInfo.port}`);
    });
}
