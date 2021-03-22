import * as uuid from 'uuid';
import crypto from 'crypto';
import * as EmailValidator from 'email-validator'

import { buildMakeUser } from "./build-mak-user";
import { USER } from "../../../config";


const generateUserId = (): string => {
    return uuid.v4();
}

const generateSalt = (): string => {
    return crypto.randomBytes(USER.SALT_LENGTH).toString(USER.HASH_DIGEST);
}

const hashPassword = (password: string, salt: string): string => { 
    return crypto.pbkdf2Sync(password, salt, USER.HASH_NUMBER_OF_ITERATIONS, USER.HASH_LENGTH, `sha512`)
    .toString(USER.HASH_DIGEST); 
};

const vaildateUserName = (name: string) => {
    if(USER.NAME_MAXIMUM_LENGTH < name.length) {
        throw new Error(USER.EXCEPTION_MESSAGE_NAME_MAXIMUM_LENGTH);
    }
}

const vaildateUserPassword = (password: string) => {
    if(USER.PASSWORD_MAXIMUM_LENGTH < password.length) {
        throw new Error(USER.EXCEPTION_MESSAGE_PASSWORD_MAXIMUM_LENGTH);
    }

    if(USER.PASSWORD_MINIMUM_LENGTH > password.length) {
        throw new Error(USER.EXCEPTION_MESSAGE_PASSWORD_MINIMUM_LENGTH);
    }
}

const vaildateUserGender = (gender: string) => {
    if(USER.MALE != gender && USER.FEMALE != gender) {
        throw new Error(USER.EXCEPTION_MESSAGE_GENDER_INVALID);
    }
}

const vaildateUserEmail = (email: string) => {
    if(!EmailValidator.validate(email)) {
        throw new Error(USER.EXCEPTION_MESSAGE_EMAIL_INVALID);
    }
}

const vaildateUserLocation = (latitude: number, longitude: number) => {
    if(USER.LATITUDE_MAXIMUM_VALUE < latitude || USER.LATITUDE_MINIMUM_VALUE > latitude) {
        throw new Error(USER.EXCEPTION_MESSAGE_LATITUDE_INVALID);
    }

    if(USER.LONGITUDE_MAXIMUM_VALUE < longitude || USER.LONGITUDE_MINIMUM_VALUE > longitude) {
        throw new Error(USER.EXCEPTION_MESSAGE_LONGITUDE_INVALID);
    }
}


export const makeUser = buildMakeUser(
    generateUserId, 
    generateSalt, 
    hashPassword,
    vaildateUserName,
    vaildateUserPassword,
    vaildateUserGender,
    vaildateUserEmail,
    vaildateUserLocation);