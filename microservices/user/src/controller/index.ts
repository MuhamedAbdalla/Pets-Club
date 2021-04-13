import express from "express";
import { json } from "body-parser";
import { API } from "../config";
import { addUser, getUser, login, updateUser } from "./user";
export * from "./user";

export const app = express();
const PORT = process.env.PORT || API.PORT;

app.use(json({ limit: "50mb" }));

app.post(API.ABS_ENDPOINT_REGISTER, addUser);
app.post(API.ABS_ENDPOINT_LOGIN, login);
app.get(API.USER.ABS_ENDPOINT, getUser);
app.put(API.USER.ABS_ENDPOINT, updateUser);

if (process.env.NODE_ENV == "PRODUCTION") {
    app.listen(PORT, () => {
        console.log(`the service is running on port ${PORT}`);
    });
} else {
    app.listen();
}
