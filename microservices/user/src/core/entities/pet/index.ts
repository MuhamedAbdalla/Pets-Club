import {buildMakePet} from './build-make-pet'
import * as uuid from 'uuid'
import { PET } from '../../../config';


const generatePetId = (): string => {
    return uuid.v4();
}

const vaildatePetName = (name: string) => {
    if(name.length > PET.NAME_MAX_LENGTH) {
        throw new Error(PET.EXCEPTION_MESSAGE_NAME_MAXIMUM_LENGTH);
    }

    if(name.length < PET.NAME_MIN_LENGTH) {
        throw new Error(PET.EXCEPTION_MESSAGE_NAME_MINIMUM_LENGTH);
    }
}

const vaildatePetType = (type: string) => {
    if(!PET.TYPES.includes(type)) {
        throw new Error(PET.EXCEPTION_MESSAGE_TYPE);
    }
}

const vaildatePetSubtype = (type: string, subtype: string) => {
    if(!PET.BREEDS[type].includes(subtype)) {
        throw new Error(PET.EXCEPTION_MESSAGE_BREED);
    }
}

const vaildatePetGender = (gender: string) => {
    if(PET.MALE != gender && PET.FEMALE != gender) {
        throw new Error(PET.EXCEPTION_MESSAGE_GENDER);
    }
}

const vaildatePetDescription = (description: string) => {
    if(PET.DESCRIPTION_MAX_LENGTH < description.length) {
        throw new Error(PET.EXCEPTION_MESSAGE_DESCRIPTION_MAX_LENGTH);
    }
}

const vaildatePetImagesUrls = (imagesUrls: string[]) => {
    if(PET.IMAGES_URLS_MAX_NUMBER < imagesUrls.length) {
        throw new Error(PET.EXCEPTION_MESSAGE_IMAGES_URL_MAXIMUM_NUMBER);
    }
}


export const makePet = buildMakePet(
        generatePetId, 
        vaildatePetName, 
        vaildatePetType, 
        vaildatePetSubtype, 
        vaildatePetGender,
        vaildatePetDescription,
        vaildatePetImagesUrls
    );
