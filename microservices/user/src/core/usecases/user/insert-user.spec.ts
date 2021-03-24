import { insertUser } from ".";
import { USER } from "../../../config";
import { Pet } from "../../entities/pet/Pet";

describe("testing inserting user", () => {
    it("insert user with already exist email", async () => {
        let firstName = "Ahmed";
        let lastName = "Shakshak";
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "test1@gmail.com";

        await expect(insertUser({
            firstName,
            lastName,
            email,
            password,
            profileImageUrl: '',
            gender,
        })).rejects.toThrow(USER.EXCEPTION_MESSAGE_EMAIL_ALREADY_EXISTS);
    });

    it("inserting user with name length greater than maximum length", async () => {
        let firstName = ''; for(let i = 0; i < USER.NAME_MAXIMUM_LENGTH + 1; i ++) {firstName += 'a'};
        let lastName = "Shakshak";
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "test1@gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];

        let t = async () => {
            await insertUser({
                firstName,
                lastName,
                email,
                password,
                profileImageUrl: '',
                city,
                gender,
                pets
            });
        }
        await expect(t).rejects.toThrow(USER.EXCEPTION_MESSAGE_NAME_MAXIMUM_LENGTH);
        
    });

    it("inserting user with name length greater than maximum length", async () => {
        let firstName = 'ahmed';
        let lastName = '';  for(let i = 0; i < USER.NAME_MAXIMUM_LENGTH + 1; i ++) {lastName += 'a'};
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "test1@gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];

        let t = async () => {
            await insertUser({
                firstName,
                lastName,
                email,
                password,
                profileImageUrl: '',
                city,
                gender,
                pets
            });
        }
        await expect(t).rejects.toThrow(USER.EXCEPTION_MESSAGE_NAME_MAXIMUM_LENGTH); 
    });

    it("inserting user with password length greater than maximum length", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = ""; for(let i = 0; i < USER.PASSWORD_MAXIMUM_LENGTH + 1; i++) {password += 'x'}
        let gender = USER.MALE;
        let email = "test1@gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];

        let t = async () => {
            await insertUser({
                firstName,
                lastName,
                email,
                password,
                profileImageUrl: '',
                city,
                gender,
                pets
            });
        }
        await expect(t).rejects.toThrow(USER.EXCEPTION_MESSAGE_PASSWORD_MAXIMUM_LENGTH);
        
    });

    it("inserting user with password length less than minimum length", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = ""; for(let i = 0; i < USER.PASSWORD_MINIMUM_LENGTH - 1; i++) {password += 'x'}
        let gender = USER.MALE;
        let email = "test1@gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];

        let t = async () => {
            await insertUser({
                firstName,
                lastName,
                email,
                password,
                profileImageUrl: '',
                city,
                gender,
                pets
            });
        }
        await expect(t).rejects.toThrow(USER.EXCEPTION_MESSAGE_PASSWORD_MINIMUM_LENGTH);
        
    });

    it("inserting user with invalid gender", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = "VeryStrongPassword";
        let gender = 'asdasdeqwd';
        let email = "test1@gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];

        let t = async () => {
            await insertUser({
                firstName,
                lastName,
                email,
                password,
                profileImageUrl: '',
                city,
                gender,
                pets
            });
        }
        await expect(t).rejects.toThrow(USER.EXCEPTION_MESSAGE_GENDER_INVALID);
        
    });

    it("inserting user with invalid email", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "test1gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];

        let t = async () => {
            await insertUser({
                firstName,
                lastName,
                email,
                password,
                profileImageUrl: '',
                city,
                gender,
                pets
            });
        }
        await expect(t).rejects.toThrow(USER.EXCEPTION_MESSAGE_EMAIL_INVALID);    
    });

    it("inserting user with invalid latitude", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "test1@gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];
        let latitude = 200;
        let longitude = 0;

        let t = async () => {
            await insertUser({
                firstName,
                lastName,
                email,
                password,
                profileImageUrl: '',
                city,
                gender,
                pets,
                latitude,
                longitude
            });
        }
        await expect(t).rejects.toThrow(USER.EXCEPTION_MESSAGE_LATITUDE_INVALID);    
    });

    it("inserting user with invalid longitude", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "test1@gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];
        let latitude = 0;
        let longitude = 200;

        let t = async () => {
            await insertUser({
                firstName,
                lastName,
                email,
                password,
                profileImageUrl: '',
                city,
                gender,
                pets,
                latitude,
                longitude
            });
        }
        await expect(t).rejects.toThrow(USER.EXCEPTION_MESSAGE_LONGITUDE_INVALID);    
    });

    it("inserting user with latitude and without longitude", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "test1@gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];
        let latitude = 0;

        let t = async () => {
            await insertUser({
                firstName,
                lastName,
                email,
                password,
                profileImageUrl: '',
                city,
                gender,
                pets,
                latitude,
            });
        }
        await expect(t).rejects.toThrow(USER.EXCEPTION_MESSAGE_LONGITUDE_INVALID);    
    });

    it("inserting user with longitude and without latitude", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "test1@gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];
        let longitude = 0;

        let t = async () => {
            await insertUser({
                firstName,
                lastName,
                email,
                password,
                profileImageUrl: '',
                city,
                gender,
                pets,
                longitude,
            });
        }
        await expect(t).rejects.toThrow(USER.EXCEPTION_MESSAGE_LATITUDE_INVALID);    
    });
});
