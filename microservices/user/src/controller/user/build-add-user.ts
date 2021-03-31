import { API } from "../../config"
import { User } from "../../core/entities/user/user";
import { insertUser } from "../../core/usecases/user";

export function buildAddUser() {
    return async (req: {}): Promise<{type: string, body: {}, statusCode: number}> => {
        const firstName = req[API.USER.FIRST_NAME];
        const lastName = req[API.USER.LAST_NAME];
        const password = req[API.USER.PASSWORD];
        const email = req[API.USER.EMAIL];
        const profileImage = req[API.USER.PROFILE_IMAGE];
        const gender = req[API.USER.GENDER];
        const city = req[API.USER.CITY];
        const latitude = req[API.USER.LATITUDE];
        const longitude = req[API.USER.LONGITUDE];
        const user = await insertUser({
            firstName,
            lastName,
            password,
            email,
            profileImageBase64: profileImage,
            gender,
            city,
            latitude,
            longitude
        });

        return {
            type: API.TYPE_JSON,
            body: {message: 'user created successfully', ...userTOJsonRes(user)},
            statusCode: 200
        }
    }
}


function userTOJsonRes(user: User) {
    let ret = {};
    ret[API.USER.ID] = user.id;
    ret[API.USER.FIRST_NAME] = user.firstName;
    ret[API.USER.LAST_NAME] = user.lastName;
    ret[API.USER.EMAIL] = user.email;
    ret[API.USER.GENDER] = user.gender;
    ret[API.USER.PROFILE_IMAGE_URL] = user.profileImageUrl;
    ret[API.USER.CITY] = user.city;
    return ret;
}