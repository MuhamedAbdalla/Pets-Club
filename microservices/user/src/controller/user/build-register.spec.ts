import { app } from "..";
import { API, USER } from "../../config";
import { generateRandomString } from "../../core/entities/util";
import Request from "supertest";
import { UserDb } from "../../core/data-access/user";
import { MissingArgument } from "../../core/entities/req-parser/exceptions/argument";

describe("testing registering user", () => {
    let createdDocsId: string[] = [];

    it("register valid user", async () => {
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
    });

    it("register user missing firstname", async () => {
        let lastName = "Shakshak";
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = generateRandomString(16) + "@gmail.com";
        let req = {};

        req[API.USER.LAST_NAME_KEY_NAME] = lastName;
        req[API.USER.EMAIL_KEY_NAME] = email;
        req[API.USER.PASSWORD_KEY_NAME] = password;
        req[API.USER.GENDER_KEY_NAME] = gender;

        let res = await Request(app).post(API.ABS_ENDPOINT_REGISTER).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(new MissingArgument(API.USER.FIRST_NAME_KEY_NAME).message);
    });

    it("register user missing lastname", async () => {
        let firstName = "Ahmed";
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = generateRandomString(16) + "@gmail.com";
        let req = {};

        req[API.USER.FIRST_NAME_KEY_NAME] = firstName;
        req[API.USER.EMAIL_KEY_NAME] = email;
        req[API.USER.PASSWORD_KEY_NAME] = password;
        req[API.USER.GENDER_KEY_NAME] = gender;

        let res = await Request(app).post(API.ABS_ENDPOINT_REGISTER).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(new MissingArgument(API.USER.LAST_NAME_KEY_NAME).message);
    });

    it("register user missing password", async () => {
        let firstName = "Ahmed";
        let lastName = "Shakshak";
        let gender = USER.MALE;
        let email = generateRandomString(16) + "@gmail.com";
        let req = {};

        req[API.USER.FIRST_NAME_KEY_NAME] = firstName;
        req[API.USER.LAST_NAME_KEY_NAME] = lastName;
        req[API.USER.EMAIL_KEY_NAME] = email;
        req[API.USER.GENDER_KEY_NAME] = gender;

        let res = await Request(app).post(API.ABS_ENDPOINT_REGISTER).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(new MissingArgument(API.USER.PASSWORD_KEY_NAME).message);
    });

    it("register user missing email", async () => {
        let firstName = "Ahmed";
        let lastName = "Shakshak";
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let req = {};

        req[API.USER.FIRST_NAME_KEY_NAME] = firstName;
        req[API.USER.LAST_NAME_KEY_NAME] = lastName;
        req[API.USER.PASSWORD_KEY_NAME] = password;
        req[API.USER.GENDER_KEY_NAME] = gender;

        let res = await Request(app).post(API.ABS_ENDPOINT_REGISTER).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(new MissingArgument(API.USER.EMAIL_KEY_NAME).message);
    });

    it("register user missing gender", async () => {
        let firstName = "Ahmed";
        let lastName = "Shakshak";
        let password = "VeryStrongPassword";
        let email = generateRandomString(16) + "@gmail.com";
        let req = {};

        req[API.USER.FIRST_NAME_KEY_NAME] = firstName;
        req[API.USER.LAST_NAME_KEY_NAME] = lastName;
        req[API.USER.EMAIL_KEY_NAME] = email;
        req[API.USER.PASSWORD_KEY_NAME] = password;

        let res = await Request(app).post(API.ABS_ENDPOINT_REGISTER).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(new MissingArgument(API.USER.GENDER_KEY_NAME).message);
    });

    it("register user with an already exist email", async () => {
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

        firstName = "Ahmed";
        lastName = "Shakshak";
        password = "VeryStrongPassword";
        gender = USER.MALE;
        req = {};
        req[API.USER.FIRST_NAME_KEY_NAME] = firstName;
        req[API.USER.LAST_NAME_KEY_NAME] = lastName;
        req[API.USER.EMAIL_KEY_NAME] = email;
        req[API.USER.PASSWORD_KEY_NAME] = password;
        req[API.USER.GENDER_KEY_NAME] = gender;

        res = await Request(app).post(API.ABS_ENDPOINT_REGISTER).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(USER.EXCEPTION_MESSAGE_EMAIL_ALREADY_EXISTS);
    });

    it("registering user with name length greater than maximum length", async () => {
        let firstName = "";
        for (let i = 0; i < USER.NAME_MAXIMUM_LENGTH + 1; i++) {
            firstName += "a";
        }
        let lastName = "Shakshak";
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = generateRandomString(16) + "@gmail.com";
        let city = "cairo";
        let req = {};

        req[API.USER.FIRST_NAME_KEY_NAME] = firstName;
        req[API.USER.LAST_NAME_KEY_NAME] = lastName;
        req[API.USER.EMAIL_KEY_NAME] = email;
        req[API.USER.CITY_KEY_NAME] = city;
        req[API.USER.PASSWORD_KEY_NAME] = password;
        req[API.USER.GENDER_KEY_NAME] = gender;

        let res = await Request(app).post(API.ABS_ENDPOINT_REGISTER).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(USER.EXCEPTION_MESSAGE_NAME_MAXIMUM_LENGTH);
    });

    it("registering user with name length greater than maximum length", async () => {
        let firstName = "ahmed";
        let lastName = "";
        for (let i = 0; i < USER.NAME_MAXIMUM_LENGTH + 1; i++) {
            lastName += "a";
        }
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = generateRandomString(16) + "@gmail.com";
        let city = "cairo";
        let req = {};

        req[API.USER.FIRST_NAME_KEY_NAME] = firstName;
        req[API.USER.LAST_NAME_KEY_NAME] = lastName;
        req[API.USER.EMAIL_KEY_NAME] = email;
        req[API.USER.CITY_KEY_NAME] = city;
        req[API.USER.PASSWORD_KEY_NAME] = password;
        req[API.USER.GENDER_KEY_NAME] = gender;

        let res = await Request(app).post(API.ABS_ENDPOINT_REGISTER).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(USER.EXCEPTION_MESSAGE_NAME_MAXIMUM_LENGTH);
    });

    it("registering user with password length greater than maximum length", async () => {
        let firstName = "ahmed";
        let lastName = "shakshak";
        let password = "";
        for (let i = 0; i < USER.PASSWORD_MAXIMUM_LENGTH + 1; i++) {
            password += "x";
        }
        let gender = USER.MALE;
        let email = generateRandomString(16) + "@gmail.com";
        let city = "cairo";
        let req = {};

        req[API.USER.FIRST_NAME_KEY_NAME] = firstName;
        req[API.USER.LAST_NAME_KEY_NAME] = lastName;
        req[API.USER.EMAIL_KEY_NAME] = email;
        req[API.USER.CITY_KEY_NAME] = city;
        req[API.USER.PASSWORD_KEY_NAME] = password;
        req[API.USER.GENDER_KEY_NAME] = gender;

        let res = await Request(app).post(API.ABS_ENDPOINT_REGISTER).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(USER.EXCEPTION_MESSAGE_PASSWORD_MAXIMUM_LENGTH);
    });

    it("registering user with password length less than minimum length", async () => {
        let firstName = "ahmed";
        let lastName = "shakshak";
        let password = "";
        for (let i = 0; i < USER.PASSWORD_MINIMUM_LENGTH - 1; i++) {
            password += "x";
        }
        let gender = USER.MALE;
        let email = generateRandomString(16) + "@gmail.com";
        let city = "cairo";
        let req = {};

        req[API.USER.FIRST_NAME_KEY_NAME] = firstName;
        req[API.USER.LAST_NAME_KEY_NAME] = lastName;
        req[API.USER.EMAIL_KEY_NAME] = email;
        req[API.USER.CITY_KEY_NAME] = city;
        req[API.USER.PASSWORD_KEY_NAME] = password;
        req[API.USER.GENDER_KEY_NAME] = gender;

        let res = await Request(app).post(API.ABS_ENDPOINT_REGISTER).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(USER.EXCEPTION_MESSAGE_PASSWORD_MINIMUM_LENGTH);
    });

    it("registering user with invalid gender", async () => {
        let firstName = "ahmed";
        let lastName = "shakshak";
        let password = "VeryStrongPassword";
        let gender = "asdasdeqwd";
        let email = generateRandomString(16) + "@gmail.com";
        let city = "cairo";
        let req = {};

        req[API.USER.FIRST_NAME_KEY_NAME] = firstName;
        req[API.USER.LAST_NAME_KEY_NAME] = lastName;
        req[API.USER.EMAIL_KEY_NAME] = email;
        req[API.USER.CITY_KEY_NAME] = city;
        req[API.USER.PASSWORD_KEY_NAME] = password;
        req[API.USER.GENDER_KEY_NAME] = gender;

        let res = await Request(app).post(API.ABS_ENDPOINT_REGISTER).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(USER.EXCEPTION_MESSAGE_GENDER_INVALID);
    });

    it("registering user with invalid email", async () => {
        let firstName = "ahmed";
        let lastName = "shakshak";
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "test1gmail.com";
        let city = "cairo";
        let req = {};

        req[API.USER.FIRST_NAME_KEY_NAME] = firstName;
        req[API.USER.LAST_NAME_KEY_NAME] = lastName;
        req[API.USER.EMAIL_KEY_NAME] = email;
        req[API.USER.CITY_KEY_NAME] = city;
        req[API.USER.PASSWORD_KEY_NAME] = password;
        req[API.USER.GENDER_KEY_NAME] = gender;

        let res = await Request(app).post(API.ABS_ENDPOINT_REGISTER).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(USER.EXCEPTION_MESSAGE_EMAIL_INVALID);
    });

    it("registering user with invalid latitude", async () => {
        let firstName = "ahmed";
        let lastName = "shakshak";
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = generateRandomString(16) + "@gmail.com";
        let city = "cairo";
        let latitude = 400;
        let longitude = 0;
        let req = {};

        req[API.USER.FIRST_NAME_KEY_NAME] = firstName;
        req[API.USER.LAST_NAME_KEY_NAME] = lastName;
        req[API.USER.EMAIL_KEY_NAME] = email;
        req[API.USER.CITY_KEY_NAME] = city;
        req[API.USER.PASSWORD_KEY_NAME] = password;
        req[API.USER.GENDER_KEY_NAME] = gender;
        req[API.USER.LATITUDE_KEY_NAME] = latitude;
        req[API.USER.LONGITUDE_KEY_NAME] = longitude;

        let res = await Request(app).post(API.ABS_ENDPOINT_REGISTER).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(USER.EXCEPTION_MESSAGE_LATITUDE_INVALID);
    });

    it("registering user with invalid longitude", async () => {
        let firstName = "ahmed";
        let lastName = "shakshak";
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = generateRandomString(16) + "@gmail.com";
        let city = "cairo";
        let latitude = 0;
        let longitude = 400;

        let req = {};

        req[API.USER.FIRST_NAME_KEY_NAME] = firstName;
        req[API.USER.LAST_NAME_KEY_NAME] = lastName;
        req[API.USER.EMAIL_KEY_NAME] = email;
        req[API.USER.CITY_KEY_NAME] = city;
        req[API.USER.LONGITUDE_KEY_NAME] = longitude;
        req[API.USER.LATITUDE_KEY_NAME] = latitude;
        req[API.USER.PASSWORD_KEY_NAME] = password;
        req[API.USER.GENDER_KEY_NAME] = gender;

        let res = await Request(app).post(API.ABS_ENDPOINT_REGISTER).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(USER.EXCEPTION_MESSAGE_LONGITUDE_INVALID);
    });

    it("registering user with latitude and without longitude", async () => {
        let firstName = "ahmed";
        let lastName = "shakshak";
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = generateRandomString(16) + "@gmail.com";
        let city = "cairo";
        let latitude = 0;

        let req = {};

        req[API.USER.FIRST_NAME_KEY_NAME] = firstName;
        req[API.USER.LAST_NAME_KEY_NAME] = lastName;
        req[API.USER.EMAIL_KEY_NAME] = email;
        req[API.USER.CITY_KEY_NAME] = city;
        req[API.USER.LATITUDE_KEY_NAME] = latitude;
        req[API.USER.PASSWORD_KEY_NAME] = password;
        req[API.USER.GENDER_KEY_NAME] = gender;

        let res = await Request(app).post(API.ABS_ENDPOINT_REGISTER).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(USER.EXCEPTION_MESSAGE_LONGITUDE_INVALID);
    });

    it("registering user with longitude and without latitude", async () => {
        let firstName = "ahmed";
        let lastName = "shakshak";
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = generateRandomString(16) + "@gmail.com";
        let city = "cairo";
        let longitude = 0;

        let req = {};

        req[API.USER.FIRST_NAME_KEY_NAME] = firstName;
        req[API.USER.LAST_NAME_KEY_NAME] = lastName;
        req[API.USER.EMAIL_KEY_NAME] = email;
        req[API.USER.CITY_KEY_NAME] = city;
        req[API.USER.LONGITUDE_KEY_NAME] = longitude;
        req[API.USER.PASSWORD_KEY_NAME] = password;
        req[API.USER.GENDER_KEY_NAME] = gender;

        let res = await Request(app).post(API.ABS_ENDPOINT_REGISTER).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(USER.EXCEPTION_MESSAGE_LATITUDE_INVALID);
    });

    afterAll(async () => {
        await Promise.all(createdDocsId.map((id) => UserDb.deletetUserById(id)));
    });
});
