import { Pet } from "../../entities/pet/pet";
import { PetDb } from "./pet-db-interface";

export default function buildGetPet(petDb: PetDb) {
    return async function getPet(
        userID: string,
    ): Promise<Pet[]> {
        let pets = await petDb.get(userID);
        
        if (pets === null) {
            return [];
        }
        return pets;
    };
}