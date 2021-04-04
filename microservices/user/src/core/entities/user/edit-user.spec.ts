import { editUser, verifyPassword } from ".";
import { USER } from "../../../config";
import { Pet } from "../pet/pet";
import { generateRandomString } from "../util";

describe("test editing user", () => {
    it("should edit full user succefully", async () => {
        let firstName = "Ahmed";
        let lastName = "Shakshak";
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "usercase1@gmail.com";
        let city = 'cairo';
        let latitude = 0;
        let longitude = 0;

        let user = await editUser({
            id: 'userid123',
            salt: 'asd',
            firstName,
            lastName,
            email,
            password,
            profileImageUrl: '',
            city,
            gender,
            latitude,
            longitude,
            isNewFirstName: true,
            isNewLastName: true,
            isNewEmail: true,
            isNewPassword: true,
            isNewProfileImageUrl: true,
            isNewCity: true,
            isNewGender: true,
            isNewLatitude: true,
            isNewLongitude: true
        });
        
        expect(user).toBeDefined();
        expect(user.id).toBeDefined();
        expect(user.id.length).toBeGreaterThan(0);
        expect(user.firstName).toEqual(firstName);
        expect(user.lastName).toEqual(lastName);
        expect(user.email).toEqual(email);
        expect(user.gender).toEqual(gender);
        expect(user.city).toEqual(city);
        expect(user.hashedPassword.length).toEqual(2 * USER.HASH_LENGTH); // * 2 as the digest is 'hex'
        expect(user.salt.length).toEqual(2 * USER.SALT_LENGTH); // * 2 as the digest is 'hex'
        expect(verifyPassword(password, user.salt, user.hashedPassword)).toBeTruthy();
        expect(user.profileImageUrl).toEqual('');
        expect(user.pets.length).toEqual(0);
        expect(user.latitude).toEqual(latitude);
        expect(user.longitude).toEqual(longitude);
    });

    it("editing user with name length greater than maximum length", async () => {
        let firstName = ''; for(let i = 0; i < USER.NAME_MAXIMUM_LENGTH + 1; i ++) {firstName += 'a'};
        let lastName = "Shakshak";
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "usercase1@gmail.com";
        let city = 'cairo';
        let latitude = 0;
        let longitude = 0;

        let t = async () => {
            await editUser({
                id: 'userid123',
                salt: 'asd',
                firstName,
                lastName,
                email,
                password,
                profileImageUrl: '',
                city,
                gender,
                latitude,
                longitude,
                isNewFirstName: true,
                isNewLastName: true,
                isNewEmail: true,
                isNewPassword: true,
                isNewProfileImageUrl: true,
                isNewCity: true,
                isNewGender: true,
                isNewLatitude: true,
                isNewLongitude: true
            });
        }
        await expect(t).rejects.toThrow(USER.EXCEPTION_MESSAGE_NAME_MAXIMUM_LENGTH);
        
    });

    it("editing user with name length greater than maximum length", async () => {
        let firstName = 'ahmed';
        let lastName = '';  for(let i = 0; i < USER.NAME_MAXIMUM_LENGTH + 1; i ++) {lastName += 'a'};
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "usercase1@gmail.com";
        let city = 'cairo';
        let latitude = 0;
        let longitude = 0;

        let t = async () => {
            await editUser({
                id: 'userid123',
                salt: 'asd',
                firstName,
                lastName,
                email,
                password,
                profileImageUrl: '',
                city,
                gender,
                latitude,
                longitude,
                isNewFirstName: true,
                isNewLastName: true,
                isNewEmail: true,
                isNewPassword: true,
                isNewProfileImageUrl: true,
                isNewCity: true,
                isNewGender: true,
                isNewLatitude: true,
                isNewLongitude: true
            });
        }
        await expect(t).rejects.toThrow(USER.EXCEPTION_MESSAGE_NAME_MAXIMUM_LENGTH); 
    });

    it("editing user with password length greater than maximum length", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = ""; for(let i = 0; i < USER.PASSWORD_MAXIMUM_LENGTH + 1; i++) {password += 'x'}
        let gender = USER.MALE;
        let email = generateRandomString(16) +  "@gmail.com";
        let city = 'cairo';
        let latitude = 0;
        let longitude = 0;

        let t = async () => {
            await editUser({
                id: 'userid123',
                salt: 'asd',
                firstName,
                lastName,
                email,
                password,
                profileImageUrl: '',
                city,
                gender,
                latitude,
                longitude,
                isNewFirstName: true,
                isNewLastName: true,
                isNewEmail: true,
                isNewPassword: true,
                isNewProfileImageUrl: true,
                isNewCity: true,
                isNewGender: true,
                isNewLatitude: true,
                isNewLongitude: true
            });
        }
        await expect(t).rejects.toThrow(USER.EXCEPTION_MESSAGE_PASSWORD_MAXIMUM_LENGTH);
        
    });

    it("editing user with password length less than minimum length", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = ""; for(let i = 0; i < USER.PASSWORD_MINIMUM_LENGTH - 1; i++) {password += 'x'}
        let gender = USER.MALE;
        let email = "usercase1@gmail.com";
        let city = 'cairo';
        let latitude = 0;
        let longitude = 0;

        let t = async () => {
            await editUser({
                id: 'userid123',
                salt: 'asd',
                firstName,
                lastName,
                email,
                password,
                profileImageUrl: '',
                city,
                gender,
                latitude,
                longitude,
                isNewFirstName: true,
                isNewLastName: true,
                isNewEmail: true,
                isNewPassword: true,
                isNewProfileImageUrl: true,
                isNewCity: true,
                isNewGender: true,
                isNewLatitude: true,
                isNewLongitude: true
            });
        }
        await expect(t).rejects.toThrow(USER.EXCEPTION_MESSAGE_PASSWORD_MINIMUM_LENGTH);
        
    });

    it("editing user with invalid gender", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = "VeryStrongPassword";
        let gender = 'asdasdeqwd';
        let email = "usercase1@gmail.com";
        let city = 'cairo';
        let latitude = 0;
        let longitude = 0;

        let t = async () => {
            await editUser({
                id: 'userid123',
                salt: 'asd',
                firstName,
                lastName,
                email,
                password,
                profileImageUrl: '',
                city,
                gender,
                latitude,
                longitude,
                isNewFirstName: true,
                isNewLastName: true,
                isNewEmail: true,
                isNewPassword: true,
                isNewProfileImageUrl: true,
                isNewCity: true,
                isNewGender: true,
                isNewLatitude: true,
                isNewLongitude: true
            });
        }
        await expect(t).rejects.toThrow(USER.EXCEPTION_MESSAGE_GENDER_INVALID);
        
    });

    it("editing user with invalid email", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "usercase1gmail.com";
        let city = 'cairo';
        let latitude = 0;
        let longitude = 0;

        let t = async () => {
            await editUser({
                id: 'userid123',
                salt: 'asd',
                firstName,
                lastName,
                email,
                password,
                profileImageUrl: '',
                city,
                gender,
                latitude,
                longitude,
                isNewFirstName: true,
                isNewLastName: true,
                isNewEmail: true,
                isNewPassword: true,
                isNewProfileImageUrl: true,
                isNewCity: true,
                isNewGender: true,
                isNewLatitude: true,
                isNewLongitude: true
            });
        }
        await expect(t).rejects.toThrow(USER.EXCEPTION_MESSAGE_EMAIL_INVALID);    
    });

    it("editing user with invalid latitude", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "usercase1@gmail.com";
        let city = 'cairo';
        let latitude = 200;
        let longitude = 0;

        let t = async () => {
            await editUser({
                id: 'userid123',
                salt: 'asd',
                firstName,
                lastName,
                email,
                password,
                profileImageUrl: '',
                city,
                gender,
                latitude,
                longitude,
                isNewFirstName: true,
                isNewLastName: true,
                isNewEmail: true,
                isNewPassword: true,
                isNewProfileImageUrl: true,
                isNewCity: true,
                isNewGender: true,
                isNewLatitude: true,
                isNewLongitude: true
            });
        }
        await expect(t).rejects.toThrow(USER.EXCEPTION_MESSAGE_LATITUDE_INVALID);    
    });

    it("editing user with invalid longitude", async () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "usercase1@gmail.com";
        let city = 'cairo';
        let latitude = 0;
        let longitude = 200;

        let t = async () => {
            await editUser({
                id: 'userid123',
                salt: 'asd',
                firstName,
                lastName,
                email,
                password,
                profileImageUrl: '',
                city,
                gender,
                latitude,
                longitude,
                isNewFirstName: true,
                isNewLastName: true,
                isNewEmail: true,
                isNewPassword: true,
                isNewProfileImageUrl: true,
                isNewCity: true,
                isNewGender: true,
                isNewLatitude: true,
                isNewLongitude: true
            });
        }
        await expect(t).rejects.toThrow(USER.EXCEPTION_MESSAGE_LONGITUDE_INVALID);    
    });
});
