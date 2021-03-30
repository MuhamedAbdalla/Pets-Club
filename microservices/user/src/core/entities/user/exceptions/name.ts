import { USER } from "../../../../config";
import { Exception } from "../../exception";

export class NameError extends Exception {}

export class NameExceededMaximumLength extends NameError {
    message = USER.EXCEPTION_MESSAGE_NAME_MAXIMUM_LENGTH;
}