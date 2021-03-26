import { User } from "./user";
import { USER } from "../../../config";

export function buildEditUser(
    generateSalt: () => string, 
    hashPassword: (password: string, salt: string) => string,
    vaildateUserName: (name: string) => void,
    vaildateUserPassword: (password: string) => void,
    vaildateUserGender: (gender: string) => void,
    vaildateUserEmail: (email: string) => void,
    vaildateUserLocation: (latitude: number, longitude: number) => void) {
    return async function editUser(user: {
        readonly id: string,
        readonly firstName: string,
        readonly lastName: string,
        readonly email: string,
        readonly password: string,
        readonly salt: string,
        readonly profileImageUrl: string,
        readonly gender: string,
        readonly city: string,
        readonly latitude: number,
        readonly longitude: number,
        readonly isNewFirstName?: boolean,
        readonly isNewLastName?: boolean,
        readonly isNewEmail?: boolean,
        readonly isNewPassword?: boolean,
        readonly isNewProfileImageUrl?: boolean,
        readonly isNewGender?: boolean,
        readonly isNewCity?: boolean,
        readonly isNewLatitude?: boolean,
        readonly isNewLongitude?: boolean,
    }): Promise<User> {
        let salt = user.salt;
        let hashedPassword = user.password;

        if(user.isNewFirstName) {
            vaildateUserName(user.firstName);
        }
        if(user.isNewLastName) {
            vaildateUserName(user.lastName);
        }
        if(user.isNewPassword) {
            vaildateUserPassword(user.password);
            salt = generateSalt();
            hashedPassword = hashPassword(user.password, salt);
        }
        if(user.isNewGender) {
            vaildateUserGender(user.gender);
        }
        if(user.isNewLatitude || user.isNewLongitude) {
            vaildateUserLocation(user.latitude, user.longitude);
        }
        if(user.isNewEmail) {
            await vaildateUserEmail(user.email);
        }
        let currentUser = new User(
            user.id,
            user.firstName,
            user.lastName,
            user.email,
            hashedPassword,
            salt,
            user.profileImageUrl,
            user.gender,
            [],
            user.city || '',
            user.latitude,
            user.longitude
        );
        return currentUser;
    };
}