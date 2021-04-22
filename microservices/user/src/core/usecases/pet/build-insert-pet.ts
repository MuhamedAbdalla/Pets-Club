import { DATABASE } from "../../../config";
import { makePet } from "../../entities/pet";
import { Pet } from "../../entities/pet/pet";
import { PetDb } from "./pet-db-interface";

export default function buildInsertPet(petDb: PetDb) {
    return async function addPet(
        userID: string,
        pets: Map<string, string>[],
    ): Promise<boolean> {
        let pet = Array<Pet>();

        pets.forEach(element => {
            let name = element[DATABASE.PET_NAME_ENTRY];
            let type = element[DATABASE.PET_TYPE_ENTRY];
            let subtype = element[DATABASE.PET_SUBTYPE_ENTRY];
            let gender = element[DATABASE.PET_GENDER_ENTRY];
            let description = element[DATABASE.PET_DESCRIPTION_ENTRY];
            let imagesUrls = element[DATABASE.PET_IMAGES_ENTRY];

            let cur = makePet({
                name,
                type,
                subtype,
                gender,
                description,
                imagesUrls,
            });
            pet.push(cur);
        });
        return await petDb.insert(userID, pet);
    };
}