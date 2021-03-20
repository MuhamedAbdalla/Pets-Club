export class Pet {
    constructor(
        readonly _id: string,
        readonly _name: string,
        readonly _type: string,
        readonly _subtype: string,
        readonly _gender: string,
        readonly _description: string,
        readonly _imagesUrls: string[]
    ) {}

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get type(): string {
        return this._type;
    }

    get subtype(): string {
        return this._subtype;
    }

    get gender(): string {
        return this._gender;
    }

    get description(): string {
        return this._description;
    }

    get imagesUrls(): string[] {
        return this._imagesUrls.slice(0);
    }
}