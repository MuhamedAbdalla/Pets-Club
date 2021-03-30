import { USER } from "../../../../config";
import { Exception } from "../../exception";

export class PasswordError extends Exception {}

export class PasswordExceededMaximumLength extends PasswordError {
    message = USER.EXCEPTION_MESSAGE_PASSWORD_MAXIMUM_LENGTH;
}

export class PasswordBeyondMinimumLength extends PasswordError {
    message = USER.EXCEPTION_MESSAGE_PASSWORD_MINIMUM_LENGTH;
}