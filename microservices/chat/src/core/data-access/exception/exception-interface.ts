export interface ImageException {
    uploadPublicFileException(exception: string): void;
    uploadPrivateFileException(exception: string): void;
    deleteException(exception: string): void;
    clearLocalFileException(exception: string): void;
}

export interface IChatMessageException {
    insert(error: string) : void;
    update(error: string) : void;
    get(error: string) : void;
}

export interface IChatRoomException {
    insert(error: string) : void;
    update(error: string) : void;
    updateRoom(error: string) : void;
    get(error: string) : void;
}