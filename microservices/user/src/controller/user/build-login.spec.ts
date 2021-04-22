import { app } from "..";
import { API, USER } from "../../config";
import { generateRandomString } from "../../core/entities/util";
import Request from "supertest";
import { UserDb } from "../../core/data-access/user";
import { PasswordInvalid } from "./exception/password";

describe("testing logining user", () => {
    let createdDocsId: string[] = [];

    it("login valid user", async () => {
        let firstName = "Ahmed";
        let lastName = "Shakshak";
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = generateRandomString(16) + "@gmail.com";
        let req = {};

        req[API.USER.FIRST_NAME_KEY_NAME] = firstName;
        req[API.USER.LAST_NAME_KEY_NAME] = lastName;
        req[API.USER.EMAIL_KEY_NAME] = email;
        req[API.USER.PASSWORD_KEY_NAME] = password;
        req[API.USER.GENDER_KEY_NAME] = gender;

        let res = await Request(app).post(API.ABS_ENDPOINT_REGISTER).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(200);
        createdDocsId.push(res.body[API.USER.USER_KEY_NAME][API.USER.ID_KEY_NAME]);

        req = {};
        req[API.USER.EMAIL_KEY_NAME] = email;
        req[API.USER.PASSWORD_KEY_NAME] = password;
        res = await Request(app).post(API.ABS_ENDPOINT_LOGIN).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(200);
        expect(res.body[API.AUTH.ACCESS_TOKEN_KEY_NAME]).toBeDefined();
    });

    it("login with invalid passsword", async () => {
        let firstName = "Ahmed";
        let lastName = "Shakshak";
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = generateRandomString(16) + "@gmail.com";
        let req = {};

        req[API.USER.FIRST_NAME_KEY_NAME] = firstName;
        req[API.USER.LAST_NAME_KEY_NAME] = lastName;
        req[API.USER.EMAIL_KEY_NAME] = email;
        req[API.USER.PASSWORD_KEY_NAME] = password;
        req[API.USER.GENDER_KEY_NAME] = gender;

        let res = await Request(app).post(API.ABS_ENDPOINT_REGISTER).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(200);
        createdDocsId.push(res.body[API.USER.USER_KEY_NAME][API.USER.ID_KEY_NAME]);

        req = {};
        req[API.USER.EMAIL_KEY_NAME] = email;
        req[API.USER.PASSWORD_KEY_NAME] = "asd";
        res = await Request(app).post(API.ABS_ENDPOINT_LOGIN).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body[API.AUTH.ACCESS_TOKEN_KEY_NAME]).toBeUndefined();
        expect(res.body["message"]).toBe(new PasswordInvalid().message);
    });

    afterAll(async () => {
        await Promise.all(createdDocsId.map((id) => UserDb.deletetUserById(id)));
    });
});
