import { insertUser, updateUser } from ".";
import { USER } from "../../../config";
import { UserDb } from "../../data-access/user";
import { Pet } from "../../entities/pet/pet";
import { generateRandomString } from "../../entities/util";

describe("testing updating user", () => {
    let createdDocsId: string[] = [];

    it(" update valid user with vaild values", async () => {
        let firstName = "Ahmed";
        let lastName = "Shakshak";
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = generateRandomString(16) +  "@gmail.com";
        let u = await insertUser({
            firstName,
            lastName,
            email,
            password,
            profileImageBase64: '',
            gender,
        });
        expect(u).toBeDefined();
        createdDocsId.push(u.id);
        await expect(updateUser({
            id: u.id,
            firstName: u.firstName.slice(1),
            email: u.email.slice(1),
            password: password.slice(1),
            profileImageBase64: '2',
            gender: USER.FEMALE,
        })).resolves.not.toThrowError();
    });

    it(" update user with already exist email", async () => {
        let firstName = "Ahmed";
        let lastName = "Shakshak";
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = generateRandomString(16) +  "@gmail.com";
        let u = await insertUser({
            firstName,
            lastName,
            email,
            password,
            profileImageBase64: '',
            gender,
        });
        expect(u).toBeDefined();
        createdDocsId.push(u.id);

        await expect(updateUser({
            id: u.id,
            email: 'test1@gmail.com'
        })).rejects.toThrow(USER.EXCEPTION_MESSAGE_EMAIL_ALREADY_EXISTS);
    });

    it(" updateing user with name length greater than maximum length", async () => {
        let invaildfirstName = ''; for(let i = 0; i < USER.NAME_MAXIMUM_LENGTH + 1; i ++) {invaildfirstName += 'a'};
        let firstName = "ahmed";
        let lastName = "Shakshak";
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = generateRandomString(16) +  "@gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];

        let u = await insertUser({
            firstName,
            lastName,
            email,
            password,
            profileImageBase64: '',
            gender,
        });
        expect(u).toBeDefined();
        createdDocsId.push(u.id);

        await expect(updateUser({
            id: u.id,
            firstName: invaildfirstName
        })).rejects.toThrow(USER.EXCEPTION_MESSAGE_NAME_MAXIMUM_LENGTH);
        
    });

    it(" updateing user with name length greater than maximum length", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let invaildLastName = '';  for(let i = 0; i < USER.NAME_MAXIMUM_LENGTH + 1; i ++) {invaildLastName += 'a'};
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = generateRandomString(16) +  "@gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];

        let u = await insertUser({
            firstName,
            lastName,
            email,
            password,
            profileImageBase64: '',
            gender,
        });
        expect(u).toBeDefined();
        createdDocsId.push(u.id);

        await expect(updateUser({
            id: u.id,
            lastName: invaildLastName
        })).rejects.toThrow(USER.EXCEPTION_MESSAGE_NAME_MAXIMUM_LENGTH); 
    });

    it(" updateing user with password length greater than maximum length", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = 'veryStrongPassword';
        let invaildPassword = ""; for(let i = 0; i < USER.PASSWORD_MAXIMUM_LENGTH + 1; i++) {invaildPassword += 'x'}
        let gender = USER.MALE;
        let email = generateRandomString(16) +  "@gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];

        let u = await insertUser({
            firstName,
            lastName,
            email,
            password,
            profileImageBase64: '',
            gender,
        });
        expect(u).toBeDefined();
        createdDocsId.push(u.id);

        await expect(updateUser({
            id: u.id,
            password: invaildPassword
        })).rejects.toThrow(USER.EXCEPTION_MESSAGE_PASSWORD_MAXIMUM_LENGTH);
        
    });

    it(" updateing user with password length less than minimum length", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = 'veryStrongPassword';
        let invaildPassword = ""; for(let i = 0; i < USER.PASSWORD_MINIMUM_LENGTH - 1; i++) {invaildPassword += 'x'}
        let gender = USER.MALE;
        let email = generateRandomString(16) +  "@gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];

        let u = await insertUser({
            firstName,
            lastName,
            email,
            password,
            profileImageBase64: '',
            gender,
        });
        expect(u).toBeDefined();
        createdDocsId.push(u.id);

        await expect(updateUser({
            id: u.id,
            password: invaildPassword

        })).rejects.toThrow(USER.EXCEPTION_MESSAGE_PASSWORD_MINIMUM_LENGTH);
        
    });

    it(" updateing user with invalid gender", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let invaildGender = 'asdasdeqwd';
        let email = generateRandomString(16) +  "@gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];

        let u = await insertUser({
            firstName,
            lastName,
            email,
            password,
            profileImageBase64: '',
            gender,
        });
        expect(u).toBeDefined();
        createdDocsId.push(u.id);

        await expect(updateUser({
            id: u.id,
            gender: invaildGender

        })).rejects.toThrow(USER.EXCEPTION_MESSAGE_GENDER_INVALID);
        
    });

    it(" updateing user with invalid email", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = generateRandomString(16) + '@gmail.com';
        let invalldEmail = "test1gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];

        let u = await insertUser({
            firstName,
            lastName,
            email,
            password,
            profileImageBase64: '',
            gender,
        });
        expect(u).toBeDefined();
        createdDocsId.push(u.id);

        await expect(updateUser({
            id: u.id,
            email: invalldEmail

        })).rejects.toThrow(USER.EXCEPTION_MESSAGE_EMAIL_INVALID);    
    });

    it(" updateing user with invalid latitude", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = generateRandomString(16) +  "@gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];
        let latitude = 0;
        let invaildLatitude = 200;
        let longitude = 0;

        let u = await insertUser({
            firstName,
            lastName,
            email,
            password,
            profileImageBase64: '',
            gender,
            latitude,
            longitude
        });
        expect(u).toBeDefined();
        createdDocsId.push(u.id);

        await expect(updateUser({
            id: u.id,
            latitude: invaildLatitude

        })).rejects.toThrow(USER.EXCEPTION_MESSAGE_LATITUDE_INVALID);    
    });

    it(" updateing user with invalid longitude", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = generateRandomString(16) +  "@gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];
        let latitude = 0;
        let longitude = 0;
        let invaildLongitude = 200;

        let u = await insertUser({
            firstName,
            lastName,
            email,
            password,
            profileImageBase64: '',
            gender,
            longitude,
            latitude
        });
        expect(u).toBeDefined();
        createdDocsId.push(u.id);

        await expect(updateUser({
            id: u.id,
            longitude: invaildLongitude
        })).rejects.toThrow(USER.EXCEPTION_MESSAGE_LONGITUDE_INVALID);    
    });

    afterAll(async () => {
        await Promise.all(createdDocsId.map( id => UserDb.deletetUserById(id)));
    });
});
