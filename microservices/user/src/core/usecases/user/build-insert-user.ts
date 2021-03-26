import { Pet } from "../../entities/pet/Pet";
import { makeUser } from "../../entities/user";
import { User } from "../../entities/user/user";

export function buildInsertUser(insertUser: (user: User) => Promise<void>) {
    return async function(
        user: {
            readonly firstName: string,
            readonly lastName: string,
            readonly email: string,
            readonly password: string,
            readonly profileImageUrl: string,
            readonly gender: string,
            readonly city?: string,
            readonly pets?: Pet[],
            readonly latitude?: number,
            readonly longitude?: number
        }
    ): Promise<User> {
        const userInstance = await makeUser(user);
        await insertUser(userInstance);
        return userInstance;
    }
}