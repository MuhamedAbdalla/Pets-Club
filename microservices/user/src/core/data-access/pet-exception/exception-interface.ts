export interface PetException {
    insertException(error: string);
    updateException(error: string);
    deleteException(error: string);
    getException(error: string);
}

export interface ImageException {
    uploadPublicFileException(exception: string): void;
    uploadPrivateFileException(exception: string): void;
    deleteException(exception: string): void;
    clearLocalFileException(exception: string): void;
}
