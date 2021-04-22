import { User } from "../../entities/user/user";

export function buildGetUserByEmail(getUserByEmail: (user: string) => Promise<User>) {
    return async function(email: string): Promise<User> {
        return await getUserByEmail(email);
    }
}

export function buildGetUserById(getUserById: (user: string) => Promise<User>) {
    return async function(id: string): Promise<User> {
        return await getUserById(id);
    }
}