import { imageManager, pet_manager } from "../data-access";
import makeFileRemoval from "./image/delete-image";
import makePublicFileUploader from "./image/upload-public-image";
import buildDeletePet from "./pet/build-delete-pet";
import buildGetPet from "./pet/build-get-pet";
import buildInsertPet from "./pet/build-insert-pet";
import buildUpdatePet from "./pet/build-update-pet";

export const insertPet = buildInsertPet(pet_manager);
export const updatePet = buildUpdatePet(pet_manager);
export const deletePet = buildDeletePet(pet_manager);
export const getPet = buildGetPet(pet_manager);
export const uploadPublicFile = makePublicFileUploader(imageManager);
export const deleteFile = makeFileRemoval(imageManager);