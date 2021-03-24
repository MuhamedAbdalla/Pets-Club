import { getUserByEmail } from ".";
import { USER } from "../../../config";
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
    ): Promise<void> {
        let emailExist = false;
        const userInstance = await makeUser(user);

        try {
            // it should throw an error if the user doesn't exist
            let u = getUserByEmail(user.email);
            emailExist = true;
        } catch (error) {
            await insertUser(userInstance);
        }
        
        if(emailExist) {
            throw new Error(USER.EXCEPTION_MESSAGE_EMAIL_ALREADY_EXISTS);
        }
    }
}