import { API } from "../../../config";
import { Exception } from "../../../core/entities/exception";

export class ParameterError extends Exception {}

export class MissingParameter extends ParameterError {
    constructor(parameterName: string) {
        super();
        this.message = API.EXCEPTION_MESSAGE_MISSING_PARAMETER(parameterName);
    }
}