import { DATABASE } from "../../config";
import { Pet } from "./pet";

export class User {
    constructor(
        readonly _id: string,
        readonly _firstName: string,
        readonly _lastName: string,
        readonly _email: string,
        readonly _password: string,
        readonly _profileImageUrl: string,
        readonly _city: string,
        readonly _gender: string,
        readonly _listOfPets: Pet[] = []
    ) {}

    get id(): string {
        return this._id;
    }

    get firstName(): string {
        return this._firstName;
    }

    get lastName(): string {
        return this._lastName;
    }

    get profileImageUrl(): string {
        return this._profileImageUrl;
    }

    get city(): string {
        return this._city;
    }

    get password(): string {
        return this._password;
    }

    get email(): string {
        return this._email;
    }

    get gender(): string {
        return this._gender;
    }

    get listOfPets(): Pet[] {
        return this._listOfPets.map( pet => Object.assign({}, pet));
    }

}