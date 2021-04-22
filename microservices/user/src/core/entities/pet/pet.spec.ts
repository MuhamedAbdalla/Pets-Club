import { makePet } from ".";
import { PET } from "../../../config";

describe("testing createing pet", () => {
    it("should create cat succefully", () => {
        let name = "dogggy pubby";
        let type = PET.CAT;
        let subtype = PET.BREEDS[type][0];
        let gender = PET.MALE;
        let description = "pussy cat ;)";

        let pet = makePet({
            name,
            type,
            subtype,
            gender,
            description,
            imagesUrls: []
        });

        expect(pet).toBeDefined();
        expect(pet.id).toBeDefined();
        expect(pet.id.length).toBeGreaterThan(0);
        expect(pet.name).toEqual(name);
        expect(pet.type).toEqual(type);
        expect(pet.subtype).toEqual(subtype);
        expect(pet.gender).toEqual(gender);
        expect(pet.description).toEqual(description);
        expect(pet.imagesUrls).toBeDefined();
        expect(pet.imagesUrls.length).toEqual(0);
    });

    it("create pet with name length bigger than maximum name length", () => {
        let name = ''; for(let i = 0; i < PET.NAME_MAX_LENGTH + 1; i++) {name += 'a'};
        let type = PET.CAT;
        let subtype = PET.BREEDS[type][0];
        let gender = PET.MALE;
        let description = "pussy cat ;)";

        const t = () => {
                makePet({
                name,
                type,
                subtype,
                gender,
                description,
                imagesUrls: []
            });
        };

        expect(t).toThrowError();
        expect(t).toThrow(PET.EXCEPTION_MESSAGE_NAME_MAXIMUM_LENGTH)
    });

    it("create pet with name length less than minimum name length", () => {
        let name = ''; for(let i = 0; i < PET.NAME_MIN_LENGTH - 1; i++) {name += 'a'};
        let type = PET.CAT;
        let subtype = PET.BREEDS[type][0];
        let gender = PET.MALE;
        let description = "pussy cat ;)";

        const t = () => {
                makePet({
                name,
                type,
                subtype,
                gender,
                description,
                imagesUrls: []
            });
        };

        expect(t).toThrowError();
        expect(t).toThrow(PET.EXCEPTION_MESSAGE_NAME_MINIMUM_LENGTH)
    });

    it("create pet with invalild type", () => {
        let name = 'Cat 42ya';
        let type = "Type that will neve exist";
        let subtype = "subtype that will never exist too";
        let gender = PET.MALE;
        let description = "pussy cat ;)";

        const t = () => {
                makePet({
                name,
                type,
                subtype,
                gender,
                description,
                imagesUrls: []
            });
        };

        expect(t).toThrowError();
        expect(t).toThrow(PET.EXCEPTION_MESSAGE_TYPE)
    });

    it("create pet with invalild subtype", () => {
        let name = 'Cat 42ya';
        let type = PET.TYPES[0];
        let subtype = "subtype that will never exist";
        let gender = PET.MALE;
        let description = "pussy cat ;)";

        const t = () => {
                makePet({
                name,
                type,
                subtype,
                gender,
                description,
                imagesUrls: []
            });
        };

        expect(t).toThrowError();
        expect(t).toThrow(PET.EXCEPTION_MESSAGE_BREED)
    });

    it("create pet with invalild gander", () => {
        let name = 'Cat 42ya';
        let type = PET.TYPES[0];
        let subtype = PET.BREEDS[type][0];
        let gender = "gender gamded gdn";
        let description = "pussy cat ;)";

        const t = () => {
                makePet({
                name,
                type,
                subtype,
                gender,
                description,
                imagesUrls: []
            });
        };

        expect(t).toThrowError();
        expect(t).toThrow(PET.EXCEPTION_MESSAGE_GENDER);
    });

    it("create pet with description length greater than description maximum length", () => {
        let name = 'Cat 42ya';
        let type = PET.TYPES[0];
        let subtype = PET.BREEDS[type][0];
        let gender = PET.FEMALE;
        let description = ""; for(let i = 0; i < PET.DESCRIPTION_MAX_LENGTH + 1; i++) {description += "k";}

        const t = () => {
                makePet({
                name,
                type,
                subtype,
                gender,
                description,
                imagesUrls: []
            });
        };

        expect(t).toThrowError();
        expect(t).toThrow(PET.EXCEPTION_MESSAGE_DESCRIPTION_MAX_LENGTH);
    });

    it("create pet with number of images greater than images max number", () => {
        let name = 'Cat 42ya';
        let type = PET.TYPES[0];
        let subtype = PET.BREEDS[type][0];
        let gender = PET.FEMALE;
        let description = "pussy cat ;)";
        let imagesUrls: string[] = []; for(let i = 0; i < PET.IMAGES_URLS_MAX_NUMBER + 1; i++) {imagesUrls.push("fakeUrl" + i.toString());};

        const t = () => {
                makePet({
                name,
                type,
                subtype,
                gender,
                description,
                imagesUrls: imagesUrls
            });
        };

        expect(t).toThrowError();
        expect(t).toThrow(PET.EXCEPTION_MESSAGE_IMAGES_URL_MAXIMUM_NUMBER);
    });
});
