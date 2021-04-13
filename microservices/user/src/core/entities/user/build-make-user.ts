import { User } from "./user";
import { Pet } from "../pet/pet";
import { USER } from "../../../config";
import { LatitudeNotValid, LongitudeNotValid } from "./exceptions/location";

export function buildMakeUser(
    generateUserId:() => string,
    generateSalt: () => string, 
    hashPassword: (password: string, salt: string) => string,
    vaildateUserName: (name: string) => void,
    vaildateUserPassword: (password: string) => void,
    vaildateUserGender: (gender: string) => void,
    vaildateUserEmail: (email: string) => void,
    vaildateUserLocation: (latitude: number, longitude: number) => void) {
    return async function makeUser(user: {
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
    }): Promise<User> {
        vaildateUserName(user.firstName);
        vaildateUserName(user.lastName);
        vaildateUserPassword(user.password);
        vaildateUserGender(user.gender);
        if(user.latitude != undefined && user.longitude != undefined) {
            vaildateUserLocation(user.latitude, user.longitude);
        }
        else if(user.latitude != undefined && user.longitude == undefined) {
            throw new LongitudeNotValid();
        }
        else if(user.latitude == undefined && user.longitude != undefined) {
            throw new LatitudeNotValid();
        }
        await vaildateUserEmail(user.email);

        const salt = generateSalt();
        const hashedPassword = hashPassword(user.password, salt);
        let currentUser = new User(
            generateUserId(),
            user.firstName,
            user.lastName,
            user.email,
            hashedPassword,
            salt,
            user.profileImageUrl,
            user.gender,
            user.pets || [],
            user.city || '',
            user.latitude == undefined? 360 : user.latitude, // 360 means not assigned yet [-90, 90]
            user.longitude == undefined? 360 : user.longitude // 360 means not assigned yet [-180, 180]
        );
        return currentUser;
    };
}