import IImageManager from "./image-manager";
import makePetDb from "./pet";
import IImageException, { IPetException } from "./pet-exception/exception-imp";

export const pet_manager = new makePetDb(new IPetException());
export const imageManager = new IImageManager(new IImageException());
