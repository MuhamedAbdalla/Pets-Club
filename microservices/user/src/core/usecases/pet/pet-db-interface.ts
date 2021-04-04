import { Pet } from "../../entities/pet/pet";

export interface PetDb {
    insert(userID: string, pets: Pet[]): Promise<boolean>;
    update(userID: string, pets: Pet[]): Promise<boolean>;
    delete(userID: string, pets: Pet[]): Promise<boolean>;
    get(userID: string): Promise<Pet[] | null>;
}
