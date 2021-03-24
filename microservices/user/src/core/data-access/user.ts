import { DATABASE, DB_OPERATION, USER } from "../../config";
import { User } from "../entities/user/user";
import { db } from './admin'

export class UserDb {
    public static async insertUser(user: User): Promise<void> {
        await db
            .collection(DATABASE.USER_COLLECTION_ENTRY)
            .doc(user.id)
            .set(this.userToJson(user));
    }

    public static async getUserByEmail(email: string): Promise<User> {
        const snapshot = await db
            .collection(DATABASE.USER_COLLECTION_ENTRY)
            .where(DATABASE.USER_EMAIL_ENTRY, DB_OPERATION.EQUAL, email).get();
        if(snapshot.empty) {
            throw new Error(USER.EXCEPTION_MESSAGE_EMAIL_DOES_NOT_EXISTS);
        }
        return this.docToUser(snapshot.docs[0]);
    }

    private static userToJson(user: User) {
        const userJson = {};
        userJson[DATABASE.USER_ID_ENTRY] = user.id;
        userJson[DATABASE.USER_FIRST_NAME_ENTRY] = user.firstName;
        userJson[DATABASE.USER_LAST_NAME_ENTRY] = user.lastName;
        userJson[DATABASE.USER_EMAIL_ENTRY] = user.email;
        userJson[DATABASE.USER_HASHED_PASSWORD_ENTRY] = user.hashedPassword;
        userJson[DATABASE.USER_SALT_ENTRY] = user.salt;
        userJson[DATABASE.USER_PROFILE_IMAGE_URL_ENTRY] = user.profileImageUrl;
        userJson[DATABASE.USER_GENDER_ENTRY] = user.gender;
        userJson[DATABASE.USER_CITY_ENTRY] = user.city;
        userJson[DATABASE.USER_LATITUDE_ENTRY] = user.latitude;
        userJson[DATABASE.USER_LONGITUDE_ENTRY] = user.longitude;
        return userJson;
    }

    private static docToUser(user: firebase.default.firestore.QueryDocumentSnapshot<firebase.default.firestore.DocumentData>): User {
        return new User(
        user[DATABASE.USER_ID_ENTRY],
        user[DATABASE.USER_FIRST_NAME_ENTRY],
        user[DATABASE.USER_LAST_NAME_ENTRY],
        user[DATABASE.USER_EMAIL_ENTRY],
        user[DATABASE.USER_HASHED_PASSWORD_ENTRY],
        user[DATABASE.USER_SALT_ENTRY],
        user[DATABASE.USER_PROFILE_IMAGE_URL_ENTRY],
        user[DATABASE.USER_GENDER_ENTRY],
        user[DATABASE.USER_PETS_ENTRY],
        user[DATABASE.USER_CITY_ENTRY],
        user[DATABASE.USER_LATITUDE_ENTRY],
        user[DATABASE.USER_LONGITUDE_ENTRY]);
    }
}