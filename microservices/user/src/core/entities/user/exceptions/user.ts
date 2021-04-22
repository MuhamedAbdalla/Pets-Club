import { USER } from "../../../../config";
import { Exception } from "../../exception";

export class UserError extends Exception {}

export class UserNotExist extends UserError {
    message = USER.EXCEPTION_MESSAGE_USER_DOES_NOT_EXISTS;
}