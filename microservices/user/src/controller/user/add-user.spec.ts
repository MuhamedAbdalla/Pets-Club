import { app } from '../';
import { API, USER } from "../../config";
import { generateRandomString } from "../../core/entities/util";
import Request from 'supertest'
import { addUser } from '.';
import { UserDb } from '../../core/data-access/user';

describe("testing inserting user", () => {
    let createdDocsId: string[] = [];

    it("insert valid user", async () => {
        let firstName = "Ahmed";
        let lastName = "Shakshak";
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = generateRandomString(16) +  "@gmail.com";
        let req = {};
        
        req[API.USER.FIRST_NAME] = firstName;
        req[API.USER.LAST_NAME] = lastName;
        req[API.USER.EMAIL] = email;
        req[API.USER.PASSWORD] = password;
        req[API.USER.GENDER] = gender;
        
        let res = await Request(app).post(API.USER.ABS_ENDPOINT).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(200);
        createdDocsId.push(res.body.id);
    });

    it("insert user with already exist email", async () => {
        let firstName = "Ahmed";
        let lastName = "Shakshak";
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "test1@gmail.com";
        let req = {};
        req[API.USER.FIRST_NAME] = firstName;
        req[API.USER.LAST_NAME] = lastName;
        req[API.USER.EMAIL] = email;
        req[API.USER.PASSWORD] = password;
        req[API.USER.GENDER] = gender;
        
        let res = await Request(app).post(API.USER.ABS_ENDPOINT).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(USER.EXCEPTION_MESSAGE_EMAIL_ALREADY_EXISTS);
    });

    it("inserting user with name length greater than maximum length", async () => {
        let firstName = ''; for(let i = 0; i < USER.NAME_MAXIMUM_LENGTH + 1; i ++) {firstName += 'a'};
        let lastName = "Shakshak";
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "test1@gmail.com";
        let city = 'cairo';
        let req = {};
        
        req[API.USER.FIRST_NAME] = firstName;
        req[API.USER.LAST_NAME] = lastName;
        req[API.USER.EMAIL] = email;
        req[API.USER.CITY] = city;
        req[API.USER.PASSWORD] = password;
        req[API.USER.GENDER] = gender;
        
        let res = await Request(app).post(API.USER.ABS_ENDPOINT).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(USER.EXCEPTION_MESSAGE_NAME_MAXIMUM_LENGTH);
        
    });

    it("inserting user with name length greater than maximum length", async () => {
        let firstName = 'ahmed';
        let lastName = '';  for(let i = 0; i < USER.NAME_MAXIMUM_LENGTH + 1; i ++) {lastName += 'a'};
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "test1@gmail.com";
        let city = 'cairo';
        let req = {};
        
        req[API.USER.FIRST_NAME] = firstName;
        req[API.USER.LAST_NAME] = lastName;
        req[API.USER.EMAIL] = email;
        req[API.USER.CITY] = city;
        req[API.USER.PASSWORD] = password;
        req[API.USER.GENDER] = gender;
        
        let res = await Request(app).post(API.USER.ABS_ENDPOINT).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(USER.EXCEPTION_MESSAGE_NAME_MAXIMUM_LENGTH); 
    });

    it("inserting user with password length greater than maximum length", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = ""; for(let i = 0; i < USER.PASSWORD_MAXIMUM_LENGTH + 1; i++) {password += 'x'}
        let gender = USER.MALE;
        let email = "test1@gmail.com";
        let city = 'cairo';
        let req = {};
        
        req[API.USER.FIRST_NAME] = firstName;
        req[API.USER.LAST_NAME] = lastName;
        req[API.USER.EMAIL] = email;
        req[API.USER.CITY] = city;
        req[API.USER.PASSWORD] = password;
        req[API.USER.GENDER] = gender;
        
        let res = await Request(app).post(API.USER.ABS_ENDPOINT).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(USER.EXCEPTION_MESSAGE_PASSWORD_MAXIMUM_LENGTH);
        
    });

    it("inserting user with password length less than minimum length", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = ""; for(let i = 0; i < USER.PASSWORD_MINIMUM_LENGTH - 1; i++) {password += 'x'}
        let gender = USER.MALE;
        let email = "test1@gmail.com";
        let city = 'cairo';
        let req = {};
        
        req[API.USER.FIRST_NAME] = firstName;
        req[API.USER.LAST_NAME] = lastName;
        req[API.USER.EMAIL] = email;
        req[API.USER.CITY] = city;
        req[API.USER.PASSWORD] = password;
        req[API.USER.GENDER] = gender;
        
        let res = await Request(app).post(API.USER.ABS_ENDPOINT).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(USER.EXCEPTION_MESSAGE_PASSWORD_MINIMUM_LENGTH);
        
    });

    it("inserting user with invalid gender", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = "VeryStrongPassword";
        let gender = 'asdasdeqwd';
        let email = "test1@gmail.com";
        let city = 'cairo';
        let req = {};
        
        req[API.USER.FIRST_NAME] = firstName;
        req[API.USER.LAST_NAME] = lastName;
        req[API.USER.EMAIL] = email;
        req[API.USER.CITY] = city;
        req[API.USER.PASSWORD] = password;
        req[API.USER.GENDER] = gender;
        
        let res = await Request(app).post(API.USER.ABS_ENDPOINT).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(USER.EXCEPTION_MESSAGE_GENDER_INVALID);
        
    });

    it("inserting user with invalid email", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "test1gmail.com";
        let city = 'cairo';
        let req = {};
        
        req[API.USER.FIRST_NAME] = firstName;
        req[API.USER.LAST_NAME] = lastName;
        req[API.USER.EMAIL] = email;
        req[API.USER.CITY] = city;
        req[API.USER.PASSWORD] = password;
        req[API.USER.GENDER] = gender;
        
        let res = await Request(app).post(API.USER.ABS_ENDPOINT).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(USER.EXCEPTION_MESSAGE_EMAIL_INVALID);    
    });

    it("inserting user with invalid latitude", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "test1@gmail.com";
        let city = 'cairo';
        let latitude = 400;
        let longitude = 0;
        let req = {};
        
        req[API.USER.FIRST_NAME] = firstName;
        req[API.USER.LAST_NAME] = lastName;
        req[API.USER.EMAIL] = email;
        req[API.USER.CITY] = city;
        req[API.USER.PASSWORD] = password;
        req[API.USER.GENDER] = gender;
        req[API.USER.LATITUDE] = latitude;
        req[API.USER.LONGITUDE] = longitude;
        
        let res = await Request(app).post(API.USER.ABS_ENDPOINT).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(USER.EXCEPTION_MESSAGE_LATITUDE_INVALID);    
    });

    it("inserting user with invalid longitude", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "test1@gmail.com";
        let city = 'cairo';
        let latitude = 0;
        let longitude = 400;

        let req = {};
        
        req[API.USER.FIRST_NAME] = firstName;
        req[API.USER.LAST_NAME] = lastName;
        req[API.USER.EMAIL] = email;
        req[API.USER.CITY] = city;
        req[API.USER.LONGITUDE] = longitude;
        req[API.USER.LATITUDE] = latitude;
        req[API.USER.PASSWORD] = password;
        req[API.USER.GENDER] = gender;
        
        let res = await Request(app).post(API.USER.ABS_ENDPOINT).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(USER.EXCEPTION_MESSAGE_LONGITUDE_INVALID);    
    });

    it("inserting user with latitude and without longitude", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "test1@gmail.com";
        let city = 'cairo';
        let latitude = 0;

        let req = {};
        
        req[API.USER.FIRST_NAME] = firstName;
        req[API.USER.LAST_NAME] = lastName;
        req[API.USER.EMAIL] = email;
        req[API.USER.CITY] = city;
        req[API.USER.LATITUDE] = latitude;
        req[API.USER.PASSWORD] = password;
        req[API.USER.GENDER] = gender;
        
        let res = await Request(app).post(API.USER.ABS_ENDPOINT).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(USER.EXCEPTION_MESSAGE_LONGITUDE_INVALID);    
    });

    it("inserting user with longitude and without latitude", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "test1@gmail.com";
        let city = 'cairo';
        let longitude = 0;

        let req = {};
        
        req[API.USER.FIRST_NAME] = firstName;
        req[API.USER.LAST_NAME] = lastName;
        req[API.USER.EMAIL] = email;
        req[API.USER.CITY] = city;
        req[API.USER.LONGITUDE] = longitude;
        req[API.USER.PASSWORD] = password;
        req[API.USER.GENDER] = gender;
        
        let res = await Request(app).post(API.USER.ABS_ENDPOINT).send(req);
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(USER.EXCEPTION_MESSAGE_LATITUDE_INVALID);    
    });

    afterAll(async () => {
        await Promise.all(createdDocsId.map( id => UserDb.deletetUserById(id)));
    });
});
