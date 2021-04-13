global.XMLHttpRequest = require("xhr2");

import {
    PET_DESCRIPTION_ENTRY,
    PET_GENDER_ENTRY,
    PET_ID_ENTRY,
    PET_IMAGES_ENTRY,
    PET_NAME_ENTRY,
    PET_SUBTYPE_ENTRY,
    PET_TYPE_ENTRY,
    USER_COLLECTION_ENTRY,
    USER_PETS_ENTRY,
} from "../../config/database/database-constants";
import { Pet } from "../entities/pet/pet";
import { PetDb } from "../usecases/pet/pet-db-interface";
import { db } from "./admin";
import { PetException } from "./pet-exception/exception-interface";

export default class makePetDb implements PetDb {
    constructor(private _pet_exception: PetException) {}
    async insert(userID: string, pets: Pet[]): Promise<boolean> {
        try {
            await db
                .collection(USER_COLLECTION_ENTRY)
                .doc(userID)
                .update({
                    PETS: this.getData(pets),
                });
        } catch (error) {
            this._pet_exception.insertException(error);
            return false;
        }
        return true;
    }
    async update(userID: string, pets: Pet[]): Promise<boolean> {
        try {
            await db
                .collection(USER_COLLECTION_ENTRY)
                .doc(userID)
                .update({
                    PETS: this.getData(pets),
                });
        } catch (error) {
            this._pet_exception.updateException(error);
            return false;
        }
        return true;
    }
    async delete(userID: string, pets: Pet[]): Promise<boolean> {
        try {
            await db
                .collection(USER_COLLECTION_ENTRY)
                .doc(userID)
                .update({
                    PETS: this.getData(pets),
                });
        } catch (error) {
            this._pet_exception.deleteException(error);
            return false;
        }
        return true;
    }
    async get(userID: string): Promise<Pet[] | null> {
        try {
            let doc = await db.collection(USER_COLLECTION_ENTRY).doc(userID).get();

            let pets = Array<Pet>();
            let petInfo = [];
            let value = doc.data();

            if (value !== undefined && value[USER_PETS_ENTRY] !== undefined) {
                petInfo = value[USER_PETS_ENTRY];
                petInfo.forEach((element) => {
                    pets.push(this.docToPet(element));
                });
            }
            return pets;
        } catch (error) {
            this._pet_exception.getException(error);
            return null;
        }
    }

    private getData(pets: Pet[]): Array<{}> {
        let petInfo = Array<{}>();

        pets.forEach((element) => {
            petInfo.push(this.petToJson(element));
        });
        return petInfo;
    }

    private petToJson(pet: Pet) {
        const petJson = {};
        petJson[PET_ID_ENTRY] = pet.id;
        petJson[PET_NAME_ENTRY] = pet.name;
        petJson[PET_TYPE_ENTRY] = pet.type;
        petJson[PET_SUBTYPE_ENTRY] = pet.subtype;
        petJson[PET_DESCRIPTION_ENTRY] = pet.description;
        petJson[PET_GENDER_ENTRY] = pet.gender;
        petJson[PET_IMAGES_ENTRY] = pet.imagesUrls;
        return petJson;
    }

    private docToPet(PetInfo: firebase.default.firestore.DocumentData): Pet {
        return new Pet(
            PetInfo[PET_ID_ENTRY],
            PetInfo[PET_NAME_ENTRY],
            PetInfo[PET_TYPE_ENTRY],
            PetInfo[PET_SUBTYPE_ENTRY],
            PetInfo[PET_DESCRIPTION_ENTRY],
            PetInfo[PET_GENDER_ENTRY],
            PetInfo[PET_IMAGES_ENTRY]
        );
    }
}
