import { USER } from "../../../../config";
import { Exception } from "../../exception";

export class GenderError extends Exception {}

export class GenderNotValid extends GenderError {
    message = USER.EXCEPTION_MESSAGE_GENDER_INVALID;
}