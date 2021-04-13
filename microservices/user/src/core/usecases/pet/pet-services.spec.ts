import { deletePet, getPet, insertPet, updatePet } from "..";
import { USER } from "../../../config";
import {
    PET_DESCRIPTION_ENTRY,
    PET_GENDER_ENTRY,
    PET_IMAGES_ENTRY,
    PET_NAME_ENTRY,
    PET_SUBTYPE_ENTRY,
    PET_TYPE_ENTRY,
} from "../../../config/database/database-constants";
import { UserDb } from "../../data-access/user";
import { generateRandomString } from "../../entities/util";
import { insertUser } from "../user";

let userID = "";

describe("Testing Pet service", () => {
    beforeAll(async () => {
        let firstName = "Ahmed";
        let lastName = "Shakshak";
        let password = "VeryStrongPassword";
        let gender = USER.MALE;
        let email = generateRandomString(16) +  "@gmail.com";
        let u = await insertUser({
            firstName,
            lastName,
            email,
            password,
            profileImageBase64: '',
            gender,
        });
        userID = u.id;
    });

    it("Test One!!", async () => {
        let pets = Array<Map<string, string>>();
        let cat = new Map<string, string>();
        let dog = new Map<string, string>();

        // Preprossing
        cat[PET_NAME_ENTRY] = "BOBOS";
        cat[PET_TYPE_ENTRY] = "CAT";
        cat[PET_SUBTYPE_ENTRY] = "Aegean";
        cat[PET_DESCRIPTION_ENTRY] = "CAT";
        cat[PET_GENDER_ENTRY] = "M";
        cat[PET_IMAGES_ENTRY] = ["IMAGE1", "IMAGE2"];

        dog[PET_NAME_ENTRY] = "BOBOS";
        dog[PET_TYPE_ENTRY] = "CAT";
        dog[PET_SUBTYPE_ENTRY] = "Aegean";
        dog[PET_DESCRIPTION_ENTRY] = "CAT";
        dog[PET_GENDER_ENTRY] = "F";
        dog[PET_IMAGES_ENTRY] = ["IMAGE1", "IMAGE2"];

        pets.push(cat);
        pets.push(dog);

        // Act 1
        let r1 = await getPet(userID);

        // Check 1
        expect(r1.length).toBe(0);

        // Act 2
        let r2 = await insertPet(userID, pets);

        // Check 2
        expect(r2).toBe(true);

        // Act 3
        let r3 = await getPet(userID);

        // Check 3
        expect(r3.length).toBe(2);
    });

    it("Test Two!!", async () => {
        let pets = Array<Map<string, string>>();
        let cat = new Map<string, string>();

        // Preprossing
        cat[PET_NAME_ENTRY] = "BOBOS";
        cat[PET_TYPE_ENTRY] = "CAT";
        cat[PET_SUBTYPE_ENTRY] = "Aegean";
        cat[PET_DESCRIPTION_ENTRY] = "CAT";
        cat[PET_GENDER_ENTRY] = "M";
        cat[PET_IMAGES_ENTRY] = ["IMAGE1", "IMAGE2"];

        pets.push(cat);

        // Act 1
        let r1 = await getPet(userID);

        // Check 1
        expect(r1.length).toBe(2);

        // Act 2
        let r2 = await deletePet(userID, pets);

        // Check 2
        expect(r2).toBe(true);

        // Act 3
        let r3 = await getPet(userID);

        // Check 3
        expect(r3.length).toBe(1);
    });

    it("Test Three!!", async () => {
        let pets = Array<Map<string, string>>();

        // Act 1
        let r1 = await getPet(userID);

        // Check 1
        expect(r1.length).toBe(1);

        // Act 2
        let r2 = await updatePet(userID, pets);

        // Check 2
        expect(r2).toBe(true);

        // Act 3
        let r3 = await getPet(userID);

        // Check 3
        expect(r3.length).toBe(0);
    });

    afterAll(async () => {
        await UserDb.deletetUserById(userID);
    });
});
