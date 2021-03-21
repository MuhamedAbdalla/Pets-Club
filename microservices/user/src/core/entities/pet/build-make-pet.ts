import { Pet } from "./Pet";

export function buildMakePet(
    generatePetId:() => string, 
    vaildatePetName: (name: string) => void, 
    vaildatePetType: (type: string) => void,
    validatePetSubtype: (type: string, subtype: string) => void,
    validatePetGender: (gender: string) => void,
    validatePetDescription: (description: string) => void,
    validatePetImagesUrls: (imagesUrls: string[]) => void) {
    return function makePet(pet: {
        readonly name: string,
        readonly type: string,
        readonly subtype: string,
        readonly gender: string,
        readonly description: string,
        readonly imagesUrls: string[]
    }): Pet {
        vaildatePetName(pet.name);
        vaildatePetType(pet.type);
        validatePetSubtype(pet.type, pet.subtype);
        validatePetGender(pet.gender);
        validatePetDescription(pet.description);
        validatePetImagesUrls(pet.imagesUrls);

        let currentPet = new Pet(
            generatePetId(),
            pet.name,
            pet.type,
            pet.subtype,
            pet.gender,
            pet.description,
            pet.imagesUrls.slice(0),
        );
        return currentPet;
    };
}