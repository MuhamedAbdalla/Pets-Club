import { API } from "../../config";
import { updateUser } from "../../core/usecases/user";
import { MissingParameter } from "./exception/parameters";
import { userTOJsonRes } from "./util";

export function buildUpdateUser(
    getTokenData: (token: string) => any) {
    return async (req: {}): Promise<{type: string, body: {}, statusCode: number}> => {
        if(req[API.AUTH.ACCESS_TOKEN_KEY_NAME] == undefined) {
            console.log(req)
            throw new MissingParameter(API.AUTH.ACCESS_TOKEN_KEY_NAME);
        }
        let token = req[API.AUTH.ACCESS_TOKEN_KEY_NAME];
        console.log(token);
        token = token && token.split(' ')[1];
        let userId: any;
        try {
            console.log(token);
            userId = getTokenData(token).data;
        }
        catch(err) {
            return {
                type: API.TYPE_JSON,
                body: {message: API.AUTH.MESSAGE_INVALID_TOKEN},
                statusCode: 401
            }
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
        const user = await updateUser({
            id: userId,
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

        const body = {message: 'Updated successfully'};
        body[API.USER.USER_KEY_NAME] =  userTOJsonRes(user);
        return {
            type: API.TYPE_JSON,
            body,
            statusCode: 200
        }
    }
}
