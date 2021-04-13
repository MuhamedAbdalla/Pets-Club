import { ImageException } from "./exception-interface";
import { PetException } from "./exception-interface";

export class IPetException implements PetException {
    insertException(error: string) {
        console.log("Insert pet in database throw exception: " + error);
    }
    updateException(error: string) {
        console.log("Update pet in database throw exception: " + error);
    }
    deleteException(error: string) {
        console.log("Delete pet from database throw exception: " + error);
    }
    getException(error: string) {
        console.log("Get pet from database throw exception: " + error);
    }
}

export default class IImageException implements ImageException {
    uploadPublicFileException(exception: string): void {
        console.log('Upload image to storage throw exception: ' + exception);
    }
    uploadPrivateFileException(exception: string): void {
        /**
         * Here is your logic for exception func.
         */
        throw new Error("Method not implemented.");
    }
    deleteException(exception: string): void {
        console.log('Delete image from storage throw exception: ' + exception);
    }
    clearLocalFileException(exception: string): void {
        console.log('Clear local file throw exception: ' + exception);
    }
}