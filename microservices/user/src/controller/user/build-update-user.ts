import { API } from "../../config";
import { ReqParser } from "../../core/entities/req-parser/req-parser";
import { updateUser } from "../../core/usecases/user";
import { userTOJsonRes } from "./util";

const updateUserParser = new ReqParser();
updateUserParser.addArgument(API.AUTH.ACCESS_TOKEN_KEY_NAME);
updateUserParser.addArgument(API.USER.FIRST_NAME_KEY_NAME, { required: false, type: "string" });
updateUserParser.addArgument(API.USER.LAST_NAME_KEY_NAME, { required: false, type: "string" });
updateUserParser.addArgument(API.USER.PASSWORD_KEY_NAME, { required: false, type: "string" });
updateUserParser.addArgument(API.USER.EMAIL_KEY_NAME, { required: false, type: "string" });
updateUserParser.addArgument(API.USER.GENDER_KEY_NAME, { required: false, type: "string" });
updateUserParser.addArgument(API.USER.PROFILE_IMAGE_KEY_NAME, { required: false, type: "string" });
updateUserParser.addArgument(API.USER.CITY_KEY_NAME, { required: false, type: "string" });
updateUserParser.addArgument(API.USER.LATITUDE_KEY_NAME, { required: false, type: "number" });
updateUserParser.addArgument(API.USER.LONGITUDE_KEY_NAME, { required: false, type: "number" });

export function buildUpdateUser(getTokenData: (token: string) => any) {
    return async (req: {}): Promise<{ type: string; body: {}; statusCode: number }> => {
        req = updateUserParser.parse(req);

        let userId: any;
        try {
            let token = req[API.AUTH.ACCESS_TOKEN_KEY_NAME];
            token = token && token.split(" ")[1];
            userId = getTokenData(token).data;
        } catch (err) {
            return {
                type: API.TYPE_JSON,
                body: { message: API.AUTH.MESSAGE_INVALID_TOKEN },
                statusCode: 401,
            };
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
            longitude,
        });

        const body = { message: "Updated successfully" };
        body[API.USER.USER_KEY_NAME] = userTOJsonRes(user);
        return {
            type: API.TYPE_JSON,
            body,
            statusCode: 200,
        };
    };
}
