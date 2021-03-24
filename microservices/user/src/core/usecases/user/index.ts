import { UserDb } from "../../data-access/user";
import { User } from "../../entities/user/user";
import { buildInsertUser } from "./insert-user";
import { buildGetUserByEmail } from "./build-get-user-by-email"

const insertUserDb = async function(user: User) {
    await UserDb.insertUser(user);
}

const getUserByEmailDb = async function(email: string) {
    return await UserDb.getUserByEmail(email);
}

export const insertUser = buildInsertUser(insertUserDb);
export const getUserByEmail = buildGetUserByEmail(getUserByEmailDb);