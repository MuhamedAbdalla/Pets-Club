import { IChatMessageException, IChatRoomException, ImageException } from "./exception-interface";

export class IImageException implements ImageException {
    uploadPublicFileException(exception: string): void {
        console.log("Upload image to storage throw exception: " + exception);
    }
    uploadPrivateFileException(exception: string): void {
        /**
         * Here is your logic for exception func.
         */
        throw new Error("Method not implemented.");
    }
    deleteException(exception: string): void {
        console.log("Delete image from storage throw exception: " + exception);
    }
    clearLocalFileException(exception: string): void {
        console.log("Clear local file throw exception: " + exception);
    }
}

export class ChatMessageException implements IChatMessageException {
    insert(error: string): void {
        console.log("Insert message in DB throw exception " + error);
    }
    update(error: string): void {
        console.log("Update message in DB throw exception " + error);
    }
    get(error: string): void {
        console.log("Get message in DB throw exception " + error);
    }
}

export class ChatRoomException implements IChatRoomException {
    insert(error: string): void {
        console.log("Insert room in DB throw exception " + error);
    }
    update(error: string): void {
        console.log("Update room in DB throw exception " + error);
    }
    updateRoom(error: string): void {
        console.log("Update room in DB throw exception " + error);
    }
    get(error: string): void {
        console.log("Get room in DB throw exception " + error);
    }
}
