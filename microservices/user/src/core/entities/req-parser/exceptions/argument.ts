import { Exception } from "../../exception";

export class ArgumentError extends Exception {}

export class MissingArgument extends ArgumentError {
    constructor(attName: string, message?: string) {
        super();
        this.message = message ? message : `THE REQUEST IS MISSING '${attName}' ARGUMENT`;
    }
}
