import { register } from ".";
import { API } from "../../config";
import { ReqParser } from "../../core/entities/req-parser/req-parser";
import { User } from "../../core/entities/user/user";
import { userTOJsonRes } from "./util";

const getUserParser = new ReqParser();
getUserParser.addArgument(API.AUTH.ACCESS_TOKEN_KEY_NAME, { required: true });

export function buildGetUser(
    getTokenData: (token: string) => any,
    getUserById: (id: string) => Promise<User>
) {
    return async (req: {}): Promise<{ type: string; body: {}; statusCode: number }> => {
        req = getUserParser.parse(req);

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

        const user = await getUserById(userId);
        const res = {
            type: API.TYPE_JSON,
            body: {},
            statusCode: 200,
        };
        res.body[API.USER.USER_KEY_NAME] = userTOJsonRes(user);
        return res;
    };
}
