global.XMLHttpRequest = require("xhr2");

import { DATABASE, DB_OPERATION, USER } from "../../config";
import { User } from "../entities/user/user";
import { db, storageRef } from './admin';
import * as fs from 'fs';
import { UserNotExist } from "../entities/user/exceptions/user";

export class UserDb {
    public static async insertUser(user: User): Promise<void> {
        await db
            .collection(DATABASE.USER_COLLECTION_ENTRY)
            .doc(user.id)
            .set(this.userToJson(user));
    }

    public static async addImage(imageBase64: string, userId: string): Promise<string> {
        const imagePath = DATABASE.USER_PROFILE_IMAGE_ENTERY + '/' + userId + '.png';
        const imageDiskPath = 'temp/' + userId + '.png';
        const imageRef = storageRef.child(imagePath);
        const t = async (imageRef: firebase.default.storage.Reference, imagePath, imageBase64) => {
            fs.writeFileSync(`./${imagePath}`, imageBase64, 'base64');
            const data = fs.readFileSync(`./${imagePath}`);
            fs.unlink(`./${imagePath}`, (err) => {
                if(err) {
                    console.log(err);
                }
            });
            return imageRef.put(data);
        }  
        const uploadTask = await t(imageRef, imageDiskPath, imageBase64);
        return await uploadTask.ref.getDownloadURL();
    }

    public static async updatetUser(user: User): Promise<void> {
        await db
            .collection(DATABASE.USER_COLLECTION_ENTRY)
            .doc(user.id)
            .update(this.userToJson(user));
    }

    public static async getUserByEmail(email: string): Promise<User> {
        const snapshot = await db
            .collection(DATABASE.USER_COLLECTION_ENTRY)
            .where(DATABASE.USER_EMAIL_ENTRY, DB_OPERATION.EQUAL, email).get();
        if(snapshot.empty) {
            throw new UserNotExist();
        }
        return this.docToUser(snapshot.docs[0].data());
    }

    public static async getUserById(id: string): Promise<User> {
        const doc = await db
            .collection(DATABASE.USER_COLLECTION_ENTRY)
            .doc(id)
            .get();
        let u = doc.data()
        if(!doc.exists || u == undefined) {
            throw new UserNotExist();
        }
        return this.docToUser(u);
    }

    public static async deletetUserById(id: string): Promise<void> {
        const doc = await db
            .collection(DATABASE.USER_COLLECTION_ENTRY)
            .doc(id)
            .delete();
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

    private static docToUser(user: firebase.default.firestore.DocumentData): User {
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