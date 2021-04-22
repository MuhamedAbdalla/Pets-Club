import { USER } from "../../../../config"
import { Exception } from "../../exception"

export class LocationError extends Exception {}

export class LatitudeNotValid extends LocationError {
    message = USER.EXCEPTION_MESSAGE_LATITUDE_INVALID;
}

export class LongitudeNotValid extends LocationError {
    message = USER.EXCEPTION_MESSAGE_LONGITUDE_INVALID;
}