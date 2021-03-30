import { UserDb } from "../../data-access/user";
import { User } from "../../entities/user/user";
import { buildInsertUser } from "./build-insert-user";
import { buildGetUserByEmail, buildGetUserById } from "./build-get-user"
import { buildUpdateUser } from "./build-update-user";

const insertUserDb = async function(user: User) {
    await UserDb.insertUser(user);
}

const addImage = async function(imageBase64: string, userId: string): Promise<string> {
    return await UserDb.addImage(imageBase64, userId);
}

const getUserByEmailDb = async function(email: string) {
    return await UserDb.getUserByEmail(email);
}

const getUserByIdDb = async function(id: string) {
    return await UserDb.getUserById(id);
}

const updateUserDb = async function(user: User) {
    await UserDb.updatetUser(user);
}

export const insertUser = buildInsertUser(insertUserDb, addImage);
export const getUserByEmail = buildGetUserByEmail(getUserByEmailDb);
export const getUserById = buildGetUserById(getUserByIdDb);
export const updateUser = buildUpdateUser(updateUserDb, addImage);