import { DATABASE } from "../../../config";
import { Pet } from "../pet/pet";

export class User {
    constructor(
        private readonly _id: string,
        private readonly _firstName: string,
        private readonly _lastName: string,
        private readonly _email: string,
        private readonly _hashedPassword: string,
        private readonly _salt: string,
        private readonly _profileImageUrl: string,
        private readonly _gender: string,
        private readonly _pets: Pet[],
        private readonly _city: string,
        private readonly _latitude: number, // 360 means not assigned yet [-90, 90]
        private readonly _longitude: number,// 360 means not assigned yet [-180, 180]
        
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

    get hashedPassword(): string {
        return this._hashedPassword;
    }

    get salt(): string {
        return this._salt;
    }

    get email(): string {
        return this._email;
    }

    get gender(): string {
        return this._gender;
    }

    get pets(): Pet[] {
        return this._pets.map( pet => Object.assign({}, pet));
    }

    get latitude(): number {
        return this._latitude;
    }

    get longitude(): number {
        return this._longitude;
    }

}