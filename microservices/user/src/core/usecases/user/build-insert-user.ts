import { Pet } from "../../entities/pet/Pet";
import { makeUser } from "../../entities/user";
import { User } from "../../entities/user/user";

export function buildInsertUser(
    insertUser: (user: User) => Promise<void>, 
    addImage: (imageBase64: string, userId: string) => Promise<string>) {
    return async function(
        user: {
            readonly firstName: string,
            readonly lastName: string,
            readonly email: string,
            readonly password: string,
            readonly gender: string,
            readonly profileImageBase64?: string,
            readonly city?: string,
            readonly pets?: Pet[],
            readonly latitude?: number,
            readonly longitude?: number
        }
    ): Promise<User> {
        let profileImageUrl = '';
        let userInstance = await makeUser({...user, profileImageUrl});
        if(user.profileImageBase64) {
            profileImageUrl = await addImage(user.profileImageBase64, userInstance.id);
            userInstance = await makeUser({...user, profileImageUrl});
        }
        await insertUser(userInstance);
        return userInstance;
    }
}