export class Pet {
    constructor(
        private readonly _id: string,
        private readonly _name: string,
        private readonly _type: string,
        private readonly _subtype: string,
        private readonly _gender: string,
        private readonly _description: string,
        private readonly _imagesUrls: string[]
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