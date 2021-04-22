import { verifyPassword } from "../../core/entities/user";
import { getUserByEmail, getUserById } from "../../core/usecases/user";
import { makeExpressCallback } from "../express-callback";
import { buildRegister } from "./build-register";
import { buildLogin } from "./build-login";
import * as jwt from "jsonwebtoken";
import { API } from "../../config";
import { buildGetUser } from "./build-get-user";
import { buildUpdateUser } from "./build-update-user";

export * from "./build-register";

const generateToken = (data: string): string => {
    return jwt.sign({ data }, API.AUTH.TOKEN_SECERT, {
        expiresIn: API.AUTH.ACCESS_TOKEN_EXPIER_TIME,
    });
};

const getTokenData = (token: string): any => {
    return jwt.verify(token, API.AUTH.TOKEN_SECERT);
};

export const register = makeExpressCallback(buildRegister());
export const getUser = makeExpressCallback(buildGetUser(getTokenData, getUserById));
export const updateUser = makeExpressCallback(buildUpdateUser(getTokenData));
export const login = makeExpressCallback(buildLogin(getUserByEmail, verifyPassword, generateToken));
