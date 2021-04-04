import { API } from "../../config"
import { insertUser } from "../../core/usecases/user";
import { MissingParameter } from "./exception/parameters";
import { userTOJsonRes } from "./util";

export function buildAddUser() {
    return async (req: {}): Promise<{type: string, body: {}, statusCode: number}> => {
        if(!req[API.USER.FIRST_NAME_KEY_NAME]){
            throw new MissingParameter(API.USER.FIRST_NAME_KEY_NAME);   
        }
        if(!req[API.USER.LAST_NAME_KEY_NAME]){
            throw new MissingParameter(API.USER.LAST_NAME_KEY_NAME);
        }
        if(!req[API.USER.PASSWORD_KEY_NAME]){
            throw new MissingParameter(API.USER.PASSWORD_KEY_NAME);
        }
        if(!req[API.USER.EMAIL_KEY_NAME]){
            throw new MissingParameter(API.USER.EMAIL_KEY_NAME);
        }
        if(!req[API.USER.GENDER_KEY_NAME]){
            throw new MissingParameter(API.USER.GENDER_KEY_NAME);
        }

        const firstName = req[API.USER.FIRST_NAME_KEY_NAME];
        const lastName = req[API.USER.LAST_NAME_KEY_NAME];
        const password = req[API.USER.PASSWORD_KEY_NAME];
        const email = req[API.USER.EMAIL_KEY_NAME];
        const profileImage = req[API.USER.PROFILE_IMAGE_KEY_NAME];
        const gender = req[API.USER.GENDER_KEY_NAME];
        const city = req[API.USER.CITY_KEY_NAME];
        const latitude = req[API.USER.LATITUDE_KEY_NAME];
        const longitude = req[API.USER.LONGITUDE_KEY_NAME];
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
        
        const body = {message: 'user created successfully'};
        body[API.USER.USER_KEY_NAME] = userTOJsonRes(user);
        return {
            type: API.TYPE_JSON,
            body,
            statusCode: 200
        }
    }
}