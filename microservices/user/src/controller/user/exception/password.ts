import { USER } from "../../../config";
import { PasswordError } from "../../../core/entities/user/exceptions/password";

export class PasswordInvalid extends PasswordError {
    message = USER.EXCEPTION_MESSAGE_PASSWORD_INVALID;
}
