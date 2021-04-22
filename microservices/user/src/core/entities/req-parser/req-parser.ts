import { MissingArgument } from "./exceptions/argument";

export class ReqParser {
    private arguments: Map<
        string,
        { required?: boolean | undefined; type?: string | undefined; help?: string | undefined }
    > = new Map<
        string,
        { required?: boolean | undefined; type?: string | undefined; help?: string | undefined }
    >();

    public addArgument = (
        name: string,
        opt: { required?: boolean; type?: string; help?: string | undefined } = {
            help: `the ${name} key is missing from the request.`,
        }
    ) => {
        this.arguments.set(name, opt);
    };

    public parse = (req) => {
        const attributes: any = {};
        for (let [attName, opt] of this.arguments) {
            const val =
                req.headers[attName] != undefined ? req.headers[attName] : req.body[attName];
            if (val == undefined) {
                if (opt.required) {
                    throw new MissingArgument(attName, opt.help);
                }
                attributes[attName] = val;
            } else {
                attributes[attName] = this.cast(val, opt.type);
            }
        }
        return attributes;
    };

    private cast = (val: any, type: string | undefined) => {
        switch (type) {
            case "number": {
                return val == "" ? 0 : parseFloat(val);
            }
            case "bigint": {
                return val == "" ? BigInt(0) : BigInt(val);
            }
            case "string": {
                return String(val);
            }
            case "boolean": {
                return val == "" ? false : Boolean(JSON.parse(val));
            }
            default: {
                return val;
            }
        }
    };
}
