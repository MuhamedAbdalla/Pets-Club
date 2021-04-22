import { USER } from "../../../../config";
import { Exception } from "../../exception";

export class EmailError extends Exception {
}

export class EmailNotValid extends EmailError {
    message = USER.EXCEPTION_MESSAGE_EMAIL_INVALID;
}

export class EmailAlreadyExist extends EmailError {
    message = USER.EXCEPTION_MESSAGE_EMAIL_ALREADY_EXISTS;
}