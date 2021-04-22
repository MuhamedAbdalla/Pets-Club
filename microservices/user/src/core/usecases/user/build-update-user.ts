import { getUserById } from ".";
import { editUser } from "../../entities/user";
import { User } from "../../entities/user/user";

export function buildUpdateUser(
    updateUser: (user: User) => Promise<void>, 
    addImage: (imageBase64: string, userId: string) => Promise<string>) {
    return async function(
        user: {
            readonly id: string,
            readonly firstName?: string,
            readonly lastName?: string,
            readonly email?: string,
            readonly password?: string,
            readonly profileImageBase64?: string,
            readonly gender?: string,
            readonly city?: string,
            readonly latitude?: number,
            readonly longitude?: number
        }
    ): Promise<User> {
        const u = await getUserById(user.id);
        let profileImageUrl = '';
        if(user.profileImageBase64) {
            profileImageUrl = await addImage(user.profileImageBase64, user.id);
        }
        const updatedUser = await editUser({
            id: u.id,
            firstName: user.firstName != undefined? user.firstName: u.firstName,
            lastName: user.lastName != undefined? user.lastName : u.lastName,
            email: user.email != undefined? user.email : u.email,
            password: user.password != undefined? user.password : u.hashedPassword,
            salt: u.salt,
            profileImageUrl: user.profileImageBase64 != undefined? profileImageUrl : u.profileImageUrl,
            gender: user.gender != undefined? user.gender : u.gender,
            city: user.city != undefined? user.city : u.city,
            latitude: user.latitude != undefined? user.latitude : u.latitude,
            longitude: user.longitude != undefined? user.longitude : u.longitude,
            isNewFirstName: user.firstName != undefined && user.firstName != u.firstName,
            isNewLastName: user.lastName != undefined && user.lastName != u.lastName,
            isNewEmail: user.email != undefined && user.email != u.email,
            isNewPassword: user.password != undefined,
            isNewProfileImageUrl: user.profileImageBase64 != undefined,
            isNewGender: user.gender != undefined && user.gender != u.gender,
            isNewCity: user.city != undefined && user.city != u.city,
            isNewLatitude: user.latitude != undefined && user.longitude != u.latitude,
            isNewLongitude: user.longitude != undefined && user.latitude != u.longitude  
        });
        await updateUser(updatedUser);
        return updatedUser;
    }
}