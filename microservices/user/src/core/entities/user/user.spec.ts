import { makeUser } from ".";
import { USER } from "../../../config";
import { Pet } from "../pet/Pet";

describe("testing createing user", () => {
    it("should create user succefully", () => {
        let firstName = "Ahmed";
        let lastName = "Shakshak";
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "test1@gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];
        let latitude = 0;
        let longitude = 0;

        let user = makeUser({
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
        expect(user.profileImageUrl).toEqual('');
        user.pets.forEach(p => expect(pets).toContain(p));
        expect(user.latitude).toEqual(latitude);
        expect(user.longitude).toEqual(longitude);
    });

    it("should create user succefully with default values", () => {
        let firstName = "Ahmed";
        let lastName = "Shakshak";
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "test1@gmail.com";

        let user = makeUser({
            firstName,
            lastName,
            email,
            password,
            profileImageUrl: '',
            gender,
        });
        
        expect(user).toBeDefined();
        expect(user.id).toBeDefined();
        expect(user.id.length).toBeGreaterThan(0);
        expect(user.firstName).toEqual(firstName);
        expect(user.lastName).toEqual(lastName);
        expect(user.email).toEqual(email);
        expect(user.gender).toEqual(gender);
        expect(user.hashedPassword.length).toEqual(2 * USER.HASH_LENGTH); // * 2 as the digest is 'hex'
        expect(user.salt.length).toEqual(2 * USER.SALT_LENGTH); // * 2 as the digest is 'hex'
        expect(user.profileImageUrl).toEqual('');
    });

    it("creating user with name length greater than maximum length", () => {
        let firstName = ''; for(let i = 0; i < USER.NAME_MAXIMUM_LENGTH + 1; i ++) {firstName += 'a'};
        let lastName = "Shakshak";
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "test1@gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];

        let t = () => {
            makeUser({
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
        expect(t).toThrowError();
        expect(t).toThrow(USER.EXCEPTION_MESSAGE_NAME_MAXIMUM_LENGTH);
        
    });

    it("creating user with name length greater than maximum length", () => {
        let firstName = 'ahmed';
        let lastName = '';  for(let i = 0; i < USER.NAME_MAXIMUM_LENGTH + 1; i ++) {lastName += 'a'};
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "test1@gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];

        let t = () => {
            makeUser({
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
        expect(t).toThrowError();
        expect(t).toThrow(USER.EXCEPTION_MESSAGE_NAME_MAXIMUM_LENGTH); 
    });

    it("creating user with password length greater than maximum length", () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = ""; for(let i = 0; i < USER.PASSWORD_MAXIMUM_LENGTH + 1; i++) {password += 'x'}
        let gender = USER.MALE;
        let email = "test1@gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];

        let t = () => {
            makeUser({
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
        expect(t).toThrowError();
        expect(t).toThrow(USER.EXCEPTION_MESSAGE_PASSWORD_MAXIMUM_LENGTH);
        
    });

    it("creating user with password length less than minimum length", () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = ""; for(let i = 0; i < USER.PASSWORD_MINIMUM_LENGTH - 1; i++) {password += 'x'}
        let gender = USER.MALE;
        let email = "test1@gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];

        let t = () => {
            makeUser({
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
        expect(t).toThrowError();
        expect(t).toThrow(USER.EXCEPTION_MESSAGE_PASSWORD_MINIMUM_LENGTH);
        
    });

    it("creating user with invalid gender", () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = "VeryStrongPassword";
        let gender = 'asdasdeqwd';
        let email = "test1@gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];

        let t = () => {
            makeUser({
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
        expect(t).toThrowError();
        expect(t).toThrow(USER.EXCEPTION_MESSAGE_GENDER_INVALID);
        
    });

    it("creating user with invalid email", () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "test1gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];

        let t = () => {
            makeUser({
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
        expect(t).toThrowError();
        expect(t).toThrow(USER.EXCEPTION_MESSAGE_EMAIL_INVALID);    
    });

    it("creating user with invalid latitude", () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "test1@gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];
        let latitude = 200;
        let longitude = 0;

        let t = () => {
            makeUser({
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
        expect(t).toThrowError();
        expect(t).toThrow(USER.EXCEPTION_MESSAGE_LATITUDE_INVALID);    
    });

    it("creating user with invalid longitude", () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "test1@gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];
        let latitude = 0;
        let longitude = 200;

        let t = () => {
            makeUser({
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
        expect(t).toThrowError();
        expect(t).toThrow(USER.EXCEPTION_MESSAGE_LONGITUDE_INVALID);    
    });

    it("creating user with latitude and without longitude", () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "test1@gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];
        let latitude = 0;

        let t = () => {
            makeUser({
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
        expect(t).toThrowError();
        expect(t).toThrow(USER.EXCEPTION_MESSAGE_LONGITUDE_INVALID);    
    });

    it("creating user with longitude and without latitude", () => {
        let firstName = 'ahmed';
        let lastName = 'shakshak';
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = "test1@gmail.com";
        let city = 'cairo';
        let pets: Pet[] = [];
        let longitude = 0;

        let t = () => {
            makeUser({
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
        expect(t).toThrowError();
        expect(t).toThrow(USER.EXCEPTION_MESSAGE_LATITUDE_INVALID);    
    });
});
