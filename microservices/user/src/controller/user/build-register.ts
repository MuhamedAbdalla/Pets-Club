import { API } from "../../config";
import { ReqParser } from "../../core/entities/req-parser/req-parser";
import { insertUser } from "../../core/usecases/user";
import { userTOJsonRes } from "./util";

const regParser = new ReqParser();
regParser.addArgument(API.USER.FIRST_NAME_KEY_NAME, { required: true, type: "string" });
regParser.addArgument(API.USER.LAST_NAME_KEY_NAME, { required: true, type: "string" });
regParser.addArgument(API.USER.PASSWORD_KEY_NAME, { required: true, type: "string" });
regParser.addArgument(API.USER.EMAIL_KEY_NAME, { required: true, type: "string" });
regParser.addArgument(API.USER.GENDER_KEY_NAME, { required: true, type: "string" });
regParser.addArgument(API.USER.PROFILE_IMAGE_KEY_NAME, { required: false, type: "string" });
regParser.addArgument(API.USER.CITY_KEY_NAME, { required: false, type: "string" });
regParser.addArgument(API.USER.LATITUDE_KEY_NAME, { required: false, type: "number" });
regParser.addArgument(API.USER.LONGITUDE_KEY_NAME, { required: false, type: "number" });

export function buildRegister() {
    return async (req: any): Promise<{ type: string; body: {}; statusCode: number }> => {
        req = regParser.parse(req);

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
            longitude,
        });

        const body = { message: "user created successfully" };
        body[API.USER.USER_KEY_NAME] = userTOJsonRes(user);
        return {
            type: API.TYPE_JSON,
            body,
            statusCode: 200,
        };
    };
}
