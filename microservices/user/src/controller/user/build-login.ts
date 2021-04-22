import { API } from "../../config";
import { ReqParser } from "../../core/entities/req-parser/req-parser";
import { User } from "../../core/entities/user/user";
import { PasswordInvalid } from "./exception/password";
import { userTOJsonRes } from "./util";

const loginParser = new ReqParser();
loginParser.addArgument(API.USER.PASSWORD_KEY_NAME, { required: true });
loginParser.addArgument(API.USER.EMAIL_KEY_NAME, { required: true });

export function buildLogin(
    getUserByEmail: (email: string) => Promise<User>,
    validPassword: (password: string, salt: string, hashedPassword: string) => boolean,
    generateToken: (userId: string) => string
) {
    return async (req: {}): Promise<{ type: string; body: {}; statusCode: number }> => {
        req = loginParser.parse(req);

        const email = req[API.USER.EMAIL_KEY_NAME];
        const password = req[API.USER.PASSWORD_KEY_NAME];
        const user = await getUserByEmail(email);
        if (!validPassword(password, user.salt, user.hashedPassword)) {
            throw new PasswordInvalid();
        }

        const body = { message: `Welcome ${user.firstName}` };
        body[API.USER.USER_KEY_NAME] = userTOJsonRes(user);
        body[API.AUTH.ACCESS_TOKEN_KEY_NAME] = generateToken(user.id);
        return {
            type: API.TYPE_JSON,
            body,
            statusCode: 200,
        };
    };
}
