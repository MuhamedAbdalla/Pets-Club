import { API } from "../../config"
import { insertUser } from "../../core/usecases/user";
import { MissingParameter } from "./exception/parameters";
import { userTOJsonRes } from "./util";

export function buildAddUser() {
    return async (req: {}): Promise<{type: string, body: {}, statusCode: number}> => {
        if(!req[API.USER.FIRST_NAME]){
            throw new MissingParameter(API.USER.FIRST_NAME);   
        }
        if(!req[API.USER.LAST_NAME]){
            throw new MissingParameter(API.USER.LAST_NAME);
        }
        if(!req[API.USER.PASSWORD]){
            throw new MissingParameter(API.USER.PASSWORD);
        }
        if(!req[API.USER.EMAIL]){
            throw new MissingParameter(API.USER.EMAIL);
        }
        if(!req[API.USER.GENDER]){
            throw new MissingParameter(API.USER.GENDER);
        }

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